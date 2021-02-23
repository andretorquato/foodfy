module.exports = {
    loginRedirect(req, res){

        return res.render("admin/session/login");
    },
    forgotPassword(req, res){
        
        return res.render("admin/session/forgot-password");

    },
    forgotPasswordForm(req, res){
        return res.render("admin/session/forgot-password-form");
    },
    login(req, res){
        const keys = Object.keys(req.body);

        for (let key of keys) {
          if (req.body[key] == "") {
            res.render("admin/session/login", {
                email: req.body.email,
                error: "Preencha todos os campos",
            })
            return;
          }
        }
        
        return res.render("admin/chefs/index");
    }
    
}