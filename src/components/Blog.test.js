import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'

describe('<Blog />', () => {
  let sampleBlog = {
    title: 'Testing React Project With Jest',
    author: 'Jhon Doe',
    url: 'https://example.com/test',
    likes: "2",
    user: '606f2ec415917a37c0b3732f',
  }

  let mockHandler = jest.fn()

  blogService.update = jest.fn().mockImplementation(() => {
    return Promise.resolve({ success: true })
  })

  test('the component is displaying blog title and author by default', () => {
    render(<Blog blog={sampleBlog} handleLikes={mockHandler} />)
    expect(screen.getByTestId('title')).toHaveTextContent(sampleBlog.title)
    expect(screen.getByTestId('author')).toHaveTextContent(sampleBlog.author)
  })

  test('the component is displaying url and likes after clicking button', () => {
    render(<Blog blog={sampleBlog} handleLikes={mockHandler} />)
    const button = screen.getByText('view')
    fireEvent.click(button)

    expect(screen.getByTestId('likes')).toHaveTextContent(sampleBlog.likes)
    expect(screen.getByTestId('url')).toHaveTextContent(sampleBlog.url)
  })

  test('if the like button is clicked twice, the event handler should be called twice', () => {
    render(<Blog blog={sampleBlog} handleLikes={mockHandler} />)
    const viewButton = screen.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = screen.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
