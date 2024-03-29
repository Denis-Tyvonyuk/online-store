const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer asfasnfkajsfnjk

    if (!token) {
      return res.status(401).json({ message: "no authorization" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    res.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: e });
  }
};
