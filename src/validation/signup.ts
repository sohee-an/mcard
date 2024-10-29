import { ISigninValues } from '@models/signin';
import { IFormValues } from '@models/signup';
import validator from 'validator';

type FormValues<T extends 'signup' | 'signin'> = T extends 'signup'
  ? IFormValues
  : ISigninValues;

export function validate<T extends 'signup' | 'signin'>(
  formValues: FormValues<T>,
  mode: T
) {
  let errors: Partial<IFormValues> = {};

  // 이메일 유효성 검사 (회원가입/로그인 공통)
  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요';
  }

  // 비밀번호 유효성 검사 (회원가입/로그인 공통)
  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요.';
  }

  // 회원가입일 때만 추가 검사
  if (mode === 'signup') {
    const signupValues = formValues as IFormValues;
    if (signupValues.rePassword && signupValues.rePassword.length < 8) {
      errors.rePassword = '비밀번호를 8글자 이상 입력해주세요.';
    } else if (
      validator.equals(signupValues.password, signupValues.rePassword) === false
    ) {
      errors.rePassword = '비밀번호를 확인해주세요.';
    }

    if (signupValues.name && signupValues.name.length < 2) {
      errors.name = '이름은 2글자 이상 입력해주세요.';
    }
  }

  return errors;
}
