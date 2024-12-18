import { jwtDecode } from "jwt-decode";

const PostCard = ({ post }) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

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
      <div className="post-footer">
        <button className="like-button">
          <span className="like-count">5</span> Likes
        </button>
      </div>
    </div>
  );
};

export default PostCard;
