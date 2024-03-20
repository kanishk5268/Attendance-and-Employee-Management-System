import User from "../models/user.model.js";

const checkAccess = async (req, access) => {
  try {
    const findAccess = req.user?.sAccess.find((item) => item == access);
    if (!findAccess) 
      return false
    return true
  } catch (error) {
    return error.message
  }
};
export default checkAccess;
