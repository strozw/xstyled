import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { x } from '.'
import { renderWithTheme } from './theme.test'

afterEach(cleanup)

describe('#x', () => {
  it('creates system based components', () => {
    const { container } = render(<x.div m={2} p={1} />)
    expect(container.firstChild).toHaveStyle(`
      margin: 2px;
      padding: 1px;  
    `)
  })

  it('supports "as" prop', () => {
    // "as" is not supported with emotion
    // @ts-expect-error
    const { container } = render(<x.div as="a" m={2} p={1} href="#" />)
    expect(container.firstChild?.nodeName).toBe('A')
    expect(container.firstChild).toHaveStyle(`
      margin: 2px;
      padding: 1px; 
    `)
  })

  it('supports "as" shorthand', () => {
    const { container } = render(
      <x.a m={2} p={1} href="#">
        Hello
      </x.a>,
    )
    expect(container.firstChild?.nodeName).toBe('A')
    expect(container.firstChild).toHaveStyle(`
      margin: 2px;
      padding: 1px; 
    `)
  })

  it('uses theme', () => {
    const { container } = renderWithTheme(
			<x.a m={2} p={1}>
				Hello
			</x.a>
    )
    expect(container.firstChild?.nodeName).toBe('A')
    expect(container.firstChild).toHaveStyle(`
      margin: 8px;
      padding: 4px; 
    `)
  })

  it('does not forward props', () => {
    const { container } = render(<x.div display="flex" data-foo="bar" />)
    expect(container.firstChild?.nodeName).toBe('DIV')
    expect(container.firstChild).toHaveStyle('display: flex;')
    expect(container.firstChild).not.toHaveAttribute('display')
    expect(container.firstChild).toHaveAttribute('data-foo')
  })
})
