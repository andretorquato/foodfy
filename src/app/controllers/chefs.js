const { date } = require("../../libs/utils");
const Chefs = require("../models/chefs");

module.exports = {
  redirect(req, res) {
    return res.redirect("admin/chefs");
  },
  index(req, res) {
    Chefs.allChefs(function(chefs) {
      console.log(chefs);
      return res.render("admin/chefs/index", { chefs });
    })
    
  },
  show(req, res) {
    const { id } = req.params;

    const findChef = data.chefs.find((chef) => chef.id == id);
    if (!findChef) return res.render("admin/chefs/create");

    return res.render("admin/chefs/show", { chef: findChef });
  },
  edit(req, res) {
    const { id } = req.params;
    const findChef = data.chefs.find((chef) => chef.id == id);

    res.render("admin/chefs/edit", { chef: findChef });
  },
  create(req, res) {
    return res.render("admin/chefs/create");
  },
  post(req, res) {
    console.log(req.body);
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
    const { id } = req.body;
    let index = 0;
    const findChef = data.chefs.find((chef, idChef) => {
      if (chef.id == id) index = idChef;
      return true;
    });

    if (!findChef) return res.send("error not found");
    data.chefs[index] = {
      ...req.body,
    };
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send("error write file");

      res.redirect("/admin");
    });
  },
  delete(req, res) {
    const { id } = req.body;
    const findChef = data.chefs.filter((chef) => chef.id != id);

    if (!findChef) return res.send("not found");

    data.chefs = findChef;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send("error write file");

      return res.redirect("/admin");
    });
  },
};
