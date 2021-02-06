const Chefs = require("../models/chefs");

module.exports = {
  redirect(req, res) {
    return res.redirect("admin/chefs");
  },
  index(req, res) {
    Chefs.allChefs(function(chefs) {
      return res.render("admin/chefs/index", { chefs });
    })
    
  },
  show(req, res) {
    const { id } = req.params;

    Chefs.find(id, function(chef) {
      Chefs.myRecipes(id, function(recipes) {
        return res.render("admin/chefs/show", { chef, recipes });
      })
      
    })
    
  },
  edit(req, res) {
    const { id } = req.params;
    
    Chefs.find(id, function(chef) {
      
      return res.render("admin/chefs/edit", { chef });
    })
    
    
  },
  create(req, res) {
    return res.render("admin/chefs/create");
  },
  post(req, res) {
    
    const keys = Object.keys(req.body);
    for (let key of keys) {
      if (req.body[key] == "") {
        res.redirect("admin/chefs/create");
        alert("preencha todos os campos");
        return;
      }
    }

    Chefs.post(req.body, function(chef) {
      return res.redirect(`chefs/${chef.id}`);
    })
  },
  put(req, res) {
    
    const keys = Object.keys(req.body);
    for (let key of keys) {
      if (req.body[key] == "") {
        res.redirect("admin/chefs/create");
        alert("preencha todos os campos");
        return;
      }
    }
    
    Chefs.put(req.body, function() {
      return res.redirect(`/admin/chefs/${req.body.id[0]}`);
    })
    
  },
  delete(req, res) {
    const { id } = req.body;
    Chefs.delete(id, function() {
      return res.redirect("/admin/chefs");
    })
    
  },
};
