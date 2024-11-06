import BasicInfo from '@components/apply/BasicInfo';
import CardInfo from '@components/apply/CardInfo';
import Terms from '@components/apply/Terms';
import styled from '@emotion/styled';
import { APPLY_STATUS, ApplyValues } from '@models/apply';

import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUser from 'src/hooks/auth/useUser';

function Apply({ onSubmit }: { onSubmit: (values: ApplyValues) => void }) {
  const user = useUser();
  const { id } = useParams() as { id: string };

  const [step, setStep] = useState(0);
  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  });

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prev) => ({
      ...prev,
      terms,
    }));
    setStep((prevState) => prevState + 1);
  };
  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'payDate'>
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      infoValues,
    }));
    setStep((prevState) => prevState + 1);
  };

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isMaster' | 'isHipass' | 'isRf'>
  ) => {
    setApplyValues((prev) => ({
      ...prev,
      cardInfoValues,
    }));
  };

  useEffect(() => {
    if (step === 2) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.REDAY,
      } as ApplyValues);
    }
  }, [applyValues, step, onSubmit]);

  return (
    <Container>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <BasicInfo onNext={handleBasicInfoChange} /> : null}
      {step === 2 ? <CardInfo onNext={handleCardInfoChange} /> : null}
    </Container>
  );
}

const Container = styled.div`
  padding: 12px;
`;

export default memo(Apply);
