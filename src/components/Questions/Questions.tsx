import { useQuery } from "@tanstack/react-query";
import { Question, QuestionData } from "../../types";
import { OptionsContainer } from "../OptionsContainer/OptionsContainer";
import { useCorrectness } from "../../hooks/useCorrectness";
import { getGradientStyle } from "../../utils/getGradientStyle";
import { getTextColor } from "../../utils/getTextColour";
import { getQuizQuestions } from "../../api/getQuizQuestions";
import { useState, useEffect } from "react";
import { useSelectOptions } from "../../hooks/useSelectOption";
import { getRandomisedQuestions } from "../../utils/getRandomisedQuestions";

export const Questions = () => {
  const { data, isError, isLoading } = useQuery<QuestionData>({
    queryKey: ["quizQuestions"],
    queryFn: getQuizQuestions,
  });

  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>(
    []
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (data) {
      setRandomizedQuestions(getRandomisedQuestions(data));
    }
  }, [data]);

  const currentQuestion = randomizedQuestions[currentQuestionIndex];
  const { randomisedOptions, selectedChoices, handleToggleOption } =
    useSelectOptions(currentQuestion);

  const { percentage, allCorrect } = useCorrectness(
    selectedChoices,
    randomisedOptions ?? []
  );

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prev) =>
      prev < randomizedQuestions.length - 1 ? prev + 1 : 0
    );
  };

  if (isLoading || isError || !randomizedQuestions.length) {
    return (
      <div className="text-red-700 h-screen flex items-center justify-center text-xl font-bold ">
        {isLoading
          ? "Loading..."
          : isError
          ? "Error loading question data. Please try again later!"
          : "No questions available"}
      </div>
    );
  }

  const gradientStyle = getGradientStyle(percentage);
  const textColor = getTextColor(percentage);

  return (
    <div
      className="py-4 px-4 md:mx-4 md:p-12 md:rounded-xl text-center "
      style={{ background: gradientStyle }}
    >
      <div className="flex flex-col items-center justify-center gap-8 md:gap-10 w-full">
        <h1 className="text-white font-bold text-[20px] sm:text-[40px]">
          {currentQuestion?.question}
        </h1>
        <OptionsContainer
          activeTextColor={textColor}
          options={randomisedOptions}
          selectedChoices={selectedChoices}
          onChange={handleToggleOption}
          allCorrect={allCorrect}
        />
        <h2 className="text-white font-bold text-[16px] sm:text-[32px]">
          The answer is {allCorrect ? "correct!" : "incorrect"}
        </h2>
      </div>

      <button
        onClick={goToNextQuestion}
        className="text-sm m-8 rounded-full px-6 py-4 bg-white/40 hover:bg-white/30 text-white font-semibold md:text-lg"
      >
        Next Question
      </button>
    </div>
  );
};
