const friendsRepository = require("../repositories/friendsRepo");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const friends = await friendsRepository.getAllFriends();

    res.status(200).json({
      status: true,
      data: friends,
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({
      success: false,
      message: "Error getting user",
    });
  }
});

router.post("/send", async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    if (!userId || !friendId) {
      return res.status(400).json({
        success: false,
        message: "Both userId and friendId are required.",
      });
    }

    const response = await friendsRepository.sendFriendRequest(
      userId,
      friendId
    );

    res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({
      success: false,
      message: "Error sending friend request.",
    });
  }
});

router.put("/accept", async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    if (!userId || !friendId) {
      return res.status(400).json({
        success: false,
        message: "Both userId and friendId are required.",
      });
    }

    const response = await friendsRepository.acceptFriendRequest(
      userId,
      friendId
    );

    res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({
      success: false,
      message: "Error accepting friend request.",
    });
  }
});

router.put("/decline", async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    if (!userId || !friendId) {
      return res.status(400).json({
        success: false,
        message: "Both userId and friendId are required.",
      });
    }

    const response = await friendsRepository.declineFriendRequest(
      userId,
      friendId
    );

    res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    console.error("Error declining friend request:", error);
    res.status(500).json({
      success: false,
      message: "Error declining friend request.",
    });
  }
});

module.exports = router;
