import React, { useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@remote/firebase';
import LoadingDots from '@components/share/LoadingDots';

import { useSetRecoilState } from 'recoil';
import { userAtom } from 'src/atoms/user';

type TProps = {
  children: React.ReactNode;
};

function AuthGuard({ children }: TProps) {
  const [initialize, setInitialize] = useState(false);
  const setUser = useSetRecoilState(userAtom);

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      });
    } else {
      setUser(null);
    }

    setInitialize(true);
  });
  if (initialize === false) {
    return <LoadingDots />;
  }

  return <>{children}</>;
}

export default AuthGuard;
