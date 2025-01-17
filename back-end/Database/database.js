const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("socialmedia", "root", "ridon123", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

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
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const Friends = sequelize.define(
  "friends",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    friend_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected", "blocked"),
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const Posts = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const Likes = sequelize.define(
  "likes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    liked_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Posts,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Friends, { foreignKey: "user_id" });
User.hasMany(Friends, { foreignKey: "friend_id" });

User.hasMany(Likes, { foreignKey: "liked_user_id" });
Posts.hasMany(Likes, { foreignKey: "post_id" });
Likes.belongsTo(User, { foreignKey: "liked_user_id" });

User.hasMany(Posts, { foreignKey: "user_id" });
Posts.belongsTo(User, { foreignKey: "user_id" });

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error during table creation:", error);
  }
})();

module.exports = {
  User,
  Friends,
  Likes,
  Posts,
  sequelize,
};
