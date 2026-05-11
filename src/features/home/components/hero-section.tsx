import './hero-section.scss';

function HeroSection() {
  return (
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
  );
}

export default HeroSection;
