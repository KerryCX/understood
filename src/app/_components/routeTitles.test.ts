import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { routeTitles, titleFromSlug } from "./routeTitles";

const appDir = path.resolve(__dirname, "..");

// Finds every folder under src/app that contains a page.tsx and turns it
// into a URL path, so the test notices when a new page has no title.
const findPagePaths = (dir: string, urlPath = ""): string[] =>
  readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (!statSync(full).isDirectory() || name.startsWith("_")) return [];
    const nextPath = `${urlPath}/${name}`;
    const own = existsSync(path.join(full, "page.tsx")) ? [nextPath] : [];
    return [...own, ...findPagePaths(full, nextPath)];
  });

describe("titleFromSlug", () => {
  it("turns hyphens into spaces and capitalises the first letter", () => {
    expect(titleFromSlug("top-k-frequent-elements")).toBe(
      "Top k frequent elements",
    );
  });

  it("handles a single word", () => {
    expect(titleFromSlug("binary")).toBe("Binary");
  });

  it("handles an empty string", () => {
    expect(titleFromSlug("")).toBe("");
  });
});

describe("routeTitles", () => {
  it("has a title for every page in the app", () => {
    const missing = findPagePaths(appDir).filter((p) => !routeTitles[p]);
    expect(missing).toEqual([]);
  });

  it("has no titles for pages that no longer exist", () => {
    const pages = findPagePaths(appDir);
    const stale = Object.keys(routeTitles).filter((p) => !pages.includes(p));
    expect(stale).toEqual([]);
  });
});
