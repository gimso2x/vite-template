import { useState } from 'react';
import './app.scss';

const FEATURES = [
  {
    icon: '⚡',
    title: 'Vite + React',
    description: 'Lightning-fast HMR과 최적화된 빌드 파이프라인으로 최고의 개발 경험을 제공합니다.',
  },
  {
    icon: '🧭',
    title: 'TanStack Router',
    description: '파일 기반 라우팅과 자동 코드 스플리팅으로 타입 안전한 내비게이션을 구현합니다.',
  },
  {
    icon: '🔄',
    title: 'TanStack Query',
    description: '서버 상태 관리, 캐싱, 동기화를 자동으로 처리하여 데이터 패칭을 단순화합니다.',
  },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      {/* Header */}
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

      {/* Hero */}
      <section className="hero">
        <span className="hero__badge">Vite Template</span>
        <h1 className="hero__title">빠르고 타입 안전한 React 개발 환경</h1>
        <p className="hero__description">Vite, TanStack Router, TanStack Query, SCSS로 구성된 프로덕션 레디 템플릿</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="https://vite.dev" target="_blank" rel="noreferrer">
            시작하기
          </a>
          <a className="btn btn--outline" href="https://github.com" target="_blank" rel="noreferrer">
            소스 보기
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        {FEATURES.map((feature) => (
          <article className="card" key={feature.title}>
            <div className="card__icon">{feature.icon}</div>
            <h2 className="card__title">{feature.title}</h2>
            <p className="card__description">{feature.description}</p>
          </article>
        ))}
      </section>

      {/* Counter demo */}
      <section className="counter-section">
        <p className="counter-section__value">{count}</p>
        <div className="counter-section__controls">
          <button type="button" className="btn btn--outline" onClick={() => setCount((c) => c - 1)}>
            − 감소
          </button>
          <button type="button" className="btn btn--primary" onClick={() => setCount((c) => c + 1)}>
            + 증가
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          Built with&nbsp;
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            Vite
          </a>
          &nbsp;+&nbsp;
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            React
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
