import { useAddFriends } from "../queryHooks/useAddFriends";

function FriendCard({ friend }) {
  const { isLoading, addFriends, error } = useAddFriends();

  function addFriend(id) {
    addFriends({ friendId: id });
  }

  return (
    <div className="friend-card">
      <img src="images.jpeg" alt={`${friend.name}'s Profile`} />
      <div className="friend-info">
        <h3>
          {friend.name} {friend.surname}
        </h3>
      </div>
      <button onClick={() => addFriend(friend.id)} className="add-friend-btn">
        Add Friend
      </button>
    </div>
  );
}

export default FriendCard;
