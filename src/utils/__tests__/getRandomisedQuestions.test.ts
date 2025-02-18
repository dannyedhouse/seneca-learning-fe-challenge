import { describe, it, expect, vi } from "vitest";
import { getRandomisedQuestions } from "../getRandomisedQuestions";
import { mockQuestions } from "../../__mocks__/mockData";
import { QuestionData } from "../../types";

describe("getRandomisedQuestions", () => {
  it("returns empty array when data is undefined", () => {
    const result = getRandomisedQuestions(undefined);
    expect(result).toEqual([]);
  });

  it("returns empty array when questions array is empty", () => {
    const questions: QuestionData = { questions: [] };
    const result = getRandomisedQuestions(questions);
    expect(result).toEqual([]);
  });

  it("returns shuffled questions array", () => {
    const mockMath = vi.spyOn(Math, "random");
    mockMath.mockReturnValue(0.5);

    const questions = { questions: mockQuestions };
    const result = getRandomisedQuestions(questions);

    expect(result).toHaveLength(mockQuestions.length);
    expect(result).toEqual(expect.arrayContaining(mockQuestions));
    expect(result).not.toBe(mockQuestions);

    mockMath.mockRestore();
  });
});
