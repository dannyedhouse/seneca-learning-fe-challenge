import { motion } from "framer-motion";

interface OptionSwitchProps {
  choices: string[];
  selectedIndex: number | undefined;
  onToggle: (index: number) => void;
  allCorrect: boolean;
}

export const OptionSwitch = ({
  choices,
  selectedIndex,
  onToggle,
  allCorrect,
}: OptionSwitchProps) => {
  return (
    <div
      className="relative flex items-center p-1 rounded-full"
      style={{ width: "300px" }}
    >
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onToggle(index)}
          className={`relative z-10 flex-1 text-center px-4 py-2 font-semibold transition-all text-white`}
          disabled={allCorrect}
        >
          {choice}
        </button>
      ))}
      <motion.div
        className="absolute top-1 left-1 h-[calc(100%-8px)] bg-white/20 rounded-full"
        style={{ width: `${100 / choices.length}%` }}
        animate={{
          x: selectedIndex !== undefined ? `${selectedIndex * 100}%` : 0,
          opacity: 1,
        }}
        initial={{ opacity: 0.2 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </div>
  );
};
