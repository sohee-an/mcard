import Apply from '@components/apply';
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation';
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus';
import LoadingDots from '@components/share/LoadingDots';
import { APPLY_STATUS } from '@models/apply';
import { updateApplyCard } from '@remote/apply';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useUser from 'src/hooks/auth/useUser';
import { useNavigate } from 'react-router-dom';

function ApplyPage() {
  const navigate = useNavigate();
  const [readyToPoll, setReadyToPoll] = useState(false);

  const user = useUser();
  const { id } = useParams() as { id: string };

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
      });
      navigate('/apply/done?success=true', {
        replace: true,
      });
    },
    onError: async () => {
      await updateApplyCard({
        userId: user?.uid as string,
        cardId: id,
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
      });
      navigate('/apply/done?success=false', {
        replace: true,
      });
    },
    enabled: readyToPoll,
  });

  const { mutate, isPending } = useApplyCardMutation({
    onSuccess: () => {
      console.log('카드추가!!');
      setReadyToPoll(true);
    },
    onError: () => {
      window.history.back();
    },
  });

  if (isPending || readyToPoll) {
    return <LoadingDots />;
  }

  return <Apply onSubmit={mutate} />;
}

export default ApplyPage;
