const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  console.log("authenticating .....");

  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });
    req.user = decoded; // Attach user info to request

    // check RBAC 
    next(); // sending request forward...
  });
};

exports.generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};
