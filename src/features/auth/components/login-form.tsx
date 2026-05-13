import { useForm } from 'react-hook-form';
import { useAuthActions } from '../context/auth-provider';
import { useAuthSubmit } from '../hooks/use-auth-submit';
import { useAuthStore } from '@/store';
import { loginSchema, type LoginFormData } from '../schemas';
import { setValidationErrors } from '../validate-form';
import './login-form.scss';

export default function LoginForm() {
  const { login } = useAuthActions();
  const isLoading = useAuthStore((s) => s.isLoading);
  const { serverError, submit } = useAuthSubmit();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      setValidationErrors(result, setError);
      return;
    }
    await submit(() => login(result.data));
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
