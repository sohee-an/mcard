import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'

import { createPortal } from 'react-dom'
import Button from './Button'
import { colors } from 'src/styles/colorPalette'
import { slideup } from 'src/styles/animation'

type TProps = {
  label: string
  onClick: () => void
  disabled?: boolean
}

function FixedBottomButton({ label, onClick, disabled }: TProps) {
  const $portalRoot = document.getElementById('root-portal')

  if ($portalRoot == null) {
    return null
  }
  return (
    <div css={containerStyles}>
      <Button
        disabled={disabled}
        size="medium"
        full={true}
        onClick={onClick}
        css={buttonStyles}
      >
        {label}
      </Button>
    </div>
  )
}

const containerStyles = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
  transform: translateY(100%);
  animation: ${slideup} 0.5s ease-in-out forwards;
`

const buttonStyles = css`
  border-radius: 8px;
`

export default FixedBottomButton
