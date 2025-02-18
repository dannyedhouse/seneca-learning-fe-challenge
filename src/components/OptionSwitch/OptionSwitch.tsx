import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Choice } from "../../types";

interface OptionSwitchProps {
  activeTextColor: string;
  choices: Choice[];
  selectedChoice: Choice | undefined;
  onToggle: (choice: Choice) => void;
  allCorrect: boolean;
  maxWidth: number;
}

export const OptionSwitch = ({
  activeTextColor,
  choices,
  selectedChoice,
  onToggle,
  allCorrect,
  maxWidth,
}: OptionSwitchProps) => {
  const [isWrapped, setIsWrapped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(() => {
      if (!containerRef.current) return;

      const firstRow = containerRef.current.querySelector("button");
      if (!firstRow) return;

      const isNowWrapped =
        containerRef.current.clientHeight > firstRow.clientHeight * 1.5;
      setIsWrapped(isNowWrapped);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [choices]);

  const selectedIndex = choices.findIndex(
    (choice) => choice.id === selectedChoice?.id
  );

  return (
    <div
      data-testid="option-switch"
      className={`border-2 border-white border-opacity-20 relative flex flex-wrap gap-2 ${
        isWrapped ? "rounded-3xl" : "rounded-full"
      } w-full`}
      style={{ maxWidth }}
      ref={containerRef}
    >
      {choices.map((choice) => {
        const isActive = choice.id === selectedChoice?.id;
        return (
          <button
            key={choice.id}
            onClick={() => onToggle(choice)}
            className={`relative z-10 text-center px-4 py-4 font-semibold transition-all 
               text-[18px] md:text-2xl flex-[1_1_auto] ${
                 !isActive && "hover:opacity-70"
               }`}
            style={{ color: isActive ? activeTextColor : "rgb(255, 255, 255)" }}
            disabled={allCorrect}
          >
            {choice.text}
          </button>
        );
      })}
      <motion.div
        className={`absolute bg-white/40 z-0 ${
          isWrapped
            ? selectedIndex === 0
              ? "rounded-t-3xl"
              : selectedIndex === choices.length - 1
              ? "rounded-b-3xl"
              : ""
            : "rounded-full"
        }`}
        style={{
          width: isWrapped ? "100%" : `${100 / choices.length}%`,
          height: isWrapped ? `${100 / choices.length}%` : "100%",
        }}
        animate={
          isWrapped
            ? { y: selectedIndex >= 0 ? `${selectedIndex * 100}%` : 0 }
            : { x: selectedIndex >= 0 ? `${selectedIndex * 100}%` : 0 }
        }
        initial={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 50 }}
      />
    </div>
  );
};
