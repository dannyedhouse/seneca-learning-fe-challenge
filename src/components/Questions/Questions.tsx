import { useState } from "react";
import { getQuizQuestions } from "../../api/getQuizQuestions";
import { QuestionData } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { OptionsContainer } from "../OptionsContainer/OptionsContainer";
import { useCorrectness } from "../../hooks/useCorrectness";
import { getGradientStyle } from "../../utils/getGradientStyle";
import { getTextColor } from "../../utils/getTextColour";

export const Questions = () => {
  const { data, isError, isLoading } = useQuery<QuestionData>({
    queryKey: ["quizQuestions"],
    queryFn: getQuizQuestions,
  });

  const [currentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const { percentage, allCorrect } = useCorrectness(
    selectedOptions,
    data?.questions[0]?.options ?? []
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div className="text-red-700">
        Error loading question data. Please try again later!
      </div>
    );

  const handleToggleOption = (optionIndex: number, selectedIndex: number) => {
    const newSelections = [...selectedOptions];
    newSelections[optionIndex] = selectedIndex;
    setSelectedOptions(newSelections);
  };

  const questions = data?.questions ?? [];
  const hasQuestions = questions.length > 0;
  const currentQuestion = questions[currentQuestionIndex];

  const gradientStyle = getGradientStyle(percentage);
  const textColor = getTextColor(percentage);

  if (!hasQuestions) {
    return <p>No questions available</p>;
  }

  return (
    <div
      className="py-4 px-4 md:mx-4 md:p-12 md:rounded-xl text-center"
      style={{ background: gradientStyle }}
    >
      <div className="flex flex-col items-center justify-center gap-8 w-full">
        <h1 className="text-white font-bold text-[20px] sm:text-[40px] leading-[56px] tracking-[0px]">
          {currentQuestion?.question}
        </h1>
        <OptionsContainer
          activeTextColor={textColor}
          options={currentQuestion?.options ?? []}
          selectedOptions={selectedOptions}
          onChange={handleToggleOption}
          allCorrect={allCorrect}
        />
      </div>
      <h2 className="text-white font-bold text-[16px] sm:text-[32px] leading-[44.8px] tracking-[0px]">
        The answer is {allCorrect ? "correct!" : "incorrect"}
      </h2>
    </div>
  );
};
