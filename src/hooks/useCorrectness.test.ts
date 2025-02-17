import { renderHook } from "@testing-library/react";
import { useCorrectness } from "../hooks/useCorrectness";
import { AnswerOption, SelectedAnswers } from "../types";
import { describe, expect, test } from "vitest";

describe("useCorrectness hook", () => {
  const mockOptions: AnswerOption[] = [
    {
      id: 1,
      choices: [
        { id: 1, text: "Cell wall", isCorrect: true },
        { id: 2, text: "Ribosomes", isCorrect: false },
        { id: 3, text: "Chloroplast", isCorrect: false },
      ],
    },
    {
      id: 2,
      choices: [
        { id: 4, text: "Partially permeable membrane", isCorrect: false },
        { id: 5, text: "Impermeable membrane", isCorrect: true },
      ],
    },
    {
      id: 3,
      choices: [
        { id: 6, text: "Cellulose", isCorrect: false },
        { id: 7, text: "Mitochondria", isCorrect: true },
      ],
    },
  ];

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
      1: { id: 2, text: "Ribosomes", isCorrect: false },
      2: { id: 4, text: "Partially permeable membrane", isCorrect: false },
      3: { id: 6, text: "Cellulose", isCorrect: false },
    };

    const { result } = renderHook(() =>
      useCorrectness(selectedAnswers, mockOptions)
    );

    expect(result.current.percentage).toBe(0);
    expect(result.current.allCorrect).toBe(false);
  });

  test("returns 100% correctness when all answers are correct", () => {
    const selectedAnswers: SelectedAnswers = {
      1: { id: 1, text: "Cell wall", isCorrect: true },
      2: { id: 5, text: "Impermeable membrane", isCorrect: true },
      3: { id: 7, text: "Mitochondria", isCorrect: true },
    };

    const { result } = renderHook(() =>
      useCorrectness(selectedAnswers, mockOptions)
    );

    expect(result.current.percentage).toBe(1);
    expect(result.current.allCorrect).toBe(true);
  });

  test("returns partial correctness when some answers are incorrect", () => {
    const selectedAnswers: SelectedAnswers = {
      1: { id: 1, text: "Cell wall", isCorrect: true },
      2: { id: 4, text: "Partially permeable membrane", isCorrect: false },
      3: { id: 7, text: "Mitochondria", isCorrect: true },
    };

    const { result } = renderHook(() =>
      useCorrectness(selectedAnswers, mockOptions)
    );

    expect(result.current.percentage).toBe(2 / 3);
    expect(result.current.allCorrect).toBe(false);
  });
});
