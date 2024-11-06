import FixedBottomButton from '@components/share/FixedBottomButton';
import Select from '@components/share/Selected';

import { 연소득옵션, 신용점수옵션, 결제일옵션 } from '@constants/apply';
import styled from '@emotion/styled';
import { ApplyValues } from '@models/apply';
import { ChangeEvent, memo, useCallback, useState } from 'react';

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>;

function BasicInfo({ onNext }: { onNext: (values: InfoValues) => void }) {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    payDate: '',
  });
  const handleInfoChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;

    setInfoValues((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  }, []);

  const allInfoChange = Object.values(infoValues).every(
    (value) => value !== ''
  );

  return (
    <Container>
      <Select
        name="salary"
        label="연소득"
        options={연소득옵션}
        placeholder={연소득옵션[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={신용점수옵션}
        placeholder={신용점수옵션[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="payDate"
        label="결제일"
        options={결제일옵션}
        placeholder={결제일옵션[0].label}
        value={infoValues.payDate}
        onChange={handleInfoChange}
      />
      <FixedBottomButton
        label="다음"
        onClick={() => {
          onNext(infoValues);
        }}
        disabled={allInfoChange === false}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export default memo(BasicInfo);
