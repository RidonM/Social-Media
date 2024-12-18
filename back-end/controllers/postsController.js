const router = require("express").Router();
const { authenticateToken } = require("../middleware/jwt");
const postsRepository = require("../repositories/postsRepo");

router.use(authenticateToken);

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const post = await postsRepository.getPostById(+id);
  try {
    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Error getting post:", error);
    res.status(500).json({
      success: false,
      message: "Error getting post",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await postsRepository.getAllPosts();
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching posts",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await postsRepository.addPost(req.body);
    res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding Post",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const result = await postsRepository.deletePost(id);

    if (!result.success) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
