import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("test for new blog form", () => {
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  const title = screen.getByTestId("title");
  const author = screen.getByTestId("author");
  const url = screen.getByTestId("url");
  const likes = screen.getByTestId("likes");
  const form = screen.getByTestId("form");

  fireEvent.change(title, {
    target: { value: "Testing Title" },
  });

  fireEvent.change(author, {
    target: { value: "Jhon Doe" },
  });

  fireEvent.change(url, {
    target: { value: "www.example.com" },
  });

  fireEvent.change(likes, {
    target: { value: 3 },
  });

  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Testing Title");
  expect(createBlog.mock.calls[0][0].author).toBe("Jhon Doe");
  expect(createBlog.mock.calls[0][0].url).toBe("www.example.com");
  expect(createBlog.mock.calls[0][0].likes).toBe("3");
});
