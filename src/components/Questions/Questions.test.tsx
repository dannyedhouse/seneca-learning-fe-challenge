import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { Questions } from "./Questions";
import { mockQuestions } from "../../__mocks__/mockData";
import * as api from "../../api/getQuizQuestions";
import renderWithQueryClient from "../../utils/renderWithQueryClient";
import { QuestionData } from "../../types";

vi.mock("../../utils/getRandomisedQuestions", () => ({
  getRandomisedQuestions: (data: QuestionData) => data.questions,
}));

describe("Questions component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state on first render", () => {
    vi.spyOn(api, "getQuizQuestions").mockImplementationOnce(
      () => new Promise(() => {})
    );

    renderWithQueryClient(<Questions />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays an error message when the api request fails", async () => {
    vi.spyOn(api, "getQuizQuestions").mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    renderWithQueryClient(<Questions />);

    const errorMessage = await screen.findByText(
      "Error loading question data. Please try again later!"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays question and AnswerOptions when data loads successfully", async () => {
    vi.spyOn(api, "getQuizQuestions").mockResolvedValueOnce({
      questions: mockQuestions,
    });

    renderWithQueryClient(<Questions />);

    await screen.findByText(mockQuestions[0]!.question);
    const firstOptionSet = mockQuestions[0]!.answerOptions[0]!.choices;
    await screen.findByText(firstOptionSet[0]!.text);
    await screen.findByText(firstOptionSet[1]!.text);
  });

  it("navigates to the next question when the next button is clicked", async () => {
    vi.spyOn(api, "getQuizQuestions").mockResolvedValueOnce({
      questions: mockQuestions,
    });

    renderWithQueryClient(<Questions />);

    await screen.findByText(mockQuestions[0]!.question);

    const nextButton = screen.getByText("Next Question");
    fireEvent.click(nextButton);

    expect(
      await screen.findByText(mockQuestions[1]!.question)
    ).toBeInTheDocument();
  });

  it("shows the correctfeedback when options are selected", async () => {
    vi.spyOn(api, "getQuizQuestions").mockResolvedValueOnce({
      questions: mockQuestions,
    });

    renderWithQueryClient(<Questions />);

    await screen.findByText(mockQuestions[0]!.question);

    const incorrectOption = screen.getByText("Cell wall");
    fireEvent.click(incorrectOption);
    expect(screen.getByText("The answer is incorrect")).toBeInTheDocument();

    const correctAnswers = [
      "Ribosomes",
      "Cytoplasm",
      "Partially permeable membrane",
      "Mitochondria",
    ];
    correctAnswers.forEach((answer) => {
      const option = screen.getByText(answer);
      fireEvent.click(option);
    });

    expect(screen.getByText("The answer is correct!")).toBeInTheDocument();
  });
});
