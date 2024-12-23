const { User, Likes, sequelize } = require("../Database/database");

exports.getLikesOfPost = async (postId) => {
  try {
    const likers = await Likes.findAll({
      where: { post_id: postId },
      attributes: [],
      include: {
        model: User,
        attributes: [
          "id",
          [
            sequelize.fn(
              "CONCAT",
              sequelize.col("User.name"),
              " ",
              sequelize.col("User.surname")
            ),
            "post_liker",
          ],
        ],
        required: true,
      },
    });

    if (!likers.length) {
      return { likers: [], total_likes: 0 };
    }

    const allLikes = likers.map((item) => item.user.dataValues);

    return allLikes;
  } catch (error) {
    console.error("Error getting likes:", error);
    return { error: "Internal server error" };
  }
};

exports.likePosts = async (likedPost) => {
  try {
    const { liked_user_id, post_id } = likedPost;

    if (!liked_user_id || !post_id) {
      return {
        error:
          "Missing required fields: liked_user_id and post_id are mandatory.",
      };
    }

    const allowedKeys = ["liked_user_id", "post_id"];
    const extraKeys = Object.keys(likedPost).filter(
      (key) => !allowedKeys.includes(key)
    );
    if (extraKeys.length > 0) {
      return { error: `Invalid fields in payload: ${extraKeys.join(", ")}` };
    }

    const existingLike = await Likes.findOne({
      where: {
        liked_user_id,
        post_id,
      },
    });

    if (existingLike) {
      return {
        message: "You have already liked this post.",
      };
    }

    const newData = await Likes.create({
      liked_user_id,
      post_id,
    });

    return newData;
  } catch (error) {
    console.error("Error liking post: ", error);
    return { error: "Internal server error" };
  }
};

exports.unLikePost = async (userId, postId) => {
  try {
    const unLike = Likes.destroy({
      where: {
        liked_user_id: userId,
        post_id: postId,
      },
    });

    if (!unLike) {
      return { success: false, message: "Post not liked" };
    }

    return { success: true, message: "Post unliked successfully" };
  } catch (err) {
    console.error("Error unliking post:", err);
    throw new Error("Unable to unlike post");
  }
};
