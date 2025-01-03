import Flex from '@components/share/Flex';
import Text from '@components/share/Text';
import { parse } from 'qs';
import FixedBottomButton from '@components/share/FixedBottomButton';
import CardIssuedMessage from '@components/apply/CardIssue';

function ApplyDone() {
  const { success } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as { success: string };
  return (
    <>
      <CardIssuedMessage state={success} />

      <FixedBottomButton
        label="확인"
        onClick={() => {
          window.history.back();
        }}
      />
    </>
  );
}

export default ApplyDone;
