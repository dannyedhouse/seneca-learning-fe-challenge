import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OptionsContainer } from "./OptionsContainer";
import { mockOptions } from "../../__mocks__/mockData";

describe("OptionsContainer", () => {
  const defaultProps = {
    activeTextColor: "#F6B868",
    options: mockOptions,
    selectedChoices: {},
    onChange: vi.fn(),
    allCorrect: false,
  };

  it("renders all option switches", () => {
    render(<OptionsContainer {...defaultProps} />);

    expect(screen.getByText("Cell wall")).toBeInTheDocument();
    expect(screen.getByText("Ribosomes")).toBeInTheDocument();
    expect(screen.getByText("Cytoplasm")).toBeInTheDocument();
    expect(screen.getByText("Chloroplast")).toBeInTheDocument();
  });

  it("calculates max width based on longest choice text", () => {
    render(<OptionsContainer {...defaultProps} />);

    const optionSwitches = screen.getAllByTestId("option-switch");
    const firstSwitch = optionSwitches[0];

    // Partially permeable membrane (longest string in mock data) is 28 characters, so 28 * 35 + 40 = 1020
    expect(firstSwitch).toHaveStyle({ maxWidth: "1020px" });
  });

  it("calls onChange with correct parameters when option is selected", () => {
    render(<OptionsContainer {...defaultProps} />);

    fireEvent.click(screen.getByText("Cell wall"));

    expect(defaultProps.onChange).toHaveBeenCalledWith(
      mockOptions[0]!.id,
      mockOptions[0]!.choices[0]
    );
  });
});
