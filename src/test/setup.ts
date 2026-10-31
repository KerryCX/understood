import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Vitest does not expose globals by default, so Testing Library cannot
// register its own cleanup. Unmount after each test so renders don't pile up.
afterEach(() => {
  cleanup();
});
