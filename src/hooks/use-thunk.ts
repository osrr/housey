import { ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import { AppDispatch, useAppDispatch } from '../store';
import { useCallback, useState } from 'react';

type UseThunkReturn<T> = [(arg: T) => void, boolean, string | null];

export const useThunk = <T, R>(
  thunk: (arg: T) => ThunkAction<Promise<R>, unknown, unknown, UnknownAction>
): UseThunkReturn<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch: AppDispatch = useAppDispatch();

  const runThunk = useCallback(
    (arg: T) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        //@ts-expect-error ts is not recognizing .unwrap() but its there from createAsyncThunk
        .unwrap()
        .catch((err: string) => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk]
  );

  return [runThunk, isLoading, error];
};
