import UserModel from "../Models/User.js";
export const getAllUser = async (req, res) => {
  try {
    const allUser = await UserModel.find();
    res.status(200).json({
      message: "All Users Fetched Successfull",
      success: true,
      data: allUser,
    });
  } catch {
    res.status(500).json({ message: "Internal Server Error", success: false });
    console.log(error);
  }
};
