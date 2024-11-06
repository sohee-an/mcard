import { useQuery } from '@tanstack/react-query';

import { APPLY_STATUS } from '@models/apply';

interface usePollApplyStatusProps {
  onSuccess: () => void;
  onError: () => void;
  enabled: boolean;
}

function usePollApplyStatus({
  enabled,
  onSuccess,
  onError,
}: usePollApplyStatusProps) {
  const {
    data: status,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['applyStatus'],
    queryFn: getApplyStatus,
    enabled,
    refetchInterval: 2000,
    staleTime: 0,
  });

  // 성공 상태 처리
  if (isSuccess && status === APPLY_STATUS.COMPLETE) {
    onSuccess();
  }

  // 에러 상태 처리
  if (isError) {
    onError();
  }

  return { status, isSuccess, isError };
}

/** 랜덤하게 뱉어주는 함수 */
function getApplyStatus() {
  const values = [
    APPLY_STATUS.REDAY,
    APPLY_STATUS.PROGRESS,
    APPLY_STATUS.COMPLETE,
    APPLY_STATUS.REJECT,
  ];

  const status = values[Math.floor(Math.random() * values.length)];

  if (status === APPLY_STATUS.REJECT) {
    throw new Error('카드 발급에 실패했습니다.');
  }

  return status;
}

export default usePollApplyStatus;
