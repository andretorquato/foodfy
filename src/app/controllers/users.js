const Users = require("../models/users");

module.exports = {
  redirect(req, res) {
    return res.redirect("admin/users");
  },
  async index(req, res) {
    try {
      let users = await Users.allChefs();
      users = users.rows;
      console.log(req.session.userId);
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
    const notDisplayPassword = true;
    const user = await Users.findOne({ where: { id }})
    return res.render("admin/users/edit", { user,  notDisplayPassword});
  },
  create(req, res) {
    return res.render("admin/users/create");
  },
  async post(req, res) {
    
    try {
      const userId = await Users.create(req.body);
      req.session.userId = userId;
      return res.redirect(`users`);
    } catch (error) {
      console.log(error);
    }
    
  },
  async update(req, res) {
   
    try {
      
      let { user }= req.session;
      let { email, name, is_admin } = req.body;

      console.log(user);
      console.log(req.body);
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
