import { useEffect, useRef, RefObject } from "react";

export default function useClickOutside<T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
): RefObject<T> {
  const ref = useRef<T>(null!);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    const isInsideRef = ref.current?.contains(target);
    const isIgnored =
      target.classList.contains("sticky-footer__button") ||
      target.closest("sticky-footer__button");

    if (!isInsideRef && !isIgnored) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
}
