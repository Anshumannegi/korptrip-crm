import UserModel from "../Models/User.js";
export const getAllUser = async (req, res) => {
  try {
    const allUser = await UserModel.find();

    if (!allUser || allUser.length === 0) {
      return res.status(200).json({
        message: "No user found",
        success: true,
        data: [],
      });
    }
    res.status(200).json({
      message: "All Users Fetched Successfull",
      success: true,
      data: allUser,
    });
  } catch {
    console.log("Error while fetching all users: ", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error?.message,
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const id = req.user._id;
    if (!id) {
      return res.status(401).json({
        message: "Unauthorized: User ID not found in request",
        success: false,
      });
    }
    const userDetails = await UserModel.findById(id).select("-password");
    if (!userDetails) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({
      message: "User Details Found Successfully",
      success: true,
      data: userDetails,
    });
  } catch (error) {
    console.log("Error while fetching user details: ", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};
