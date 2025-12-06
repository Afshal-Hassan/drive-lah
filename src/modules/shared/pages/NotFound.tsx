export default function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found__icon-wrapper">
        <div className="not-found__icon-circle">
          <i className="fas fa-map-marked-alt not-found__icon-main"></i>
        </div>
        <div className="not-found__icon-badge">
          <i className="fas fa-question not-found__icon-question"></i>
        </div>
      </div>

      <h1 className="not-found__code">404</h1>
      <h2 className="not-found__title">You've gone off-road!</h2>
      <p className="not-found__description">
        The page you are looking for seems to have taken a wrong turn or doesn't
        exist anymore. Let's get you back on track.
      </p>

      <div className="not-found__footer"></div>
    </div>
  );
}
