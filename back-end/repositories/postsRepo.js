const { Posts, User, Likes, sequelize } = require("../Database/database");

exports.getAllPosts = async (id) => {
  try {
    const posts = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "surname"],
        },
        {
          model: Likes,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [sequelize.fn("COUNT", sequelize.col("Likes.id")), "likeCount"],
          [
            sequelize.literal(`
                EXISTS (
                    SELECT 1 FROM likes
                    WHERE likes.post_id = Posts.id
                    AND likes.liked_user_id = ${id}
                )
            `),
            "isLiked",
          ],
        ],
      },
      group: ["Posts.id", "User.id"],
      order: [["createdAt", "DESC"]],
    });

    return posts;
  } catch (err) {
    console.error("Error fetching posts: ", err);
    return { error: "Internal server error" };
  }
};

exports.getPostsFromFriends = async (userId) => {
  try {
    const posts = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ["name", "surname"],
        },
        {
          model: Likes,
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [sequelize.fn("COUNT", sequelize.col("Likes.id")), "likeCount"],
          [
            sequelize.literal(`EXISTS (
              SELECT 1 FROM likes 
              WHERE likes.post_id = Posts.id 
              AND likes.liked_user_id = ${userId}
            )`),
            "isLiked",
          ],
        ],
      },
      where: sequelize.literal(`
        user_id IN (
          SELECT 
            CASE 
              WHEN friends.user_id = ${userId} THEN friends.friend_id
              WHEN friends.friend_id = ${userId} THEN friends.user_id
            END 
          FROM friends
          WHERE 
            (friends.user_id = ${userId} OR friends.friend_id = ${userId})
            AND friends.status = 'accepted'
        )
      `),
      group: ["Posts.id", "User.id"],
      order: [["createdAt", "DESC"]],
    });

    return posts;
  } catch (err) {
    console.error("Error fetching posts from friends: ", err);
    throw new Error("Error fetching posts from friends");
  }
};

exports.getPostById = async (id) => {
  try {
    const post = await Posts.findByPk(id);
    if (!post) return null;
    return post;
  } catch (err) {
    console.error("Error finding User: ", err);
    return { error: "Internal server error" };
  }
};

exports.addPost = async (postData) => {
  try {
    const { user_id, title, content } = postData;

    if (!user_id || !title || !content) {
      return {
        error:
          "Missing required fields: user_id, title, and content are mandatory.",
      };
    }

    const allowedKeys = ["user_id", "title", "content"];
    const extraKeys = Object.keys(postData).filter(
      (key) => !allowedKeys.includes(key)
    );
    if (extraKeys.length > 0) {
      return { error: `Invalid fields in payload: ${extraKeys.join(", ")}` };
    }

    const newPost = await Posts.create({
      user_id,
      title,
      content,
    });

    return newPost;
  } catch (error) {
    console.error("Error adding post: ", error);
    return { error: "Internal server error" };
  }
};

exports.deletePost = async (id) => {
  try {
    const deletePost = await Posts.destroy({
      where: {
        id: id,
      },
    });

    if (deletePost === 0) {
      return { success: false, message: "Post not found" };
    }

    return { success: true, message: "Post deleted successfully" };
  } catch (err) {
    console.error("Error deleting post:", err);
    throw new Error("Unable to delete post");
  }
};
