const data = require('../data');

exports.index = function(req, res){
    res.render('index', { items: data })
};

exports.recipes = function(req, res){
    res.render('recipes', {items: data})
};

exports.recipesToItem = function(req, res){;
    const recipes = [...data]
    const recipeIndex = req.params.index
    res.render('recipe', {item: recipes[recipeIndex] })
};

exports.about = function(req, res){
    res.render('about')
};