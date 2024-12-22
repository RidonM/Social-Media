const postsRepository = require("../repositories/postsRepo");

exports.checkPostOwner = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    const post = await postsRepository.getPostById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.user_id != userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }

    next();
  } catch (err) {
    console.error("Error in ownership check:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
