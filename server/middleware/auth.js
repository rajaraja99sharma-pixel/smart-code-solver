import jwt from "jsonwebtoken"

const authAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, "secret123");

    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

export default authAdmin;