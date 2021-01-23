
const fs = require('fs');
const data = require('../data.json');

exports.index = function (req, res){
    res.render('admin/index', { recipes: data.recipes });
}

exports.show = function (req, res){
    const { id } = req.params;
    
    const findRecipe = data.recipes.find(recipe => recipe.id == id);
    if(!findRecipe) return res.render('admin/create');

    res.render('admin/show', { recipe: findRecipe });
}
exports.edit = function (req, res){
    const { id } = req.params;
    const findRecipe = data.recipes.find(recipe => recipe.id == id);

    res.render('admin/edit', { recipe: findRecipe });
}
exports.create = function (req, res){
    res.render('admin/create');
}
exports.post = function (req, res){
    
    const keys = Object.keys(req.body);
    for(let key of keys){
        if(req.body[key] == ""){
            res.redirect('admin/create');
            alert("preencha todos os campos");
            return
        }
    }
    
    let id = 1;
    let lastRecipe = data.recipes.length;
    console.log(lastRecipe);
    if(lastRecipe > 0){
        lastRecipe = data.recipes.length;
        id = lastRecipe + 1;
    }

    const recipe = {
        id: Number(id),
        ...req.body
    }

    data.recipes.push(recipe);

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error write file');

        return res.redirect('admin');
    })


}

exports.put = function(req, res){
    const { id }= req.body;
    let index = 0;
    const findRecipe = data.recipes.find((recipe, idRecipe) =>{
        if(recipe.id == id) 
        index = idRecipe;
        return true;
    });

    if(!findRecipe) return res.send('error not found');
    data.recipes[index] = {
        ...req.body
    }
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("error write file");

        res.redirect('/admin');
    })
}
exports.delete = function(req, res){
    const { id } = req.body;
    const findRecipe = data.recipes.filter(recipe => recipe.id != id);
    
    if(!findRecipe) return res.send("not found");

    data.recipes = findRecipe;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error write file');


        return res.redirect('/admin');
    })
}