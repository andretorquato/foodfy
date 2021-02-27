const Users = require("../models/users");

module.exports = {
  redirect(req, res) {
    return res.redirect("admin/users");
  },
  async index(req, res) {
    try {
      let users = await Users.allChefs();
      users = users.rows;
      
      return res.render("admin/users/index", { users });
    } catch (error) {
      console.log(error);
    }
  },
  async profile(req, res) {
    const { id } = req.params;


    return res.render("admin/users/profile");
  },
  async edit(req, res) {
    const { id } = req.params;

    return res.render("admin/users/edit");
  },
  create(req, res) {
    return res.render("admin/users/create");
  },
  async post(req, res) {
    
    try {
      const userId = await Users.create(req.body);

      return res.redirect(`users/${userId}`);
    } catch (error) {
      console.log(error);
    }
    
  },
  async put(req, res) {
    const keys = Object.keys(req.body);
    for (let key of keys) {
      if (req.body[key] == "") {
        res.redirect("admin/users/create");
        alert("preencha todos os campos");
        return;
      }
    }

    if (req.files.length == 0) {
      return res.send("Insira uma foto de usuário");
    }

    try {
      const userImage = await Files.create({
        ...req.files[0],
        path: `${req.files[0].path.replace(/\\/g, "/")}`,
      });
      const data = {
        ...req.body,
        file_id: userImage.rows[0].id,
      };

      const user = await Users.put(data);

      await Files.deleteUserImg(req.body.file_id);

      return res.redirect(`/admin/users/${req.body.id}`);
    } catch (error) {
      console.log(error);
    }
  },
  delete(req, res) {
    const { id } = req.body;

    Users.delete(id);

    return res.redirect("/admin/users");
  },
};
