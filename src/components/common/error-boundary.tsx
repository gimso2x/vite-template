import { Component, type ErrorInfo, type ReactNode } from 'react';
import './error-boundary.scss';

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="error-boundary">
          <div className="error-boundary__icon">!</div>
          <h2 className="error-boundary__title">문제가 발생했습니다</h2>
          <p className="error-boundary__message">{this.state.error?.message}</p>
          <button className="error-boundary__retry" onClick={() => this.setState({ hasError: false, error: null })}>
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
