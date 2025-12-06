import { ChangeEvent, memo } from "react";
import { SubscriptionState } from "@/subscription/types";

interface CardDetailsSectionProps {
  show: boolean;
  state: SubscriptionState;
  handleCardInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

function CardDetailsSection({
  show,
  state,
  handleCardInput,
}: CardDetailsSectionProps) {
  return (
    <div
      className={`subscription-panel__collapsible ${
        show ? "subscription-panel__collapsible--open" : ""
      }`}
      style={{ paddingTop: "1.5rem" }}
    >
      <div className="subscription-panel__collapsible-content">
        <div className="subscription-panel__section">
          <h2 className="subscription-panel__section-title">
            Add card details
          </h2>

          <div className="card-input">
            <svg
              className="card-input__icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>

            <label htmlFor="cardNumber" className="visually-hidden">
              Card number
            </label>
            <input
              type="text"
              maxLength={19}
              id="cardNumber"
              name="cardNumber"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 5678 1234 5678"
              value={state.cardNumber}
              onChange={handleCardInput}
              className="card-input__field card-input__field--number"
            />

            <label htmlFor="expiry" className="visually-hidden">
              Expiry date
            </label>
            <input
              id="expiry"
              type="text"
              name="expiry"
              maxLength={5}
              inputMode="numeric"
              placeholder="MM/YY"
              autoComplete="cc-exp"
              value={state.expiry}
              onChange={handleCardInput}
              className="card-input__field card-input__field--expiry"
            />

            <label htmlFor="cvc" className="visually-hidden">
              CVC code
            </label>
            <input
              id="cvc"
              type="text"
              name="cvc"
              maxLength={4}
              placeholder="CVC"
              value={state.cvc}
              inputMode="numeric"
              autoComplete="cc-csc"
              onChange={handleCardInput}
              aria-label="Card security code"
              className="card-input__field card-input__field--cvc"
            />
          </div>

          <p className="card-input__disclaimer">
            You will not be charged right now. Subscription will only start once
            your listing is published and live.
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(CardDetailsSection);
