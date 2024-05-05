const { normalizeURL, getURLsFromHtml } = require('./crawl.js')
const { test, expect } = require("@jest/globals")

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


test('getURLsFromHtml absolute', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html> 
    `

    const inputBaseUrl = 'https://blog.boot.dev/path/'
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})


test('getURLsFromHtml both', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path1/">
                Boot.dev Blog path one
            </a>
            <a href="https://blog.boot.dev/path2/">
                Boot.dev Blog path two
            </a>
        </body>
    </html> 
    `

    const inputBaseUrl = 'https://blog.boot.dev'
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHtml invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Inhvalid
            </a>
        </body>
    </html> 
    `

    const inputBaseUrl = 'https://blog.boot.dev/path/'
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseUrl)
    const expected = []
    expect(actual).toEqual(expected)
})