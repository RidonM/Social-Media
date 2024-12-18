import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { useAddPosts } from "../queryHooks/useAddPosts";

function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { isLoading, addPost, error } = useAddPosts();

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);

  function onSubmit(data) {
    addPost({ ...data, user_id: decoded.id });
    reset();
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <h2 style={styles.title}>Create a Post</h2>

        <div style={styles.inputGroup}>
          <label htmlFor="title" style={styles.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter post title"
            style={styles.input}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.title.message}
            </span>
          )}
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="content" style={styles.label}>
            Content
          </label>
          <textarea
            id="content"
            placeholder="What's on your mind?"
            style={styles.textarea}
            {...register("content", { required: "Content is required" })}
          ></textarea>
          {errors.content && (
            <span style={{ color: "red", fontSize: "12px" }}>
              {errors.content.message}
            </span>
          )}
        </div>

        <button disabled={isLoading} type="submit" style={styles.button}>
          {isLoading ? "..." : "Post"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingInline: "7rem",
    marginTop: "2rem",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "1.5rem",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    resize: "none",
    height: "100px",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2e8b57",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default PostForm;
