import React from 'react'
import Flex from './Flex'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import { css } from '@emotion/react'
import { colors } from 'src/styles/colorPalette'

function Navbar() {
  const loaction = useLocation()
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false
  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {showSignButton ? (
        <Link to="/signup">
          <Button>로그인/회원가입</Button>
        </Link>
      ) : null}
    </Flex>
  )
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  z-index: 10;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.grey};
`

export default Navbar
