import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from './Blog'
import AddBlog from "./AddBlog";


describe('<AddBlog />', () => {
    let component

    const mockCreateBlog = jest.fn()

    beforeEach(() => {
        component = render(
            <AddBlog
                createBlog={mockCreateBlog}
            />
        )
    })

    test('createBlog is called correctly', () => {

        const titleInput = component.container.querySelector('#title')
        const authorInput = component.container.querySelector('#author')
        const urlInput = component.container.querySelector('#url')

        const form = component.container.querySelector('form')

        fireEvent.change(titleInput, {
            target: { value: 'Blog title' }
        })
        fireEvent.change(authorInput, {
            target: { value: 'Blog author' }
        })
        fireEvent.change(urlInput, {
            target: { value: 'Blog URL' }
        })

        fireEvent.submit(form)

        const res = mockCreateBlog.mock.calls[0][1]
        expect(res.title).toBe('Blog title')
        expect(res.author).toBe('Blog author')
        expect(res.url).toBe('Blog URL')

    })

})
