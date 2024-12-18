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

User.hasMany(Friends, { foreignKey: "user_id" });
User.hasMany(Friends, { foreignKey: "friend_id" });

User.hasMany(Likes, { foreignKey: "liked_user_id" });
Posts.hasMany(Likes, { foreignKey: "post_id" });

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
