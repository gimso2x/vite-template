import './loading-spinner.scss';

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__circle" />
      <span className="loading-spinner__text">로딩 중...</span>
    </div>
  );
}
