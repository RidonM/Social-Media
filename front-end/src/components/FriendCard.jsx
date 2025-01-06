function FriendCard({ friend }) {
  return (
    <div className="friend-card">
      <img src={friend.img} alt={`${friend.name}'s Profile`} />
      <div className="friend-info">
        <h3>{friend.name}</h3>
        <p>{friend.profession}</p>
      </div>
      <button className="add-friend-btn">Add Friend</button>
    </div>
  );
}

export default FriendCard;
