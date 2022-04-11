import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState("");

  const handleCreateBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
      likes,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
    setLikes("");
  };

  return (
    <div>
      <form onSubmit={handleCreateBlog} data-testid="form">
        <div>
          title:
          <input
            id="title"
            data-testid="title"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            data-testid="author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            data-testid="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes:
          <input
            id="likes"
            data-testid="likes"
            value={likes}
            name="likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button id="create-blog" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
