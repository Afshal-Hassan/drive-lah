import { memo } from "react";
import { PlanType, SubscriptionState } from "@/subscription/types";

interface AddOnsSectionProps {
  hasPlanSelected: boolean;
  selectedPlan: PlanType | null;
  addOns: SubscriptionState["addOns"];
  toggleAddon: (key: keyof SubscriptionState["addOns"]) => void;
}

function AddOnsSection({
  hasPlanSelected,
  selectedPlan,
  addOns,
  toggleAddon,
}: AddOnsSectionProps) {
  const isJustMates = selectedPlan === PlanType.JUST_MATES;
  const isGoodMates = selectedPlan === PlanType.GOOD_MATES;

  return (
    <div
      role="group"
      aria-labelledby="addons-section"
      className={`subscription-panel__collapsible ${
        hasPlanSelected ? "subscription-panel__collapsible--open" : ""
      }`}
      style={{ paddingTop: "1.5rem" }}
    >
      <div className="subscription-panel__collapsible-content">
        <div className="subscription-panel__section">
          <h2 className="subscription-panel__section-title">
            Select add-ons for your subscription
          </h2>

          <div className="subscription-panel__addons">
            {/* GPS Add-on */}
            <div
              aria-checked={addOns.gps}
              onClick={() => toggleAddon("gps")}
              className={`addon-card ${addOns.gps ? "addon-card--selected" : ""}`}
            >
              <span className="addon-card__label">
                BYO secondary GPS - $5/month
              </span>
              <div className="addon-card__checkbox" aria-hidden="true">
                {addOns.gps && (
                  <svg
                    className="addon-card__checkmark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Insurance / Lockbox Add-on */}
            {!isJustMates && (
              <div
                key={isGoodMates ? "good-addon" : "best-addon"}
                onClick={() => toggleAddon("insurance")}
                className={`addon-card ${addOns.insurance ? "addon-card--selected" : ""} ${
                  isGoodMates ? "addon-card--slide-in" : "addon-card--fade-in"
                }`}
              >
                {isGoodMates ? (
                  <span className="addon-card__label">
                    BYO lockbox - $10/month
                  </span>
                ) : (
                  <>
                    <div className="addon-card__badge">Coming soon</div>
                    <span className="addon-card__label">
                      Between trip insurance
                    </span>
                  </>
                )}

                <div className="addon-card__checkbox">
                  {addOns.insurance && (
                    <svg
                      className="addon-card__checkmark"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AddOnsSection);
