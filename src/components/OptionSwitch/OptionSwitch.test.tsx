import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { OptionSwitch } from "./OptionSwitch";
import { mockOptions } from "../../__mocks__/mockData";

describe("OptionSwitch", () => {
  const defaultProps = {
    activeTextColor: "#F6B868",
    choices: mockOptions[0]!.choices,
    selectedChoice: undefined,
    onToggle: vi.fn(),
    allCorrect: false,
    maxWidth: 300,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all choices", () => {
    render(<OptionSwitch {...defaultProps} />);

    defaultProps.choices.forEach((choice) => {
      expect(screen.getByText(choice.text)).toBeInTheDocument();
    });
  });

  it("calls onToggle when a choice is clicked", () => {
    render(<OptionSwitch {...defaultProps} />);

    const firstChoice = screen.getByText(defaultProps.choices[0]!.text);
    fireEvent.click(firstChoice);

    expect(defaultProps.onToggle).toHaveBeenCalledWith(defaultProps.choices[0]);
  });

  it("disables buttons when allCorrect is true", () => {
    render(<OptionSwitch {...defaultProps} allCorrect={true} />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
