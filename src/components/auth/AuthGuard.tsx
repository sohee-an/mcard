import React, { useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@remote/firebase';
import LoadingDots from '@components/share/LoadingDots';

type TProps = {
  children: React.ReactNode;
};

function AuthGuard({ children }: TProps) {
  const [initialize, setInitialize] = useState(false);

  onAuthStateChanged(auth, (user) => {
    console.log('user', user);
    setInitialize(true);
  });
  if (initialize === false) {
    return <LoadingDots />;
  }

  return <LoadingDots />;
}

export default AuthGuard;
