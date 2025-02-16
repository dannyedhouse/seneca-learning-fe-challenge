import { useMemo } from "react";
import { AnswerOption } from "../types";

export const useCorrectness = (
  selectedOptions: number[],
  options: AnswerOption[]
) => {
  return useMemo(() => {
    if (selectedOptions.length === 0 || options.length === 0) {
      return { percentage: 0, allCorrect: false };
    }

    const totalOptions = options.length;
    const correctAnswers = options.reduce((count, opt, index) => {
      return count + (selectedOptions[index] === opt.correctIndex ? 1 : 0);
    }, 0);

    const percentage = correctAnswers / totalOptions;
    const allCorrect = correctAnswers === totalOptions;

    return { percentage, allCorrect };
  }, [selectedOptions, options]);
};
