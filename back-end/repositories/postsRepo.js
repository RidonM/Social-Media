const { Posts, User, Likes, sequelize } = require("../Database/database");

exports.getAllPosts = async () => {
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
    console.error("Error deleting post:", error);
    throw new Error("Unable to delete post");
  }
};
