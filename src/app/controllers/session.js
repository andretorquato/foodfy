const User = require('../models/users');
const crypto = require("crypto");
const mailer = require("../../libs/mailer");

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

        req.session.user = {
            name: req.user.name,
            id: req.user.id,
            is_admin: req.user.is_admin
        };
        console.log(req.session.user);
        return res.redirect("/admin/recipes");
    },
    logout(req, res){
        req.session.destroy();
        return res.redirect("/admin");
    },
    async forgot(req, res){
        const user = req.user
        
        const token = crypto.randomBytes(20).toString("hex");

        try {
            let now = new Date();
            now = now.setHours(now.getHours() + 1);

            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            await mailer.sendMail({
                to: user.email,
                from: 'andretorquato@foodfy.master',
                subject: `<h2>Perdeu a senha/h2>`,
                html: `<p>Clique no link abaixo para recuperar sua senha</p>
                    <p>
                        <a href="https://localhost:3000/users/password-reset?token=${token}" target="_blank">
                        RECUPERAR SENHA
                        </a>
                    </p>
                `
            })
            return res.render("session/forgot-password", {
                success:"Verifique seu email para recuperar sua senha!"
            })
        } catch (error) {
            console.error(error);

            return res.render("session/forgot-password", {
                error: "Erro inesperado!"
            })
        }
    },
    
}