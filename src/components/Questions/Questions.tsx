import { useEffect, useState } from "react";
import { getQuizQuestions } from "../../api/getQuizQuestions";
import { Question } from "../../types";

export const Questions = () => {
  const [questionData, setQuestionData] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuizQuestions(); // Fetch data
        setQuestionData(data.questions); // Update state
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  if (questionData.length === 0) return <p>Loading questions...</p>;

  return (
    <div>
      {questionData.map((question: Question, index: number) => (
        <h1 key={index}>{question.question}</h1>
      ))}
    </div>
  );
};
