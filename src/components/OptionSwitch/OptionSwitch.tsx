import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface OptionSwitchProps {
  activeTextColor: string;
  choices: string[];
  selectedIndex: number | undefined;
  onToggle: (index: number) => void;
  allCorrect: boolean;
  maxWidth: number;
}

export const OptionSwitch = ({
  activeTextColor,
  choices,
  selectedIndex,
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

  return (
    <div
      className={`border-2 border-white border-opacity-20 relative flex flex-wrap gap-2 rounded-full w-full`}
      style={{ maxWidth }}
    >
      {choices.map((choice, index) => {
        const isActive = selectedIndex === index;
        return (
          <button
            key={index}
            onClick={() => onToggle(index)}
            className={`relative z-10 flex-[1_1_50%] w-full flex-wrap text-center px-4 py-4 font-semibold transition-all 
               text-[18px] md:text-2xl `}
            style={{ color: isActive ? activeTextColor : "rgb(255, 255, 255)" }}
            disabled={allCorrect}
          >
            {choice}
          </button>
        );
      })}
      <motion.div
        className="absolute h-[calc(100%-0px)] bg-white/40 rounded-full z-0"
        style={{
          width: isWrapped ? "100%" : `${100 / choices.length}%`,
          height: isWrapped ? `${100 / choices.length}%` : "100%",
        }}
        animate={
          isWrapped
            ? { y: selectedIndex !== undefined ? `${selectedIndex * 100}%` : 0 }
            : { x: selectedIndex !== undefined ? `${selectedIndex * 100}%` : 0 }
        }
        initial={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 50 }}
      />
    </div>
  );
};
