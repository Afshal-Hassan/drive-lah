import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlanType, SubscriptionState } from "@/subscription/types";

const INITIAL_STATE: SubscriptionState = {
  selectedPlan: null,
  addOns: {
    gps: false,
    insurance: false,
  },
  cardNumber: "",
  expiry: "",
  cvc: "",
};

type CardField = keyof Pick<SubscriptionState, "cardNumber" | "expiry" | "cvc">;

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: INITIAL_STATE,
  reducers: {
    selectPlan: (state, action: PayloadAction<PlanType>) => {
      state.selectedPlan = action.payload;
    },

    toggleAddon: (
      state,
      action: PayloadAction<keyof SubscriptionState["addOns"]>,
    ) => {
      state.addOns[action.payload] = !state.addOns[action.payload];
    },

    updateCardField: (
      state,
      action: PayloadAction<{ field: CardField; value: string }>,
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    resetSubscription: () => {
      return INITIAL_STATE;
    },
  },
});

export const { selectPlan, toggleAddon, updateCardField, resetSubscription } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;
