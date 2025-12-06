import { FallbackProps } from "react-error-boundary";

export default function ErrorPage({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const handleGoHome = () => {
    resetErrorBoundary();
    window.location.href = "/";
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="error-page">
      <div className="error-page__content">
        <div className="error-page__icon-wrapper">
          <div className="error-page__icon-circle">
            <i className="fas fa-exclamation-triangle error-page__icon-main"></i>
          </div>
        </div>

        <h1 className="error-page__title">Oops! Something went wrong</h1>
        <p className="error-page__description">
          We're sorry, but something unexpected happened. Our team has been
          notified and is working on it.
        </p>

        {import.meta.env.DEV && error && (
          <details className="error-page__details">
            <summary>Error Details (Development Only)</summary>
            <pre className="error-page__stack">
              <strong>Error:</strong> {error.message}
              {"\n\n"}
              <strong>Stack Trace:</strong>
              {"\n"}
              {error.stack}
            </pre>
          </details>
        )}

        <div className="error-page__actions">
          <button
            onClick={handleGoHome}
            className="error-page__button error-page__button--primary"
          >
            <i className="fas fa-home"></i> Return to Home
          </button>
          <button
            onClick={handleReload}
            className="error-page__button error-page__button--secondary"
          >
            <i className="fas fa-redo"></i> Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
