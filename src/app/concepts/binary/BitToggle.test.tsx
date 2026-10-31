import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import BitToggle from "./BitToggle";

const binary = () =>
  screen.getByText("Binary").nextElementSibling?.textContent;
const decimal = () =>
  screen.getByText("Decimal").nextElementSibling?.textContent;

describe("BitToggle", () => {
  it("starts at 11 (00001011)", () => {
    render(<BitToggle />);
    expect(binary()).toBe("00001011");
    expect(decimal()).toBe("8 + 2 + 1 = 11");
    expect(screen.getByRole("button", { name: "8 column" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "4 column" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("toggles a column on and off when clicked", async () => {
    const user = userEvent.setup();
    render(<BitToggle />);

    await user.click(screen.getByRole("button", { name: "4 column" }));
    expect(binary()).toBe("00001111");
    expect(decimal()).toBe("8 + 4 + 2 + 1 = 15");

    await user.click(screen.getByRole("button", { name: "4 column" }));
    expect(binary()).toBe("00001011");
  });

  it("adds and subtracts one, carrying across bits", async () => {
    const user = userEvent.setup();
    render(<BitToggle />);

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(binary()).toBe("00000000");
    expect(decimal()).toBe("0");

    for (let i = 0; i < 8; i++) {
      await user.click(screen.getByRole("button", { name: "+1" }));
    }
    expect(binary()).toBe("00001000");

    await user.click(screen.getByRole("button", { name: "−1" }));
    expect(binary()).toBe("00000111");
  });

  it("disables −1 at 0 and +1 at 255", async () => {
    const user = userEvent.setup();
    render(<BitToggle />);

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.getByRole("button", { name: "−1" })).toBeDisabled();

    const input = screen.getByLabelText("Set a number (0 to 255)");
    await user.clear(input);
    await user.type(input, "255");
    expect(binary()).toBe("11111111");
    expect(screen.getByRole("button", { name: "+1" })).toBeDisabled();
  });

  it("updates from the number input", async () => {
    const user = userEvent.setup();
    render(<BitToggle />);

    const input = screen.getByLabelText("Set a number (0 to 255)");
    await user.clear(input);
    await user.type(input, "170");
    expect(binary()).toBe("10101010");
  });

  it("keeps the last valid number when typing goes past 255, and resets the text on blur", async () => {
    const user = userEvent.setup();
    render(<BitToggle />);

    const input = screen.getByLabelText("Set a number (0 to 255)");
    await user.clear(input);
    // 3 and 30 are valid as they are typed; 300 is out of range and ignored.
    await user.type(input, "300");
    expect(input).toHaveValue(300);
    expect(binary()).toBe("00011110");

    await user.tab();
    expect(input).toHaveValue(30);
  });

  it("exposes the bits as a labelled group", () => {
    render(<BitToggle />);
    expect(
      screen.getByRole("group", { name: "The 8 bits of a byte" }),
    ).toBeInTheDocument();
  });
});
