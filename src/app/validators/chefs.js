function post(req, res, next){
    const keys = Object.keys(req.body);
    for (let key of keys) {
      if (req.body[key] == "") {
        res.render("admin/chefs/create", {
          error:"Preencha todos os campos"
        })
        return;
      }
    }
    if (req.files.length == 0) {
         res.render("admin/chefs/create",{
          error: "Insira uma imagem"
        });
        return;
      }
  
    next();
}

function update(req, res, next){
    const keys = Object.keys(req.body);
    for (let key of keys) {
      if (req.body[key] == "") {
        res.render("admin/chefs/edit", {
          error:"Preencha todos os campos"
        });
        return;
      }
    }
    if (req.files.length == 0) {
        return res.render("admin/chefs/edit", {
          error: "Adicione pelo menos uma imagem"
        })
      }
  
    next();
}
function photoValidator(req, res, next){

    next();
}

module.exports = {
    post,
    update,
    photoValidator,
}