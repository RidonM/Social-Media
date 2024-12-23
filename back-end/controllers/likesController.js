const express = require("express");
const likesRepository = require("../repositories/likesRepo");
const { authenticateToken } = require("../middleware/jwt");
const router = express.Router();

router.use(authenticateToken);

router.get("/posts/:id", async (req, res) => {
  const likers = await likesRepository.getLikesOfPost(req.params.id);
  try {
    res.status(200).json({
      success: true,
      data: likers,
    });
  } catch (error) {
    console.error("Error getting likes of post:", error);
    res.status(500).json({
      success: false,
      message: "Error getting likes of the post",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const addLike = await likesRepository.likePosts(req.body);
    res.status(201).json({
      success: true,
      data: addLike,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error liking post",
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { userId, postId } = req.query;

    if (!userId || !postId) {
      return res.status(400).send({ error: "userId and postId are required" });
    }

    const unLike = await likesRepository.unLikePost(userId, postId);

    if (!unLike) {
      return res
        .status(404)
        .send({ error: "Post not found or user has not liked this post" });
    }

    return res.status(200).send({ message: "Post unliked successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
