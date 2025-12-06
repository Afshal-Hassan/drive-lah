import { PlanType } from "@/subscription/types";
import { ChangeEvent, useCallback } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useClickOutside,
} from "@/shared/hooks";
import {
  resetSubscription,
  selectPlan,
  toggleAddon,
  updateCardField,
} from "@/subscription/slices";

export default function useSubscription() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.subscription);

  const panelRef = useClickOutside(() => {
    dispatch(resetSubscription());
  });

  const handlePlanSelect = useCallback(
    (planId: PlanType) => {
      dispatch(selectPlan(planId));
    },
    [dispatch],
  );

  const handleToggleAddon = useCallback(
    (addonKey: keyof typeof state.addOns) => {
      dispatch(toggleAddon(addonKey));
    },
    [dispatch],
  );

  const handleCardInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      dispatch(
        updateCardField({
          field: name as "cardNumber" | "expiry" | "cvc",
          value,
        }),
      );
    },
    [dispatch],
  );

  const hasPlanSelected = state.selectedPlan !== null;
  const showCardDetails =
    state.selectedPlan !== null && state.selectedPlan !== PlanType.JUST_MATES;

  return {
    panelRef,
    state,
    handleCardInput,
    hasPlanSelected,
    showCardDetails,
    handlePlanSelect,
    handleToggleAddon,
  };
}
