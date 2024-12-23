import { faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import { useDeletePosts } from "../queryHooks/useDeletePosts";
import { useLikePost } from "../queryHooks/useLikePost";
import { useUnLikePost } from "../queryHooks/useUnLikePost";

const PostCard = ({ post }) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const userId = decoded.id;

  const { deletePost, isLoading, error } = useDeletePosts();
  const { loading, like, errors } = useLikePost();
  const { load, unLike } = useUnLikePost();

  function deleteThePost(id) {
    deletePost(id);
  }

  function likePost(post) {
    like({ liked_user_id: userId, post_id: post });
  }

  function unLikePost(postId) {
    unLike({ userId, postId });
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="header-content">
          <h2 className="post-title">{post.title}</h2>
          <span className="post-date">
            {formatter.format(new Date(post.createdAt))}
          </span>
        </div>
        <p className="post-author">
          Posted by{" "}
          <span className="author-name">
            {post.user_id === decoded.id
              ? "You"
              : `${post.user.name} ${post.user.surname}`}
          </span>
        </p>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <span className="like-count">
        {post.likeCount} {post.likeCount === 1 ? "Like" : "Likes"}
      </span>
      <div className="post-footer">
        {post.isLiked === 1 ? (
          <button
            onClick={() => unLikePost(post.id)}
            className="like-button"
            style={{ backgroundColor: "#2e8b57" }}
          >
            <FontAwesomeIcon size="lg" icon={faThumbsUp} color={"#fff"} />
          </button>
        ) : (
          <button
            onClick={() => likePost(post.id)}
            className="like-button"
            style={{
              backgroundColor: "#fff",
            }}
          >
            <FontAwesomeIcon size="lg" icon={faThumbsUp} color={"#2e8b57"} />
          </button>
        )}
        {userId === post.user_id && (
          <button className="delete-btn" onClick={() => deleteThePost(post.id)}>
            <FontAwesomeIcon size="lg" icon={faTrash} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
