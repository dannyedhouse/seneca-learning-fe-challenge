import { OptionSwitch } from "../OptionSwitch/OptionSwitch";
import { AnswerOption } from "../../types";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWrapped, setIsWrapped] = useState(false);

  // Calculate the maxWidth based on the longest choice
  const maxWidth = useMemo(() => {
    const longestChoice = options
      .flatMap((option) => option.choices)
      .reduce((max, choice) => (choice.length > max ? choice.length : max), 0);

    return longestChoice * 35 + 40;
  }, [options]);

  useEffect(() => {
    const checkStacking = () => {
      if (containerRef.current && options.length > 0) {
        const containerWidth = containerRef.current.offsetWidth;
        const firstOption = containerRef.current.querySelector("button");

        if (firstOption && options[0]?.choices?.length) {
          const buttonWidth = firstOption.clientWidth || 0;
          const totalButtonWidth = buttonWidth * options[0].choices.length;

          setIsWrapped(totalButtonWidth > containerWidth);
        }
      }
    };

    checkStacking();
    window.addEventListener("resize", checkStacking);
    return () => window.removeEventListener("resize", checkStacking);
  }, [options]);

  return (
    <div className="flex flex-col gap-8 md:gap-4 mb-8 w-full items-center">
      {options.map((option, index) => (
        <OptionSwitch
          isWrapped={isWrapped}
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
