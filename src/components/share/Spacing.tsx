import styled from '@emotion/styled'

type TProps = {
  size: number
  direction?: 'vertical' | 'horizontal'
}

const Spacing = styled.div<TProps>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical' ? `height: ${size}px` : `width:${size}px`}
`

export default Spacing
