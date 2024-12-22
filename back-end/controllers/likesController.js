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

module.exports = router;
