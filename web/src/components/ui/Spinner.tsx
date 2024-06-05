import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva(
  [
    "box-border",
    "block",
    "absolute",
    "m-2",
    "border-solid",
    "border-r-transparent",
    "border-l-transparent",
    "border-b-transparent",
    "rounded-full",
    "animate-spinner",
  ],
  {
    variants: {
      color: {
        primary: "border-t-primary",
        white: "border-t-white",
      },
      size: {
        small: ["border-4", "h-8", "w-8"],
        default: ["border-8", "h-16", "w-16"],
        large: ["border-[12px]", "h-24", "w-24"],
      },
    },
    defaultVariants: {
      color: "primary",
      size: "default",
    },
  }
);

const spinnerSize = (size: VariantProps<typeof spinnerVariants>["size"]) => {
  switch (size) {
    case "small":
      return "h-12 w-12";
    case "default":
      return "h-20 w-20";
    case "large":
      return "h-28 w-28";
    default:
      return "h-20 w-20";
  }
};

type SpinnerProps = VariantProps<typeof spinnerVariants> & {
  className?: string;
};

const Spinner: React.FC<SpinnerProps> = ({ className, color, size }) => {
  return (
    <div className={`inline-block ${spinnerSize(size)} relative`} role="status">
      <div
        className={cn(spinnerVariants({ color, size, className }))}
        style={{
          animationDelay: "-0.45s",
        }}
      ></div>
      <div
        className={cn(spinnerVariants({ color, size, className }))}
        style={{
          animationDelay: "-0.3s",
        }}
      ></div>
      <div
        className={cn(spinnerVariants({ color, size, className }))}
        style={{
          animationDelay: "-0.15s",
        }}
      ></div>
    </div>
  );
};

export default Spinner;
