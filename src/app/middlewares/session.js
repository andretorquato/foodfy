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
module.exports = {
  userIsLogged,
  userIsNotLogged,
};
