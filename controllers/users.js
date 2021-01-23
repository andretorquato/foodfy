const data = require('../data.json');

exports.index = function(req, res){
    res.render('index', { items: data.recipes })
};

exports.recipes = function(req, res){
    res.render('recipes', {items: data.recipes})
};

exports.recipesToItem = function(req, res){;
    const {index} = req.params;
    
    findRecipe = data.recipes.find(recipe => recipe.id == index);
    if(!findRecipe) res.send(404);
    
    res.render('recipe', {item: findRecipe});
};

exports.about = function(req, res){
    res.render('about')
};