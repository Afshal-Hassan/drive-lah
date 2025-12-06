import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { toHaveNoViolations } from "jest-axe";
import { cleanup } from "@testing-library/react";

expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
});

globalThis.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver;
