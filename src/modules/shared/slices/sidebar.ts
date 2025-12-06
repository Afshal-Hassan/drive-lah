import { createSlice } from "@reduxjs/toolkit";

export type StepStatus = "completed" | "active" | "disabled";

export interface Step {
  id: string;
  label: string;
  status: StepStatus;
}

const INITIAL_STEPS: Step[] = [
  { id: "location", label: "Location", status: "completed" },
  { id: "about", label: "About", status: "completed" },
  { id: "features", label: "Features", status: "completed" },
  { id: "rules", label: "Rules", status: "completed" },
  { id: "pricing", label: "Pricing", status: "completed" },
  { id: "promotion", label: "Promotion", status: "completed" },
  { id: "pictures", label: "Pictures", status: "completed" },
  { id: "insurance", label: "Insurance", status: "completed" },
  { id: "subscription", label: "Subscription", status: "active" },
  { id: "device", label: "Device", status: "disabled" },
  { id: "easy-access", label: "Easy Access", status: "disabled" },
];

interface SidebarState {
  steps: Step[];
  currentStepIndex: number;
}

const initialState: SidebarState = {
  steps: INITIAL_STEPS,
  currentStepIndex: INITIAL_STEPS.findIndex((step) => step.status === "active"),
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    nextStep: (state) => {
      const currentIndex = state.currentStepIndex;

      if (currentIndex < state.steps.length - 1) {
        state.steps[currentIndex].status = "completed";

        state.currentStepIndex = currentIndex + 1;
        state.steps[currentIndex + 1].status = "active";
      }
    },

    previousStep: (state) => {
      const currentIndex = state.currentStepIndex;

      if (currentIndex > 0) {
        state.steps[currentIndex].status = "disabled";

        state.currentStepIndex = currentIndex - 1;
        state.steps[currentIndex - 1].status = "active";
      }
    },
    resetNavigation: () => initialState,
  },
});

export const { nextStep, previousStep, resetNavigation } = sidebarSlice.actions;

export default sidebarSlice.reducer;
