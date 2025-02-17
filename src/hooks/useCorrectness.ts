import { useMemo } from "react";
import { AnswerOption, SelectedAnswers } from "../types";

export const useCorrectness = (
  selectedAnswers: SelectedAnswers,
  options: AnswerOption[]
) => {
  return useMemo(() => {
    if (options.length === 0) {
      return { percentage: 0, allCorrect: false };
    }

    const totalQuestions = options.length;
    let correctAnswers = 0;

    options.forEach((answerOption) => {
      const selectedChoice = selectedAnswers[answerOption.id];
      if (selectedChoice?.isCorrect) {
        correctAnswers++;
      }
    });

    const percentage = correctAnswers / totalQuestions;
    const allCorrect = correctAnswers === totalQuestions;

    return { percentage, allCorrect };
  }, [selectedAnswers, options]);
};
