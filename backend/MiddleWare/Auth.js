import jwt from "jsonwebtoken";

export const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // 🔹 Ensure correct case

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // 🔹 Extract the token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 🔹 Correct verification method
    req.user = decoded; // Attach user info to request
    next(); // 🔹 Pass control to the next middleware
  } catch (error) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
