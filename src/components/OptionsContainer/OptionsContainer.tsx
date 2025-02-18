import { OptionSwitch } from "../OptionSwitch/OptionSwitch";
import { AnswerOption, Choice } from "../../types";
import { useMemo } from "react";

interface OptionsContainerProps {
  activeTextColor: string;
  options: AnswerOption[];
  selectedChoices: Record<number, Choice>;
  onChange: (answerOptionId: number, choice: Choice) => void;
  allCorrect: boolean;
}

export const OptionsContainer = ({
  activeTextColor,
  options,
  selectedChoices,
  onChange,
  allCorrect,
}: OptionsContainerProps) => {
  const maxWidth = useMemo(() => {
    const longestChoice = options
      .flatMap((option) => option.choices)
      .reduce(
        (max, choice) => (choice.text.length > max ? choice.text.length : max),
        0
      );

    return longestChoice * 35 + 40;
  }, [options]);

  return (
    <div className="flex flex-col gap-8 md:gap-6 w-full items-center">
      {options.map((option) => (
        <OptionSwitch
          activeTextColor={activeTextColor}
          key={option.id}
          choices={option.choices}
          selectedChoice={selectedChoices[option.id]}
          onToggle={(selectedIndex) => onChange(option.id, selectedIndex)}
          allCorrect={allCorrect}
          maxWidth={maxWidth}
        />
      ))}
    </div>
  );
};
