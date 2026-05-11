import './header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        Template
      </div>
      <nav className="header__nav">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          Docs
        </a>
        <a href="https://github.com" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>
    </header>
  );
}

export default Header;
