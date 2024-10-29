import Form from '@components/signin/Form';
import { ISigninValues } from '@models/signin';
import React, { useCallback } from 'react';

function Signin() {
  const handleSubmit = useCallback((formValues: ISigninValues) => {}, []);
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}

export default Signin;
