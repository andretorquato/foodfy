const Recipes = require("../models/recipes");

module.exports = {
  redirect(req, res) {
    return res.redirect("admin/recipes");
  },
  async index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 3;
    let offset = limit * ( page - 1);
    const params = {
      page,
      limit,
      offset,
      filter,
    }
    try {
    let recipes = await Recipes.paginate(params);
    recipes = recipes.rows;
    const pagination = {
      total: Math.ceil(recipes[0].total / limit ),
      page,
      
    }
    return res.render("admin/recipes/index", { recipes, pagination, filter });  
    } catch (error) {
      console.log(error);
    }
   
    
    Recipes.allChefs(function(recipes){
   
    })
    
  },
  show(req, res) {  
    const {id} = req.params;
    Recipes.find(id, function(recipe){
      Recipes.chefSelect(function(chefs){
        
        return res.render("admin/recipes/show", { recipe, chefs });
      })
      
    })
    
  },
  edit(req, res) {
    const {id} = req.params;
    Recipes.find(id, function(recipe){
      Recipes.chefSelect(function(options){
        
        return res.render("admin/recipes/edit", { recipe, options });
      })
      
    });
  
  },
  create(req, res) {
    Recipes.chefSelect(function(options){
      return res.render("admin/recipes/create", { options });
    })
    
  },
  post(req, res) {
    
    const keys = Object.keys(req.body);
    
    for (let key of keys) {
      if (req.body[key] == "") {
        res.redirect("admin/recipes/create");
        alert("preencha todos os campos");
        return;
      }
    }
    
    Recipes.post(req.body, function(recipe){
      return res.redirect(`recipes/${recipe.id}`);
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);
    
    for (let key of keys) {
      if (req.body[key] == "") {
        res.redirect("admin/recipes/create");
        alert("preencha todos os campos");
        return;
      }
    };
    Recipes.put(req.body, function(){
      return res.redirect("/admin");
    });
  },
  delete(req, res) {
      Recipes.delete(req.body.id, function(){
        return res.redirect("/admin");
      });
  },
};
