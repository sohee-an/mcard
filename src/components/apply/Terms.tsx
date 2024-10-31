import Agreement from '@components/share/Agreement';
import FixedBottomButton from '@components/share/FixedBottomButton';
import { 약관목록 } from '@constants/apply';
import { useCallback, useState, MouseEvent, memo } from 'react';

function Terms({ onNext }: { onNext: (term: string[]) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() =>
    Object.fromEntries(약관목록.map((term) => [term.id, false]))
  );

  //   const [termsAgreements, setTermsAgreements] = useState(() =>
  //     약관목록.reduce<Record<string, boolean>>(
  //       (prev, term) => ({
  //         ...prev,
  //         [term.id]: false,
  //       }),
  //       {}
  //     )
  //   );

  const handleAllAgremment = useCallback(
    (_: MouseEvent<HTMLElement>, checked: boolean) => {
      setTermsAgreements((prevTerms) => {
        return Object.keys(prevTerms).reduce(
          (prev, key) => ({
            ...prev,
            [key]: checked,
          }),
          {}
        );
      });
    },
    []
  );

  const allTermsCheck = Object.values(termsAgreements).every(
    (val) => val === true
  );

  return (
    <>
      <Agreement>
        <Agreement.Title checked={allTermsCheck} onChange={handleAllAgremment}>
          약관에 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => {
          return (
            <Agreement.Description
              key={id}
              link={link}
              checked={termsAgreements[id]}
              onChange={(_, checked) => {
                setTermsAgreements((prevTerms) => ({
                  ...prevTerms,
                  [id]: checked,
                }));
              }}
            >
              {title}
            </Agreement.Description>
          );
        })}
      </Agreement>
      <FixedBottomButton
        disabled={allTermsCheck === false}
        label="약관동의"
        onClick={() => onNext(Object.keys(termsAgreements))}
      />
    </>
  );
}

export default memo(Terms);
