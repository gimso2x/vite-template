import { Link } from '@tanstack/react-router';
import './not-found.scss';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__code">404</h1>
      <p className="not-found__message">페이지를 찾을 수 없습니다</p>
      <Link to="/" className="not-found__link">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
