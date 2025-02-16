export interface AnswerOptions {
  id: number;
  choices: string[];
  correctIndex: number;
}

export interface Question {
  id: number;
  question: string;
  options: AnswerOptions[];
}

export interface QuestionData {
  questions: Question[];
}
