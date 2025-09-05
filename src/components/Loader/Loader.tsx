import { memo } from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  //   props;
}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className="w-20 h-20 border-4 border-gray-500 border-t-white rounded-full animate-spin"></div>
  );
};

export default memo(Loader);
