import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { z } from 'zod/v4';
import { ApiError } from '@/lib/api';
import { useAuthActions } from '../context/auth-provider';
import { useAuthStore } from '@/store';
import './signup-form.scss';

const signupSchema = z
  .object({
    name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
    email: z.email('유효한 이메일을 입력하세요'),
    password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const { signup } = useAuthActions();
  const isLoading = useAuthStore((s) => s.isLoading);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: SignupFormData) => {
    setServerError('');
    const result = signupSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof SignupFormData;
        setError(field, { message: issue.message });
      });
      return;
    }
    const { confirmPassword: _, ...params } = result.data;
    try {
      await signup(params);
      navigate({ to: '/dashboard' });
    } catch (e) {
      if (e instanceof ApiError) {
        setServerError(e.message);
      } else {
        setServerError('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="signup-form__title">회원가입</h2>

      <div className="signup-form__field">
        <label htmlFor="signup-name">이름</label>
        <input id="signup-name" type="text" {...register('name')} />
        {errors.name && <span className="signup-form__error">{errors.name.message}</span>}
      </div>

      <div className="signup-form__field">
        <label htmlFor="signup-email">이메일</label>
        <input id="signup-email" type="email" {...register('email')} />
        {errors.email && <span className="signup-form__error">{errors.email.message}</span>}
      </div>

      <div className="signup-form__field">
        <label htmlFor="signup-password">비밀번호</label>
        <input id="signup-password" type="password" {...register('password')} />
        {errors.password && <span className="signup-form__error">{errors.password.message}</span>}
      </div>

      <div className="signup-form__field">
        <label htmlFor="signup-confirm">비밀번호 확인</label>
        <input id="signup-confirm" type="password" {...register('confirmPassword')} />
        {errors.confirmPassword && <span className="signup-form__error">{errors.confirmPassword.message}</span>}
      </div>

      {serverError && <p className="signup-form__error">{serverError}</p>}

      <button className="signup-form__submit" type="submit" disabled={isLoading}>
        {isLoading ? '가입 중...' : '회원가입'}
      </button>
    </form>
  );
}
