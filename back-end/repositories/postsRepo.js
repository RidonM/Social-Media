const { Op } = require("sequelize");
const {
  Posts,
  User,
  Friends,
  Likes,
  sequelize,
} = require("../Database/database");

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

exports.getPostsFromFriends = async (currentUserId) => {
  try {
    const posts = await Posts.findAll({
      where: {
        user_id: {
          [Op.in]: sequelize.literal(`
                      (SELECT friend_id FROM friends WHERE user_id = ${currentUserId}
                      UNION
                      SELECT user_id FROM friends WHERE friend_id = ${currentUserId})
                  `),
        },
      },
      include: [
        {
          model: User,
          attributes: ["name", "surname"],
        },
        {
          model: Likes,
          attributes: [], // Do not return the actual Likes, just use them to count
          required: false, // Left join to include posts even if they have no likes
        },
      ],
      attributes: {
        include: [
          [sequelize.fn("COUNT", sequelize.col("Likes.id")), "likeCount"], // Count the likes
          [
            sequelize.literal(`
                EXISTS (
                    SELECT 1 FROM likes
                    WHERE likes.post_id = Posts.id
                    AND likes.liked_user_id = ${currentUserId}
                )
            `),
            "isLiked", // Check if the current user liked the post
          ],
        ],
      },
      group: ["Posts.id", "User.id"], // Group by post ID to use COUNT
      order: [["createdAt", "DESC"]],
    });

    // Include your own posts as well
    const yourPosts = await Posts.findAll({
      where: {
        user_id: currentUserId, // Only your own posts
      },
      include: [
        {
          model: User,
          attributes: ["name", "surname"],
        },
        {
          model: Likes,
          attributes: [], // Do not return the actual Likes, just use them to count
          required: false, // Left join to include posts even if they have no likes
        },
      ],
      attributes: {
        include: [
          [sequelize.fn("COUNT", sequelize.col("Likes.id")), "likeCount"], // Count the likes
          [
            sequelize.literal(` 
                EXISTS (
                    SELECT 1 FROM likes 
                    WHERE likes.post_id = Posts.id 
                    AND likes.liked_user_id = ${currentUserId} 
                ) 
            `),
            "isLiked", // Check if the current user liked the post
          ],
        ],
      },
      group: ["Posts.id", "User.id"], // Group by post ID to use COUNT
      order: [["createdAt", "DESC"]],
    });

    // Combine your posts with your friends' posts
    const allPosts = [...posts, ...yourPosts];

    // Sort all posts in descending order based on creation date
    allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return allPosts;
  } catch (error) {
    console.error("Error fetching posts from friends:", error);
    throw error;
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
