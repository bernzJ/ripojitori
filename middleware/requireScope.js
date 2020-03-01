const requireScope = function (req, res, next) {
  const scope = req.scope;
  const { scope: userScope } = req.user;
  if (userScope === undefined || userScope < scope) {
    return res.send({ message: "Permission denied." });
  }
  next();
};

module.exports = requireScope;