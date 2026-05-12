import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { z } from 'zod/v4';
import { ApiError } from '@/lib/api';
import { useAuthActions } from '../context/auth-provider';
import { useAuthStore } from '@/store';
import './login-form.scss';

const loginSchema = z.object({
  email: z.email('유효한 이메일을 입력하세요'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { login } = useAuthActions();
  const isLoading = useAuthStore((s) => s.isLoading);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError('');
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormData;
        setError(field, { message: issue.message });
      });
      return;
    }
    try {
      await login(result.data);
      navigate({ to: '/dashboard' });
    } catch (e) {
      if (e instanceof ApiError) {
        setServerError(e.message);
      } else {
        setServerError('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="login-form__title">로그인</h2>

      <div className="login-form__field">
        <label htmlFor="login-email">이메일</label>
        <input id="login-email" type="email" {...register('email')} />
        {errors.email && <span className="login-form__error">{errors.email.message}</span>}
      </div>

      <div className="login-form__field">
        <label htmlFor="login-password">비밀번호</label>
        <input id="login-password" type="password" {...register('password')} />
        {errors.password && <span className="login-form__error">{errors.password.message}</span>}
      </div>

      {serverError && <p className="login-form__error">{serverError}</p>}

      <button className="login-form__submit" type="submit" disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
}
