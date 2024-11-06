import { useAlertContext } from '@contexts/AlertContext';
import { ApplyValues } from '@models/apply';
import { applyCard } from '@remote/apply';
import { useMutation } from '@tanstack/react-query';

type TProps = {
  onSuccess: () => void;
  onError: () => void;
};
function useApplyCardMutation({ onSuccess, onError }: TProps) {
  const { open } = useAlertContext();

  return useMutation({
    mutationFn: (applyValues: ApplyValues) => applyCard(applyValues),
    onSuccess: () => {
      onSuccess();
    },
    onError: () => {
      open({
        title: '카드를 신청하지 못했습니다. 나중에 다시 시도해주세요',
        onButtonClick: () => {
          onError();
        },
      });
    },
  });
}

export default useApplyCardMutation;
