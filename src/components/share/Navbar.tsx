import Flex from './Flex';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { css } from '@emotion/react';
import { colors } from 'src/styles/colorPalette';
import useUser from 'src/hooks/auth/useUser';
import { useCallback } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@remote/firebase';

function Navbar() {
  const location = useLocation();
  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false;

  const user = useUser();
  const handleLogout = () => {
    signOut(auth);
  };

  const renderButton = useCallback(() => {
    if (user != null) {
      return <Button>로그아웃</Button>;
    }
    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button onClick={handleLogout}>로그인/회원가입</Button>
        </Link>
      );
    }
    return null;
  }, [user]);

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  );
}

const navbarContainerStyles = css`
  padding: 10px 24px;
  height: 27px;
  z-index: 10;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.grey};
`;

export default Navbar;
