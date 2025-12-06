import { memo } from "react";

function InfoSection() {
  return (
    <div className="subscription-panel__info">
      <p className="subscription-panel__info-text">
        Learn more about the plans here –{" "}
        <a href="#" className="subscription-panel__link">
          What is the right plan for me?
        </a>
      </p>

      <p className="subscription-panel__info-text">
        You will be able to switch between plans easily later as well. Speak to
        our host success team if you need any clarifications.
      </p>
    </div>
  );
}

export default memo(InfoSection);
