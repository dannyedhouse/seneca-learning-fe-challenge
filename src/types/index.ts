export interface AnswerOption {
  id: number;
  choices: string[];
  correctIndex: number;
}

export interface Question {
  id: number;
  question: string;
  options: AnswerOption[];
}

export interface QuestionData {
  questions: Question[];
}
