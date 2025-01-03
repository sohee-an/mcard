import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import Alert from '@components/share/Alert';

type AlertProps = ComponentProps<typeof Alert>;
type AlertOptions = Omit<AlertProps, 'open'>;

interface AlertContextValue {
  open: (options: AlertOptions) => void;
}

const Context = createContext<AlertContextValue | undefined>(undefined);

const defaultValue: AlertProps = {
  open: false,
  title: null,
  description: null,
  buttonLabel: '',
  onButtonClick: () => {},
};
export function AlertContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alertState, setAlertState] = useState(defaultValue);

  const close = useCallback(() => {
    setAlertState(defaultValue);
  }, []);

  const open = useCallback(
    ({ onButtonClick, ...options }: AlertProps) => {
      setAlertState({
        ...options,
        onButtonClick: () => {
          close();
          onButtonClick();
        },
        open: true,
      });
    },
    [close]
  );

  const values = useMemo(() => ({ open }), [open]);

  const $portal_root = document.getElementById('root-portal');
  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root != null
        ? createPortal(<Alert {...alertState} />, $portal_root)
        : null}
      <Alert {...alertState} />
    </Context.Provider>
  );
}

export function useAlertContext() {
  const values = useContext(Context);

  if (values == null) {
    throw new Error('AlertContext 내부에서 사용해주세요.');
  }
  return values;
}
