import { QuestionData, Question } from "../types";

export const getRandomisedQuestions = (
  data: QuestionData | undefined
): Question[] => {
  if (!data?.questions) return [];

  const shuffleArray = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  return shuffleArray(data.questions);
};
