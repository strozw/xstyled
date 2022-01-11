import * as React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { cleanup } from '@testing-library/react'
import styled from '@emotion/styled'
import { css } from '.'
import { renderWithTheme } from './theme.test'

afterEach(cleanup)

describe('#css', () => {
  it('transforms rules', () => {
    const Dummy = styled.div`
      ${css`
        margin: 2;
        padding: 1;
        margin-top: 2px;
      `}
    `
    const { container } = renderWithTheme(<Dummy />)
    expect(container.firstChild).toHaveStyle(`
      margin: 2px 8px 8px 8px;
      padding: 4px;
    `)
  })

  it('transforms multi values', () => {
    const Dummy = styled.div`
      ${css`
        margin: 1 2;
      `}
    `
    const { container } = renderWithTheme(<Dummy />)
    expect(container.firstChild).toHaveStyle('margin: 4px 8px;')
  })

  it('transforms constants', () => {
    const two = 2
    const Dummy = styled.div`
      ${css`
        margin: 1 ${two};
      `}
    `
    const { container } = renderWithTheme(<Dummy />)
    expect(container.firstChild).toHaveStyle('margin: 4px 8px;')
  })

  it('accepts object', () => {
    const Dummy = styled.div`
      ${css({
        margin: '1 2',
      })}
    `
    const { container } = renderWithTheme(<Dummy />)
    expect(container.firstChild).toHaveStyle('margin: 4px 8px;')
  })

  it('accepts function', () => {
    const Dummy = styled.div`
      ${css((_p) => ({
        margin: '1 2',
      }))}
    `
    const { container } = renderWithTheme(<Dummy />)
    expect(container.firstChild).toHaveStyle('margin: 4px 8px;')
  })

  it('transforms babel-plugin-emotion output', () => {
    const Dummy = styled.div`
      ${css({
        // @ts-ignore
        name: '1hne1bh-obj',
        styles: 'margin: 1 2;label:x;',
      })}
    `
    const { container } = renderWithTheme(<Dummy />)
    expect(container.firstChild).toHaveStyle('margin: 4px 8px;')
  })
})
