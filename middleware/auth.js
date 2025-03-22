const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Bạn chưa đăng nhập!" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token không hợp lệ!" });
  }
};

module.exports = authMiddleware;
