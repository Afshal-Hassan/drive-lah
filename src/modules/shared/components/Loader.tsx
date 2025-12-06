export default function Loader() {
  return (
    <div className="page-loader">
      <div className="page-loader__content">
        <div className="page-loader__car">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="page-loader__car-icon"
          >
            <path
              d="M19 13V11C19 11 19 8 16 7C16 7 13.5 4 12 4C10.5 4 8 7 8 7C5 8 5 11 5 11V13M19 13H5M19 13V17H17M5 13V17H7M7 17H17M7 17C7 18.1046 7.89543 19 9 19C10.1046 19 11 18.1046 11 17M17 17C17 18.1046 16.1046 19 15 19C13.8954 19 13 18.1046 13 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 10H20"
              stroke="#fccf3e"
              strokeWidth="2"
              strokeLinecap="round"
              className="page-loader__wind page-loader__wind--1"
            />
            <path
              d="M23 13H21"
              stroke="#fccf3e"
              strokeWidth="2"
              strokeLinecap="round"
              className="page-loader__wind page-loader__wind--2"
            />
            <path
              d="M21 7H20"
              stroke="#fccf3e"
              strokeWidth="2"
              strokeLinecap="round"
              className="page-loader__wind page-loader__wind--3"
            />
          </svg>
        </div>

        <div className="page-loader__road">
          <div className="page-loader__road-animation">
            <div className="page-loader__road-gradient"></div>
            <div className="page-loader__road-gradient"></div>
          </div>
        </div>

        <div className="page-loader__text">
          <h2 className="page-loader__title">Loading your journey...</h2>
          <p className="page-loader__subtitle">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
}
