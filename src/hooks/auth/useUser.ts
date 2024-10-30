import { useRecoilValue } from 'recoil';
import { userAtom } from 'src/atoms/user';

function useUser() {
  return useRecoilValue(userAtom);
}

export default useUser;
