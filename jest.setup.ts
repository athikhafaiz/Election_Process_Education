import '@testing-library/jest-dom'

// Mock scrollIntoView which is not implemented in jsdom
// @ts-ignore
window.HTMLElement.prototype.scrollIntoView = jest.fn()
