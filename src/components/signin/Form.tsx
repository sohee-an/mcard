import Button from '@components/share/Button';
import Flex from '@components/share/Flex';
import Spacing from '@components/share/Spacing';
import Text from '@components/share/Text';
import TextField from '@components/share/TextLabel';
import { css } from '@emotion/react';
import { ISigninValues } from '@models/signin';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { colors } from 'src/styles/colorPalette';
import { validate } from 'src/validation/signup';

const initValue = {
  email: '',
  password: '',
};

type TProps = {
  onSubmit: (formValues: ISigninValues) => void;
};

function Form({ onSubmit }: TProps) {
  const [formValues, setFormValues] = useState(initValue);
  const [dirty, setDirty] = useState(initValue);

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

  const errors = useMemo(() => validate(formValues, 'signin'), [formValues]);
  const isValidation = Object.keys(errors).length === 0;

  return (
    <Flex direction="column" css={formContainerStyles}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formValues);
        }}
      >
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

        <Spacing size={20} />
        <Button
          type="submit"
          size="medium"
          css={formStyles}
          //   style={{ width: '100%' }}
          disabled={isValidation === false}
          onClick={() => {
            onSubmit(formValues);
          }}
        >
          로그인
        </Button>
      </form>

      <Spacing size={12} />
      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요 ?</Text>
      </Link>
    </Flex>
  );
}

const formContainerStyles = css`
  padding: 24px;
`;
const formStyles = css`
  width: 100%;
`;

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`;

export default Form;
