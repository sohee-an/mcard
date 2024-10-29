import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

import Form from '@components/signup/Form';
import { IFormValues } from '@models/signup';
import { auth, store } from '@remote/firebase';
import { COLLECTIONS } from '@constants/index';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const handleSubmit = async (formValues: IFormValues) => {
    const { email, password, name } = formValues;

    try {
      // 사용자 생성
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('user', user);

      // Firestore에 사용자 정보 저장
      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: name,
      };
      await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser);
      navigate('/');
    } catch (error: any) {
      // 오류 발생 시 alert 표시
      if (error.code === 'auth/email-already-in-use') {
        alert('이미 등록된 이메일 주소입니다. 다른 이메일을 사용해 주세요.');
      } else {
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}

export default Signup;
