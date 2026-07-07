function authCheck(req, res, next) {
  console.log("HEADERS:", req.headers);

  const token =
    req.headers['access_token'] ||
    req.headers['access-token'] ||
    req.headers['authorization'];

  console.log("TOKEN:", token);

  if (!token) {
    return res.status(401).json({ error: "Acesso negado!" });
  }

  if (token !== "PROFFIAP") {
    return res.status(401).json({ error: "Token incorreto" });
  }

  next();
}

module.exports = authCheck;