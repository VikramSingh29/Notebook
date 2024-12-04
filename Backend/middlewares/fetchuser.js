const jwt = require("jsonwebtoken");

const SECRET_KEY = "thisisaSecret";

const fetchuser = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Authentication token is missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    const data = jwt.verify(token, SECRET_KEY);
    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = fetchuser;
