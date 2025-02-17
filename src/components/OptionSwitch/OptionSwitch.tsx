import { motion } from "framer-motion";

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
  return (
    <div
      className="border-2 border-white border-opacity-20 relative flex items-center rounded-full w-full"
      style={{ maxWidth }}
    >
      {choices.map((choice, index) => {
        const isActive = selectedIndex === index;
        return (
          <button
            key={index}
            onClick={() => onToggle(index)}
            className={`relative z-10 flex-1 text-center px-4 py-4 font-semibold transition-all 
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
        style={{ width: `${100 / choices.length}%` }}
        animate={{
          x: selectedIndex !== undefined ? `${selectedIndex * 100}%` : 0,
          opacity: 1,
        }}
        initial={{ opacity: 0.4 }}
        transition={{ type: "spring", stiffness: 400, damping: 50 }}
      />
    </div>
  );
};
