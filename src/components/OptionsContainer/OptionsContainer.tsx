import { OptionSwitch } from "../OptionSwitch/OptionSwitch";
import { AnswerOption } from "../../types";

interface OptionsContainerProps {
  options: AnswerOption[];
  selectedOptions: number[];
  onChange: (optionIndex: number, selectedIndex: number) => void;
  allCorrect: boolean;
}

export const OptionsContainer = ({
  options,
  selectedOptions,
  onChange,
  allCorrect,
}: OptionsContainerProps) => {
  return (
    <div className="flex flex-col gap-4">
      {options.map((option, index) => (
        <OptionSwitch
          key={option.id}
          choices={option.choices}
          selectedIndex={selectedOptions[index]}
          onToggle={(selectedIndex) => onChange(index, selectedIndex)}
          allCorrect={allCorrect}
        />
      ))}
    </div>
  );
};
