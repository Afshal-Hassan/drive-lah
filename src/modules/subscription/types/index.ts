import { ReactNode } from "react";

export enum PlanType {
  JUST_MATES = "JUST_MATES",
  GOOD_MATES = "GOOD_MATES",
  BEST_MATES = "BEST_MATES",
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  selected: boolean;
  comingSoon?: boolean;
}

export interface SubscriptionState {
  selectedPlan: PlanType | null;
  addOns: {
    gps: boolean;
    insurance: boolean;
  };
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export interface PlanDetails {
  id: PlanType;
  title: string;
  price: string;
  priceLabel?: string;
  features: {
    icon: ReactNode;
    text: string;
  }[];
}
