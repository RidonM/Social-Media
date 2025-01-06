const { Friends } = require("../Database/database");

exports.getAllFriends = async () => {
  try {
    const friends = await Friends.findAll();
    return friends;
  } catch (err) {
    console.error("Error fetching friends: ", err);
    return { error: "Internal server error" };
  }
};

exports.sendFriendRequest = async (userId, friendId) => {
  try {
    const existingRequest = await Friends.findOne({
      where: {
        user_id: userId,
        friend_id: friendId,
      },
    });

    if (existingRequest) {
      return { message: "Friend request already exists." };
    }

    await Friends.create({
      user_id: userId,
      friend_id: friendId,
      status: "pending",
    });

    return { message: "Friend request sent." };
  } catch (err) {
    console.error("Error sending friend request: ", err);
    return { error: "Internal server error" };
  }
};

exports.acceptFriendRequest = async (userId, friendId) => {
  try {
    const updated = await Friends.update(
      { status: "accepted" },
      {
        where: {
          user_id: friendId,
          friend_id: userId,
          status: "pending",
        },
      }
    );

    if (updated[0] === 0) {
      return { message: "No pending friend request found." };
    }

    return { message: "Friend request accepted." };
  } catch (err) {
    console.error("Error accepting friend request: ", err);
    return { error: "Internal server error" };
  }
};

exports.declineFriendRequest = async (userId, friendId) => {
  try {
    const deleted = await Friends.destroy({
      where: {
        user_id: friendId,
        friend_id: userId,
        status: "pending",
      },
    });

    if (deleted === 0) {
      return { message: "No pending friend request found." };
    }

    return { message: "Friend request declined." };
  } catch (err) {
    console.error("Error declining friend request: ", err);
    return { error: "Internal server error" };
  }
};
