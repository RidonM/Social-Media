import { faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import { useDeletePosts } from "../queryHooks/useDeletePosts";

const PostCard = ({ post }) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  const userId = decoded.id;

  const { deletePost, isLoading, error } = useDeletePosts();

  function deleteThePost(id) {
    deletePost(id);
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
        <button className="like-button">
          <FontAwesomeIcon size="lg" icon={faThumbsUp} />
        </button>
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
