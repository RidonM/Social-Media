const bcrypt = require("bcrypt");
const { User, Friends } = require("../Database/database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Op } = require("sequelize");
const { sequelize } = require("../Database/database");
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

exports.getNonFriends = async (userId) => {
  try {
    const nonFriends = await User.findAll({
      where: {
        id: {
          [Op.ne]: userId,
          [Op.notIn]: sequelize.literal(`(
            SELECT f.friend_id 
            FROM friends f 
            WHERE f.user_id = ${userId} 
            UNION 
            SELECT f.user_id 
            FROM friends f 
            WHERE f.friend_id = ${userId}
          )`),
        },
      },
      attributes: ["id", "name", "surname"],
    });

    return nonFriends;
  } catch (error) {
    console.error("Error fetching non-friends:", error);
    return { error: "Internal server error" };
  }
};

exports.getReceivedFriendRequests = async (userId) => {
  try {
    const receivedFriendRequests = await User.findAll({
      where: {
        id: {
          [Op.in]: sequelize.literal(`(
            SELECT f.user_id 
            FROM friends f 
            WHERE f.friend_id = ${userId} AND f.status = 'pending'
          )`),
        },
      },
      attributes: ["id", "name", "surname"],
    });

    return receivedFriendRequests;
  } catch (error) {
    console.error("Error fetching received friend requests:", error);
    return { error: "Internal server error" };
  }
};
