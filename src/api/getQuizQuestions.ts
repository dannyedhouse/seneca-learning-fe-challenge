import { QuestionData } from "../types";

export const getQuizQuestions = async (): Promise<QuestionData> => {
  try {
    const response = await fetch("/questionData.json");

    if (!response.ok) {
      throw new Error(`Error fetching questions: ${response.statusText}`);
    }

    return await response.json();
  } catch (e) {
    throw new Error("Error fetching questions: " + e);
  }
};
