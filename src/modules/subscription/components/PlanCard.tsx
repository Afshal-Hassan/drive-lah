import { memo } from "react";
import { PlanType, PlanDetails } from "@/subscription/types";

interface PlanCardProps {
  plan: PlanDetails;
  isSelected: boolean;
  onSelect: (id: PlanType) => void;
}

function PlanCard({ plan, onSelect, isSelected }: PlanCardProps) {
  return (
    <div
      onClick={() => onSelect(plan.id)}
      className={`plan-card ${isSelected ? "plan-card--selected" : ""}`}
      aria-pressed={isSelected}
    >
      <div className="plan-card__header">
        <h3 className="plan-card__title">{plan.title}</h3>
        <ul className="plan-card__features">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="plan-card__feature">
              {feature.icon}
              <span className="plan-card__feature-text">{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="plan-card__price">
        <span className="plan-card__price-amount">{plan.price}</span>
        {plan.priceLabel && (
          <span className="plan-card__price-label">{plan.priceLabel}</span>
        )}
      </div>
    </div>
  );
}

export default memo(PlanCard);
