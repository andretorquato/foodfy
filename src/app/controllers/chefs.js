const Chefs = require("../models/chefs");
const Files = require("../models/files");

module.exports = {
  redirect(req, res) {
    return res.redirect("admin/chefs");
  },
  index(req, res) {
    Chefs.allChefs(function(chefs) {
      return res.render("admin/chefs/index", { chefs });
    })
    
  },
  async show(req, res) {
    const { id } = req.params;

    let chef = await Chefs.find(id);
    chef = chef.rows[0];
    
    let photo = await Files.getFiles(chef.file_id);
    photo = photo.rows[0];
    photo = {
      ...photo,
      src: `${req.protocol}://${req.headers.host}${photo.path.replace("public", "")}`
    }
    
    let recipes = await Chefs.myRecipes(id);
    recipes = recipes.rows;
    
    return res.render("admin/chefs/show", { chef, recipes, photo });
    
  },
  async edit(req, res) {
    const { id } = req.params;
    
    let chef = await Chefs.find(id);
    chef = chef.rows[0]
    
    return res.render("admin/chefs/edit", { chef });  
  },
  create(req, res) {
    return res.render("admin/chefs/create");
  },
  async post(req, res) {
    
    const keys = Object.keys(req.body);
    
    for (let key of keys) {
      if (req.body[key] == "") {
        
        return res.send(req.body[key] + "vazio");
      }
    }
    
    if(req.files.length == 0) {
      return res.send("Insira uma foto de usuário");
    }
    
    try {      
      
      const chefImage = await Files.create({
        ...req.files[0],
        path:`${req.files[0].path.replace(/\\/g, "/")}`
      })
      
      const data = {
        ...req.body,
        file_id: chefImage.rows[0].id
      }
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
        res.redirect("admin/chefs/create");
        alert("preencha todos os campos");
        return;
      }
    }
    
    if(req.files.length == 0) {
      return res.send("Insira uma foto de usuário");
    }
    
    try {      
      
      const chefImage = await Files.create({
        ...req.files[0],
        path:`${req.files[0].path.replace(/\\/g, "/")}`
      })
      const data = {
        ...req.body,
        file_id: chefImage.rows[0].id
      }
    
      const chef = await Chefs.put(data);
      

      await Files.deleteChefImg(req.body.file_id)
      
     
      return res.redirect(`/admin/chefs/${req.body.id}`);

    } catch (error) {
      console.log(error);
    }
    
  },
  delete(req, res) {
    const { id } = req.body;
    
    Chefs.delete(id);
    
    return res.redirect("/admin/chefs");
  }
};
