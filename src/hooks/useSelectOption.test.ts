import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useSelectOptions } from "./useSelectOption";
import { mockQuestions } from "../__mocks__/mockData";

describe("useSelectOptions", () => {
  const mockQuestion = mockQuestions[0];

  it("should initialize with randomized options and incorrect choices", () => {
    const { result } = renderHook(() => useSelectOptions(mockQuestion));

    expect(result.current.randomisedOptions).toHaveLength(4);
    expect(Object.keys(result.current.selectedChoices)).toHaveLength(4);

    Object.values(result.current.selectedChoices).forEach((choice) => {
      expect(choice.isCorrect).toBe(false);
    });
  });

  it("should handle undefined question", () => {
    const { result } = renderHook(() => useSelectOptions(undefined));

    expect(result.current.randomisedOptions).toHaveLength(0);
    expect(Object.keys(result.current.selectedChoices)).toHaveLength(0);
  });
});
