import { Link } from '@tanstack/react-router';
import { useAuth } from '@/features/auth/hooks/use-auth';
import './header.scss';

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        Template
      </Link>
      <nav className="header__nav">
        <Link to="/">홈</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span className="header__user">{user?.name}</span>
            <button className="header__logout" onClick={logout}>
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
