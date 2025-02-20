// Mock data for testing

import { Question } from "../types";

export const mockQuestions: Question[] = [
  {
    id: 1,
    question: "An animal cell contains:",
    answerOptions: [
      {
        id: 101,
        choices: [
          { id: 1, text: "Cell wall", isCorrect: false },
          { id: 2, text: "Ribosomes", isCorrect: true },
        ],
      },
      {
        id: 102,
        choices: [
          { id: 3, text: "Cytoplasm", isCorrect: true },
          { id: 4, text: "Chloroplast", isCorrect: false },
        ],
      },
      {
        id: 103,
        choices: [
          {
            id: 5,
            text: "Partially permeable membrane",
            isCorrect: true,
          },
          { id: 6, text: "Impermeable membrane", isCorrect: false },
        ],
      },
      {
        id: 104,
        choices: [
          { id: 7, text: "Cellulose", isCorrect: false },
          { id: 8, text: "Mitochondria", isCorrect: true },
        ],
      },
    ],
  },
  {
    id: 2,
    question: "Which are the best sports people & teams?",
    answerOptions: [
      {
        id: 201,
        choices: [
          { id: 9, text: "Liverpool", isCorrect: true },
          { id: 10, text: "Chelsea", isCorrect: false },
          { id: 11, text: "Man Utd", isCorrect: false },
        ],
      },
      {
        id: 202,
        choices: [
          { id: 12, text: "Serena Williams", isCorrect: true },
          { id: 13, text: "Naomi Osaka", isCorrect: false },
        ],
      },
    ],
  },
  {
    id: 3,
    question: "What are the ideal conditions inside an office?",
    answerOptions: [
      {
        id: 301,
        choices: [
          { id: 14, text: "Good pay", isCorrect: true },
          { id: 15, text: "Bad pay", isCorrect: false },
        ],
      },
      {
        id: 302,
        choices: [
          { id: 16, text: "Lot of meetings", isCorrect: false },
          { id: 17, text: "Less meetings", isCorrect: true },
        ],
      },
      {
        id: 303,
        choices: [
          { id: 18, text: "Bear in office", isCorrect: false },
          { id: 19, text: "Dog in office", isCorrect: true },
        ],
      },
    ],
  },
];

export const mockOptions = mockQuestions[0]!.answerOptions;
