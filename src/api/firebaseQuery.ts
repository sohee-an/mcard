import { FirebaseError } from 'firebase/app';
import { useState, useCallback } from 'react';

type FirebaseQueryHook<T> = {
  execute: (...args: any[]) => Promise<T | undefined>;
  data: T | null;
  loading: boolean;
  error: Error | null;
};

type UseFirebaseQueryOptions = {
  onError?: (error: Error) => void;
};

export function useFirebaseQuery<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options?: UseFirebaseQueryOptions
): FirebaseQueryHook<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: any[]): Promise<T | undefined> => {
      setLoading(true);
      setError(null);

      try {
        const response = await asyncFunction(...args);
        setData(response);
        return response;
      } catch (e) {
        const err =
          e instanceof FirebaseError
            ? e
            : new Error('알 수 없는 오류가 발생했습니다.');
        setError(err);

        if (options?.onError) {
          options.onError(err);
        }
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction, options]
  );

  return { execute, data, loading, error };
}
