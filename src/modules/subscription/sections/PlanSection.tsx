import List from "@/shared/components/List";
import { PlanCard } from "@/subscription/components";
import { PlanDetails, PlanType } from "@/subscription/types";
import { memo } from "react";

interface PlanProps {
  plans: PlanDetails[];
  selectedPlan: PlanType | null;
  onSelect: (id: PlanType) => void;
}

function PlanSection({ plans, selectedPlan, onSelect }: PlanProps) {
  return (
    <div
      className="subscription-panel__section"
      aria-labelledby="plan-section-title"
      style={{ paddingBottom: "3rem" }}
    >
      <h2 className="subscription-panel__section-title">Select your plan</h2>

      <div className="subscription-panel__plans" role="radiogroup">
        <List
          items={plans}
          renderItem={(plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlan === plan.id}
              onSelect={onSelect}
            />
          )}
        />
      </div>
    </div>
  );
}

export default memo(PlanSection);
