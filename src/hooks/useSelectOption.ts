import { useEffect, useState } from "react";
import { AnswerOption, Choice, SelectedAnswers, Question } from "../types";

export const useSelectOptions = (question: Question | undefined) => {
  const [randomisedOptions, setRandomisedOptions] = useState<AnswerOption[]>(
    []
  );
  const [selectedChoices, setSelectedChoices] = useState<SelectedAnswers>({});

  useEffect(() => {
    if (!question?.answerOptions) return;

    const shuffledOptions = [...question.answerOptions]
      .sort(() => Math.random() - 0.5)
      .map((option) => ({
        ...option,
        choices: [...option.choices].sort(() => Math.random() - 0.5),
      }));

    setRandomisedOptions(shuffledOptions);

    const initialChoices: SelectedAnswers = {};
    shuffledOptions.forEach((option) => {
      const incorrectChoice = option.choices.find(
        (choice) => !choice.isCorrect
      );
      if (incorrectChoice) {
        initialChoices[option.id] = incorrectChoice;
      }
    });

    setSelectedChoices(initialChoices);
  }, [question]);

  const handleToggleOption = (answerOptionId: number, choice: Choice) => {
    setSelectedChoices((prev) => ({
      ...prev,
      [answerOptionId]: choice,
    }));
  };

  return { randomisedOptions, selectedChoices, handleToggleOption };
};
