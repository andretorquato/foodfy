const User = require('../models/users');

async function post(req, res, next){

    const keys = Object.keys(req.body);
    for(key of keys){
        if(req.body[key] == ""){
            return res.render("admin/users/create", {
                user: req.body,
                error:"Preencha todos os campos"
            });
        }
    }

    let { email } = req.body;
    const user = await User.findOne({
        where: { email }
    })

    if( user ) return res.render("admin/users/create", {
        error: "Este e-mail já foi cadastrado!"
    });

    next();    
}


async function update(req, res, next){
    const keys = Object.keys(req.body);
    for (let key of keys) {
      if (req.body[key] == "") {
        res.render("admin/users/edit", {
            user: req.body,
            error:"Preencha todos os campos"
        });
        
        return;
      }
    }
    next();
}

module.exports = {
    post,
    update
}