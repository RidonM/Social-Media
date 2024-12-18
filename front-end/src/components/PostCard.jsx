const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-author">
          Posted by{" "}
          <span className="author-name">
            {post.user.name} {post.user.surname}
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
