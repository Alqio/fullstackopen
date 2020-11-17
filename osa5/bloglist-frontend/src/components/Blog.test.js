import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
    let component
    const mockBlog = {
        'author': 'Jorma Uotila',
        'title': 'How to kill a child (process)',
        'url': 'www.amazon.com',
        'likes': 69,
        'user': 'userId1'
    }
    const mockUser = {
        'username': 'test_user',
        'token': 'token1',
        'name': 'Uorma Jotila'
    }

    const mockSetBlogs = jest.fn()
    const mockLikeBlog = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog
                blog={mockBlog}
                user={mockUser}
                setBlogs={mockSetBlogs}
                blogs={[mockBlog]}
                likeBlog={mockLikeBlog}
            />
        )
    })

    test('renders correct content when not open', () => {
        expect(component.container).toHaveTextContent(
            mockBlog.title + ' ' + mockBlog.author
        )
        expect(component.queryByText(mockBlog.url)).toBeNull()
        expect(component.queryByText(mockBlog.likes.toString())).toBeNull()
    })

    test('renders correct content when open', () => {

        const showButton = component.getByText('view')

        fireEvent.click(showButton)
        component.debug()
        expect(component.getByText('Author: ' + mockBlog.author)).toBeInTheDocument()
        expect(component.getByText('Title: ' + mockBlog.title)).toBeInTheDocument()

        expect(component.getByText('URL:')).toBeInTheDocument()
        expect(component.getByText('www.amazon.com')).toBeInTheDocument()
        expect(component.getByText('Likes: ' + mockBlog.likes.toString())).toBeInTheDocument()

    })

    test('like button works', () => {

        const showButton = component.getByText('view')

        fireEvent.click(showButton)

        const likeButton = component.getByText('like')

        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockLikeBlog.mock.calls).toHaveLength(2)

    })
})
