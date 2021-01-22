
const fs = require('fs');
const data = require('../data.json');

exports.index = function (req, res){
    res.render('admin/index', { recipes: data.recipes });
}

exports.show = function (req, res){
    res.render('admin/show');
}
exports.edit = function (req, res){
    res.render('admin/edit');
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
    
    data.recipes.push(req.body);

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('error write file');

        return res.redirect('admin');
    })
}