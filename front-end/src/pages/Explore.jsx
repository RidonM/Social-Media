import FriendCard from "../components/FriendCard";
import { useNonFriends } from "../queryHooks/useNonFriends";

function Explore() {
  const { isLoading, users, error } = useNonFriends();

  console.log("ridon7", users);

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
