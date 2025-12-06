import { memo } from "react";

interface ToggleProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <div className="toggle">
      {label && <span className="toggle__label">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`toggle__button ${checked ? "toggle__button--checked" : ""}`}
      >
        <span
          aria-hidden="true"
          className={`toggle__slider ${checked ? "toggle__slider--checked" : ""}`}
        />
      </button>
    </div>
  );
}

export default memo(Toggle);
