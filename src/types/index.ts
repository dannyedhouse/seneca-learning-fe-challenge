export interface Choice {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface AnswerOption {
  id: number;
  choices: Choice[];
}

export interface Question {
  id: number;
  question: string;
  answerOptions: AnswerOption[];
}

export interface QuestionData {
  questions: Question[];
}

export type SelectedAnswers = Record<number, Choice>;
