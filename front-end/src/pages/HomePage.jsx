import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { usePosts } from "../queryHooks/usePosts";

function HomePage() {
  const { isLoading, posts, error } = usePosts();

  return (
    <>
      <PostForm />
      <div className="home-container">
        <div>
          {posts?.data?.map((item) => (
            <PostCard key={item.id} post={item} />
          ))}
        </div>
        <div></div>
      </div>
    </>
  );
}

export default HomePage;
