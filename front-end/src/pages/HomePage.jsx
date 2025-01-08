import FriendRequestCard from "../components/FriendRequest";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { useFriendsPost } from "../queryHooks/useFriendsPost";
import { useRequestFriends } from "../queryHooks/useRequestFriends";

function HomePage() {
  const { isLoading, posts, error } = useFriendsPost();

  const { requestedFriends } = useRequestFriends();
  console.log("ridon11", requestedFriends);

  return (
    <>
      <PostForm />
      <div className="home-container">
        <div>
          {posts?.data?.map((item) => (
            <PostCard key={item.id} post={item} />
          ))}
        </div>
        <div>
          {requestedFriends?.data?.map((friend) => (
            <FriendRequestCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
