const { DataTypes } = require("sequelize");
const sequelize = require("../Database/database");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

exports.getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (err) {
    console.error("Error fetching users: ", err);
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user;
  } catch (err) {
    console.error("Error finding User: ", err);
  }
};

exports.addUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error("Error adding user: ", error);
  }
};
