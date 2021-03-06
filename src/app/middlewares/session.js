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
module.exports = {
  userIsLogged,
  userIsNotLogged,
  userIsLoggedAndIsAdmin
};
