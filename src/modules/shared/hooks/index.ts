import type { RootState, AppDispatch } from "@/shared/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export { default as useClickOutside } from "./useClickOutside";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
