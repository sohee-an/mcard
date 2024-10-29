import { IFormValues } from '@models/signup'
import validator from 'validator'

export function validate(formValues: IFormValues) {
  let errors: Partial<IFormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }
  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8글자 이상 입력해주세요.'
  }
  if (formValues.password.length < 8) {
    errors.rePassword = '비밀번호를 8글자 이상 입력해주세요.'
  } else if (
    validator.equals(formValues.password, formValues.rePassword) === false
  ) {
    errors.rePassword = '비밀번호를 확인해주세요.'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2글자 이상 입력해주세요.'
  }
  return errors
}
