import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ApiError } from '@/lib/api';

export function useAuthSubmit(successPath = '/dashboard') {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const submit = async (action: () => Promise<void>) => {
    setServerError('');
    try {
      await action();
      navigate({ to: successPath });
    } catch (e) {
      if (e instanceof ApiError) {
        setServerError(e.message);
      } else {
        setServerError('요청에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return { serverError, submit };
}
