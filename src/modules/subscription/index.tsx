import { useSubscription } from "@/subscription/hooks";
import { PlanType, PlanDetails } from "@/subscription/types";
import {
  PlanSection,
  InfoSection,
  AddOnsSection,
  CardDetailsSection,
} from "@/subscription/sections";
import { GPS, Key, Lock } from "@/shared/components";

const PLANS: PlanDetails[] = [
  {
    id: PlanType.JUST_MATES,
    title: "Just mates",
    price: "Free",
    features: [
      { icon: <GPS />, text: "Bring your own GPS" },
      { icon: <Key />, text: "Mileage reporting to be done by you" },
      { icon: <Lock />, text: "In-person key handover to guests" },
    ],
  },
  {
    id: PlanType.GOOD_MATES,
    title: "Good mates",
    price: "$10",
    priceLabel: "/month",
    features: [
      { icon: <GPS />, text: "Primary GPS included" },
      { icon: <Key />, text: "Automated mileage calculations" },
      { icon: <Lock />, text: "In-person key handover to guests" },
    ],
  },
  {
    id: PlanType.BEST_MATES,
    title: "Best mates",
    price: "$30",
    priceLabel: "/month",
    features: [
      { icon: <GPS />, text: "Keyless access technology" },
      { icon: <Key />, text: "Automated mileage calculations" },
      { icon: <Lock />, text: "Remote handover to guests" },
    ],
  },
];

export default function Subscription() {
  const {
    panelRef,
    state,
    handleCardInput,
    hasPlanSelected,
    showCardDetails,
    handlePlanSelect,
    handleToggleAddon,
  } = useSubscription();

  return (
    <div className="subscription-panel" ref={panelRef}>
      <div className="subscription-panel__header">
        <h1 className="subscription-panel__title">Subscription plan</h1>
        <p className="subscription-panel__subtitle">
          Select the ideal subscription plan for your listing.
        </p>
      </div>

      <PlanSection
        plans={PLANS}
        onSelect={handlePlanSelect}
        selectedPlan={state.selectedPlan}
      />

      <AddOnsSection
        addOns={state.addOns}
        toggleAddon={handleToggleAddon}
        hasPlanSelected={hasPlanSelected}
        selectedPlan={state.selectedPlan}
      />

      <CardDetailsSection
        state={state}
        show={showCardDetails}
        handleCardInput={handleCardInput}
      />

      <InfoSection />
    </div>
  );
}
