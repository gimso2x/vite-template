import { createFileRoute, Link } from '@tanstack/react-router';
import LoginForm from '@/features/auth/components/login-form';
import SignupForm from '@/features/auth/components/signup-form';
import { useState } from 'react';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      {mode === 'login' ? <LoginForm /> : <SignupForm />}

      <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
        {mode === 'login' ? (
          <>
            계정이 없으신가요?{' '}
            <button
              onClick={() => setMode('signup')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary-500)',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              회원가입
            </button>
          </>
        ) : (
          <>
            이미 계정이 있으신가요?{' '}
            <button
              onClick={() => setMode('login')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary-500)',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              로그인
            </button>
          </>
        )}
      </p>

      <Link to="/" style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
