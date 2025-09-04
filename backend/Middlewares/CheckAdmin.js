import User from "../Models/User.js";
import jwt from "jsonwebtoken";

const CheckAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token Provided", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    if (!decoded?._id) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }
    const user = await User.findById(decoded?._id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (!user.isAdmin) {
      return res.status(403).json({
        message: "Access Denied, Only admin can perform this action",
        success: false,
      });
    }
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, success: false });
  }
};

export default CheckAdmin;
