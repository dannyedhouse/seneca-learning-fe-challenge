import { OptionSwitch } from "../OptionSwitch/OptionSwitch";
import { AnswerOption } from "../../types";
import { useMemo } from "react";

interface OptionsContainerProps {
  activeTextColor: string;
  options: AnswerOption[];
  selectedOptions: number[];
  onChange: (optionIndex: number, selectedIndex: number) => void;
  allCorrect: boolean;
}

export const OptionsContainer = ({
  activeTextColor,
  options,
  selectedOptions,
  onChange,
  allCorrect,
}: OptionsContainerProps) => {
  const maxWidth = useMemo(() => {
    const longestChoice = options
      .flatMap((option) => option.choices)
      .reduce((max, choice) => (choice.length > max ? choice.length : max), 0);

    return longestChoice * 30 + 40;
  }, [options]);

  return (
    <div className="flex flex-col gap-8 md:gap-4 mb-8">
      {options.map((option, index) => (
        <OptionSwitch
          activeTextColor={activeTextColor}
          key={option.id}
          choices={option.choices}
          selectedIndex={selectedOptions[index]}
          onToggle={(selectedIndex) => onChange(index, selectedIndex)}
          allCorrect={allCorrect}
          maxWidth={maxWidth}
        />
      ))}
    </div>
  );
};
