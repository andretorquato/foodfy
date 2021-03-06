const Chefs = require("../models/chefs");
const Files = require("../models/files");

module.exports = {
  redirect(req, res) {
    return res.redirect("admin/chefs");
  },
  async index(req, res) {
    const user = req.session.user;
    try {
      let chefs = await Chefs.allChefs();
      chefs = chefs.rows;
      let auxChefs = [];

      chefs = chefs.map(async (chef) => {
        let image = await Files.getFiles(chef.file_id);
        image = image.rows[0];

        image = {
          ...image,
          src: `${req.protocol}://${req.headers.host}${image.path.replace(
            "public",
            ""
          )}`,
        };
        return auxChefs.push({
          ...chef,
          image: image.src,
          imageName: image.name,
        });
      });

      await Promise.all(chefs);

      chefs = auxChefs;
      
      return res.render("admin/chefs/index", { chefs, user });
    } catch (error) {
      console.log(error);
    }
  },
  async show(req, res) {
    const { id } = req.params;

    let chef = await Chefs.find(id);
    chef = chef.rows[0];

    let photo = await Files.getFiles(chef.file_id);
    photo = photo.rows[0];
    photo = {
      ...photo,
      src: `${req.protocol}://${req.headers.host}${photo.path.replace(
        "public",
        ""
      )}`,
    };

    let recipes = await Chefs.myRecipes(id);
    recipes = recipes.rows;
    let files = [],
      images = [];
    let getIdsRecipes = recipes.map((recipe) => recipe.id);
    let filesId = getIdsRecipes.map(async (id) => {
      let file = await (await Files.getIdRecipesFiles(id)).rows[0];
      file.recipe_id = id;
      return files.push(file);
    });

    await Promise.all(filesId);

    files = files.map(async (file) => {
      let image = await (await Files.getFiles(file.file_id)).rows[0];
      return images.push({
        ...image,
        recipe_id: file.recipe_id,
        src: `${req.protocol}://${req.headers.host}${image.path.replace(
          "public",
          ""
        )}`,
      });
    });

    await Promise.all(files);
    
    return res.render("admin/chefs/show", { chef, recipes, images, photo });
  },
  async edit(req, res) {
    const { id } = req.params;

    let chef = await Chefs.find(id);
    chef = chef.rows[0];

    return res.render("admin/chefs/edit", { chef });
  },
  create(req, res) {
    return res.render("admin/chefs/create");
  },
  async post(req, res) {
    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == "") {
        return res.render("admin/chefs/create", {
          error:"Preencha todos os campos"
        })
        
      }
    }

    if (req.files.length == 0) {
      return res.render("admin/chefs/create", {
        error: "Adicione pelo menos uma imagem"
      })
    }

    try {
      const chefImage = await Files.create({
        ...req.files[0],
        path: `${req.files[0].path.replace(/\\/g, "/")}`,
      });

      const data = {
        ...req.body,
        file_id: chefImage.rows[0].id,
      };
      const chef = await Chefs.post(data);

      return res.redirect(`chefs/${chef.rows[0].id}`);
    } catch (error) {
      console.log(error);
    }
  },
  async put(req, res) {
    const keys = Object.keys(req.body);
    for (let key of keys) {
      if (req.body[key] == "") {
        res.render("admin/chefs/create", {
          error:"Preencha todos os campos"
        });
        return;
      }
    }

    if (req.files.length == 0) {
      return res.render("admin/chefs/create",{
        error: "Insira uma imagem"
      });
    }

    try {
      const chefImage = await Files.create({
        ...req.files[0],
        path: `${req.files[0].path.replace(/\\/g, "/")}`,
      });
      const data = {
        ...req.body,
        file_id: chefImage.rows[0].id,
      };

      const chef = await Chefs.put(data);

      await Files.deleteChefImg(req.body.file_id);

      return res.redirect(`/admin/chefs/${req.body.id}`);
     
    } catch (error) {
      console.log(error);
    }
  },
  async delete(req, res) {
    const { id, file_id } = req.body;
    
    Chefs.delete(id);
    await Files.deleteChefImg(file_id);
    
    return res.redirect("/admin/chefs");
  },
};
