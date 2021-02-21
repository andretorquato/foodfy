module.exports = {
    login(req, res){

        return res.render("admin/session/login");
    },
    forgotPassword(req, res){
        
        return res.render("admin/session/forgot-password");

    },
    forgotPasswordForm(req, res){
        return res.render("admin/session/forgot-password-form");
    }
}