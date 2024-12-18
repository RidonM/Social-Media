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

module.exports = router;
