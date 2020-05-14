const requireScope = function (req, res, next) {
  const scope = req.Scope;
  const { Scope: userScope } = req.user;
  if (userScope === undefined || userScope < scope) {
    return res.status(500).send({ message: "Permission denied." });
  }
  next();
};

module.exports = requireScope;