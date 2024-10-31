import BasicInfo from '@components/apply/BasicInfo';
import CardInfo from '@components/apply/CardInfo';
import Terms from '@components/apply/Terms';

import React, { useState } from 'react';

function ApplyPage() {
  const [step, setStep] = useState(0);

  const handleTermsChange = (terms: string[]) => {
    console.log('ter', terms);
    setStep((pre) => pre + 1);
  };

  return (
    <div>
      {step === 0 ? <Terms onNext={handleTermsChange} /> : null}
      {step === 1 ? <CardInfo /> : null}
      {step === 2 ? <BasicInfo /> : null}
    </div>
  );
}

export default ApplyPage;
