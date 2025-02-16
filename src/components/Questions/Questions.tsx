import { getQuizQuestions } from "../../api/getQuizQuestions";
import { QuestionData } from "../../types";
import { useQuery } from "@tanstack/react-query";

export const Questions = () => {
  const { data, isError, isLoading } = useQuery<QuestionData>({
    queryKey: ["quizQuestions"],
    queryFn: getQuizQuestions,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div className="text-red-700">
        Error loading question data. Please try again later!
      </div>
    );

  const questions = data?.questions;

  return (
    <div>
      {questions?.map((question) => (
        <h1 key={question.id}>{question.question}</h1>
      ))}
    </div>
  );
};
