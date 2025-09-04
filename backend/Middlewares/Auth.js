import jwt from "jsonwebtoken";

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res
      .status(401)
      .json({ message: "Unauthorized, jwt token is required" });
  }

  const token = auth.split(" ")[1]; // Extract the actual token

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized, JWT token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized, jwt token is wrong or expired" });
  }
};

export default ensureAuthenticated;
