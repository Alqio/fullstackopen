import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
    let component
    const mockBlog = {
        'author': 'Jorma Uotila',
        'title': 'How to a kill child (process)',
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

    beforeEach(() => {
        component = render(
            <Blog blog={mockBlog} user={mockUser} setBlogs={mockSetBlogs} blogs={[mockBlog]}/>
        )
    })

    test('renders correct content', () => {
        //component.debug()

        expect(component.container).toHaveTextContent(
            mockBlog.title + ' ' + mockBlog.author
        )
        expect(component.queryByText(mockBlog.url)).toBeNull()
        expect(component.queryByText(mockBlog.likes.toString())).toBeNull()
    })

})
