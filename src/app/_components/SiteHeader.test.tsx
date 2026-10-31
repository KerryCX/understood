import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SiteHeader from "./SiteHeader";

const pathnameMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  usePathname: pathnameMock,
}));

const renderAt = (pathname: string) => {
  pathnameMock.mockReturnValue(pathname);
  render(<SiteHeader />);
};

describe("SiteHeader", () => {
  beforeEach(() => {
    pathnameMock.mockReset();
  });

  it("has a skip link to the main content", () => {
    renderAt("/");
    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toHaveAttribute("href", "#main-content");
  });

  it("shows only the home crumb on the home page, marked as current", () => {
    renderAt("/");
    const crumbs = within(screen.getByRole("navigation", { name: "Breadcrumb" }));
    expect(crumbs.getAllByRole("listitem")).toHaveLength(1);
    expect(crumbs.getByText("Understood")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("builds a breadcrumb trail with titles from routeTitles", () => {
    renderAt("/problems/two-sum");
    const crumbs = within(screen.getByRole("navigation", { name: "Breadcrumb" }));
    expect(crumbs.getByRole("link", { name: "Understood" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(crumbs.getByRole("link", { name: "Problems" })).toHaveAttribute(
      "href",
      "/problems",
    );
    expect(crumbs.getByText("Two Sum")).toHaveAttribute("aria-current", "page");
  });

  it("falls back to a title made from the URL for unknown pages", () => {
    renderAt("/concepts/linked-lists");
    const crumbs = within(screen.getByRole("navigation", { name: "Breadcrumb" }));
    expect(crumbs.getByText("Linked lists")).toBeInTheDocument();
  });

  it("marks the section as current on its own page and pages inside it", () => {
    renderAt("/concepts/binary");
    const main = within(screen.getByRole("navigation", { name: "Main" }));
    expect(main.getByRole("link", { name: "Concepts" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(main.getByRole("link", { name: "Problems" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("marks no section as current on the home page", () => {
    renderAt("/");
    const main = within(screen.getByRole("navigation", { name: "Main" }));
    expect(main.getByRole("link", { name: "Concepts" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(main.getByRole("link", { name: "Problems" })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
