const requireScope = function (req, res, next) {
  const scope = req.Scope;
  const { Scope: userScope } = req.user;
  if (userScope === undefined || userScope < scope) {
    return res.send({ message: "Permission denied." });
  }
  next();
};

module.exports = requireScope;