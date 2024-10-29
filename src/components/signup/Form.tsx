import FixedBottomButton from '@components/share/FixedBottomButton';
import Flex from '@components/share/Flex';
import Spacing from '@components/share/Spacing';
import TextField from '@components/share/TextLabel';
import { css } from '@emotion/react';
import { IFormValues } from '@models/signup';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { validate } from 'src/validation/signup';

const initValue = {
  email: '',
  password: '',
  rePassword: '',
  name: '',
};

type TProps = {
  onSubmit: (formValues: IFormValues) => void;
};

function Form({ onSubmit }: TProps) {
  const [formValues, setFormValues] = useState<IFormValues>(initValue);
  const [dirty, setDirty] = useState<IFormValues>(initValue);

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  }, []);
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }));
  }, []);

  const errors = useMemo(() => validate(formValues), [formValues]);
  const isValidation = Object.keys(errors).length === 0;

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        type="email"
        name="email"
        placeholder="text@text.com"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패드워드 재확인"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        placeholder="이름을 적어주세요"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <FixedBottomButton
        disabled={isValidation === false}
        label="회원가입"
        onClick={() => {
          onSubmit(formValues);
        }}
      />
    </Flex>
  );
}

const formContainerStyles = css`
  padding: 24px;
`;

export default Form;
