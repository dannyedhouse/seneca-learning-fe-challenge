import { renderHook } from "@testing-library/react";
import { useCorrectness } from "../hooks/useCorrectness";
import { SelectedAnswers } from "../types";
import { describe, expect, test } from "vitest";
import { mockOptions } from "../__mocks__/mockData";

describe("useCorrectness hook", () => {
  test("returns 0% correctness when no options are selected", () => {
    const selectedAnswers: SelectedAnswers = {};
    const { result } = renderHook(() =>
      useCorrectness(selectedAnswers, mockOptions)
    );

    expect(result.current.percentage).toBe(0);
    expect(result.current.allCorrect).toBe(false);
  });

  test("returns 0% correctness when all answers are incorrect", () => {
    const selectedAnswers: SelectedAnswers = {
      101: { id: 1, text: "Cell wall", isCorrect: false },
      102: { id: 4, text: "Chloroplast", isCorrect: false },
      103: { id: 6, text: "Impermeable membrane", isCorrect: false },
      104: { id: 7, text: "Cellulose", isCorrect: false },
    };

    const { result } = renderHook(() =>
      useCorrectness(selectedAnswers, mockOptions)
    );

    expect(result.current.percentage).toBe(0);
    expect(result.current.allCorrect).toBe(false);
  });

  test("returns 100% correctness when all answers are correct", () => {
    const selectedAnswers: SelectedAnswers = {
      101: { id: 2, text: "Cell wall", isCorrect: true },
      102: { id: 3, text: "Cytoplasm", isCorrect: true },
      103: { id: 5, text: "Partially permeable membrane", isCorrect: true },
      104: { id: 8, text: "Mitochondria", isCorrect: true },
    };

    const { result } = renderHook(() =>
      useCorrectness(selectedAnswers, mockOptions)
    );

    expect(result.current.percentage).toBe(1);
    expect(result.current.allCorrect).toBe(true);
  });

  test("returns partial correctness when some answers are incorrect", () => {
    const selectedAnswers: SelectedAnswers = {
      101: { id: 2, text: "Cell wall", isCorrect: true },
      102: { id: 4, text: "Partially permeable membrane", isCorrect: false },
      103: { id: 5, text: "Mitochondria", isCorrect: true },
    };

    const { result } = renderHook(() =>
      useCorrectness(selectedAnswers, mockOptions)
    );

    expect(result.current.percentage).toBe(0.5);
    expect(result.current.allCorrect).toBe(false);
  });
});
