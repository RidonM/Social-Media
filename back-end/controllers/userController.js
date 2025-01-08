const router = require("express").Router();
const { authenticateToken } = require("../middleware/jwt");
const userRepository = require("../repositories/userRepo");

router.get("/profile/:id", async (req, res) => {
  const id = req.params.id;

  const user = await userRepository.getUserById(+id);
  try {
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({
      success: false,
      message: "Error getting user",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await userRepository.getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await userRepository.addUser(req.body);
    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding User",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = await userRepository.loginUser(req.body);
    if (!result) {
      return res.status(401).json({
        success: false,
        error: "Invalid Credentials",
      });
    }

    return res.status(200).json({
      success: true,
      token: result.token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in",
    });
  }
});

router.get("/non-friends", authenticateToken, async (req, res) => {
  try {
    const nonFriends = await userRepository.getNonFriends(req.user.id);
    return res.status(200).json({ success: true, data: nonFriends });
  } catch (err) {
    console.error("Error fetching non-friends:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/request-friends", authenticateToken, async (req, res) => {
  try {
    const pendingFriends = await userRepository.getReceivedFriendRequests(
      req.user.id
    );
    return res.status(200).json({ success: true, data: pendingFriends });
  } catch (err) {
    console.error("Error fetching received friend request:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
