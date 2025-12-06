import storage from "redux-persist/lib/storage";
import { PlanType } from "@/subscription/types";
import { ChangeEvent, useCallback } from "react";
import { resetNavigation } from "@/shared/slices/sidebar";
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

  const panelRef = useClickOutside(async () => {
    dispatch(resetSubscription());
    dispatch(resetNavigation());
    await storage.removeItem("persist:sidebar");
    await storage.removeItem("persist:subscription");
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
