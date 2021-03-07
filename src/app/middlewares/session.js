const User = require('../models/users');

function userIsLogged(req, res, next) {
  if (req.session.user) {
    return res.redirect("/admin/recipes");
  }
  next();
}

function userIsNotLogged(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/admin");
  }
  next();
}

function userIsLoggedAndIsAdmin(req, res, next) {
  if (req.session.user && !req.session.user.is_admin) {
    const locations = req.path.split("/");
    const locale = locations[1];
    return res.redirect(`/admin/${locale}`);
  }
  next();
}

async function userProfileAccess(req, res, next) {
  const { id } = req.params;
  const { token } = req.query;
  const user = await User.findOne({ where: { id }});

  if(!req.session.user && !token) return res.redirect("/admin/login");

  if(token != user.reset_token) return res.redirect("/admin/login");

  next();
}
module.exports = {
  userIsLogged,
  userIsNotLogged,
  userIsLoggedAndIsAdmin,
  userProfileAccess,
};
