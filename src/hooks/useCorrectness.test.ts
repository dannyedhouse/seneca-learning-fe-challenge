import { renderHook } from "@testing-library/react";
import { useCorrectness } from "../hooks/useCorrectness";
import { AnswerOption } from "../types";
import { describe, expect, test } from "vitest";

describe("useCorrectness hook", () => {
  const mockOptions: AnswerOption[] = [
    {
      id: 1,
      choices: ["Cell wall", "Ribosomes", "Chloroplast"],
      correctIndex: 0,
    },
    {
      id: 2,
      choices: ["Partially permeable membrane", "Impermeable membrane"],
      correctIndex: 1,
    },
    { id: 3, choices: ["Cellulose", "Mitochondria"], correctIndex: 1 },
  ];

  test("returns 0% correctness when no options are selected", () => {
    const { result } = renderHook(() => useCorrectness([], mockOptions));
    expect(result.current.percentage).toBe(0);
    expect(result.current.allCorrect).toBe(false);
  });

  test("returns 0% correctness when all answers are incorrect", () => {
    const selectedOptions = [1, 0, 0];
    const { result } = renderHook(() =>
      useCorrectness(selectedOptions, mockOptions)
    );

    expect(result.current.percentage).toBe(0);
    expect(result.current.allCorrect).toBe(false);
  });

  test("returns 100% correctness when all answers are correct", () => {
    const selectedOptions = [0, 1, 1];
    const { result } = renderHook(() =>
      useCorrectness(selectedOptions, mockOptions)
    );

    expect(result.current.percentage).toBe(1);
    expect(result.current.allCorrect).toBe(true);
  });

  test("returns partial correctness when some answers are incorrect", () => {
    const selectedOptions = [0, 0, 1];
    const { result } = renderHook(() =>
      useCorrectness(selectedOptions, mockOptions)
    );

    expect(result.current.percentage).toBe(2 / 3);
    expect(result.current.allCorrect).toBe(false);
  });
});
