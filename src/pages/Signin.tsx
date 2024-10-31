import Form from '@components/signin/Form';
import { ISigninValues } from '@models/signin';
import { useCallback } from 'react';
import { useAlertContext } from '@contexts/AlertContext';
import { FirebaseError } from 'firebase/app';
import { firebaseAuthService } from 'src/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();
  const { open } = useAlertContext();
  const { state } = useLocation();

  const { mutate } = useMutation({
    mutationKey: ['signin'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      firebaseAuthService.signin({ email, password }),
    onSuccess: () => {
      if (state) {
        navigate(state);
      } else {
        navigate('/');
      }
    },
    onError: (error) => {
      const message =
        error instanceof FirebaseError
          ? '아이디 혹은 비밀번호를 다시 확인해주세요.'
          : error.message || '잠시 후 다시 시도해주세요.';

      open({
        title: message,
        onButtonClick: () => {},
      });
    },
  });

  const handleSubmit = useCallback(async (formValues: ISigninValues) => {
    mutate(formValues);
  }, []);

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}

export default Signin;
