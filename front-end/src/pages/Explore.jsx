import FriendCard from "../components/FriendCard";
import { useAddFriends } from "../queryHooks/useAddFriends";
import { useNonFriends } from "../queryHooks/useNonFriends";

function Explore() {
  const { isLoading, users, error } = useNonFriends();

  return (
    <>
      <div className="container">
        <header>
          <h1>Explore More</h1>
          <p>Connect with new friends!</p>
        </header>

        <div className="friends-list">
          {users?.data?.map((user) => (
            <FriendCard key={user.id} friend={user} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Explore;
