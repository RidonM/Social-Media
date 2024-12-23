const bcrypt = require("bcrypt");
const { User } = require("../Database/database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

exports.getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    console.error("Error fetching users: ", err);
    return { error: "Internal server error" };
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user;
  } catch (err) {
    console.error("Error finding User: ", err);
    return { error: "Internal server error" };
  }
};

exports.addUser = async (userData) => {
  try {
    const hashedPaswword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
      ...userData,
      password: hashedPaswword,
    });
    return newUser;
  } catch (error) {
    console.error("Error adding user: ", error);
    return { error: "Internal server error" };
  }
};

exports.loginUser = async (loginData) => {
  try {
    const user = await User.findOne({ where: { email: loginData.email } });

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(loginData.password, user.password);

    if (!isMatch) {
      return null;
    }

    const { password, ...userInfo } = user.dataValues;

    const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    return { user, token };
  } catch (error) {
    console.error("Error during login: ", error);
    return { error: "Internal server error" };
  }
};
