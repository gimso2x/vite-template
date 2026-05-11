import './feature-cards.scss';

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

function FeatureCards() {
  return (
    <section className="features">
      {FEATURES.map((feature) => (
        <article className="card" key={feature.title}>
          <div className="card__icon">{feature.icon}</div>
          <h2 className="card__title">{feature.title}</h2>
          <p className="card__description">{feature.description}</p>
        </article>
      ))}
    </section>
  );
}

export default FeatureCards;
