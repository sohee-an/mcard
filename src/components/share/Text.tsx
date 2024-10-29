import { CSSProperties } from 'react'
import { colors, Colors } from 'src/styles/colorPalette'
import { Typography, typographyMap } from 'src/styles/typography'
import styled from '@emotion/styled'

interface TextProps {
  typography?: Typography
  color?: Colors | string
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
}

// 타입 가드 함수
function isColors(value: string): value is Colors {
  return Object.keys(colors).includes(value)
}

const Text = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    // 타입 가드로 colors 안에 있는지 확인 후 처리
    color: isColors(color) ? colors[color] : color,
    display,
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)

export default Text
