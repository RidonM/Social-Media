import { useAcceptFriends } from "../queryHooks/useAcceptFriend";
import { useDeclineFriends } from "../queryHooks/useDeclineFriend";

function FriendRequestCard({ friend }) {
  const { isLoading, acceptFriend, error } = useAcceptFriends();
  const { declinig, declineFriend } = useDeclineFriends();

  function accept(id) {
    acceptFriend({
      friendId: id,
    });
  }

  function decline(id) {
    declineFriend({
      friendId: id,
    });
  }

  return (
    <div className="card">
      <div className="profile-container">
        <img
          className="profile-image"
          src="/images.jpeg"
          alt={`${friend?.name}'s profile`}
        />
        <p className="message">
          {friend?.name} {friend?.surname} sent you a friend request
        </p>
      </div>
      <div className="button-container">
        <button onClick={() => accept(friend?.id)} className="accept-button">
          Accept
        </button>
        <button onClick={() => decline(friend?.id)} className="decline-button">
          Decline
        </button>
      </div>
    </div>
  );
}

export default FriendRequestCard;
