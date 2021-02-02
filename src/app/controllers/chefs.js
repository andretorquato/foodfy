const fs = require("fs");
const data = require("../../../data.json");
module.exports = {
  redirect(req, res) {
    return res.redirect("admin/chefs");
  },
  index(req, res) {
    return res.render("admin/chefs/index", { chefs: data.chefs });
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
    const keys = Object.keys(req.body);
    for (let key of keys) {
      if (req.body[key] == "") {
        res.redirect("admin/chefs/create");
        alert("preencha todos os campos");
        return;
      }
    }

    let id = 1;
    let lastChef = data.chefs.length;
    console.log(lastChef);
    if (lastChef > 0) {
      lastChef = data.chefs.length;
      id = lastChef + 1;
    }

    const chef = {
      id: Number(id),
      ...req.body,
    };

    data.chefs.push(chef);

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
      if (err) return res.send("error write file");

      return res.redirect("admin");
    });
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
