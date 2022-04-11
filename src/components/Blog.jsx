import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLikes, handleRemoving }) => {
  const [showFull, setShowFull] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showFullBlog = () => {
    return (
      <div>
        <p data-testid="url">{blog.url}</p>
        <p data-testid="likes">
          {blog.likes}{" "}
          <button
            className="like"
            onClick={() => handleLikes(blog.id, blog.likes)}
          >
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        <button className="remove" onClick={() => handleRemoving(blog)}>
          Remove
        </button>
      </div>
    );
  };

  return (
    <div style={blogStyle}>
      <p data-testid="title">{blog.title}</p>
      <i data-testid="author">{blog.author}</i>
      <button data-testid="btn-show-full" onClick={() => setShowFull(!showFull)}>
        {showFull ? "hide" : "view"}
      </button>
      {showFull && showFullBlog()}
    </div>
  );
};

Blog.propTypes = {
  setUpdate: PropTypes.func,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
  }),
};

export default Blog;
