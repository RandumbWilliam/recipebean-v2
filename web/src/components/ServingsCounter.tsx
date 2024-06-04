import clsx from "clsx";
import { IconMinus, IconPlus } from "./icons";

interface ServingsCounterProps {
  servings: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const ServingsCounter: React.FC<ServingsCounterProps> = ({
  servings,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex gap-3 items-center">
      <button
        className="flex items-center justify-center w-6 h-6 border border-gray-300 rounded-full"
        disabled={servings === 0}
        onClick={onDecrement}
      >
        <IconMinus
          className={clsx("w-4 h-4", {
            "fill-gray-400": servings === 0,
            "fill-brink-pink-500": servings !== 0,
          })}
        />
      </button>
      <p>{servings} servings</p>
      <button
        className="flex items-center justify-center w-6 h-6 border border-gray-300 rounded-full"
        disabled={servings === 99}
        onClick={onIncrement}
      >
        <IconPlus
          className={clsx("w-4 h-4", {
            "fill-gray-400": servings === 99,
            "fill-brink-pink-500": servings !== 99,
          })}
        />
      </button>
    </div>
  );
};

export default ServingsCounter;
