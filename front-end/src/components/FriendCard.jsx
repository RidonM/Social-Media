function FriendCard({ friend }) {
  return (
    <div className="friend-card">
      <img src="images.jpeg" alt={`${friend.name}'s Profile`} />
      <div className="friend-info">
        <h3>
          {friend.name} {friend.surname}
        </h3>
      </div>
      <button className="add-friend-btn">Add Friend</button>
    </div>
  );
}

export default FriendCard;
