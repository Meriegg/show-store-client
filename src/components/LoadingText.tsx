import clsx from "clsx";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  containerClass?: string;
  textClass?: string;
  customLabel?: string;
}

const LoadingText = ({ containerClass, customLabel, textClass }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 font-semibold text-black py-2 w-full justify-center",
        containerClass
      )}
    >
      <LoadingSpinner />
      <p className={clsx("text-sm", textClass)}>{customLabel || "Loading"}</p>
    </div>
  );
};

export default LoadingText;
