import clsx from "clsx";

interface ButtonProps {
  variant: "primary" | "default" | "outline";
  size: "md" | "sm";
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  variant = "default",
  size = "md",
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "text-center leading-none rounded-4xl cursor-pointer",
        `${
          variant === "primary" && " bg-[#7B1984] text-white text-sm font-bold"
        }`,
        `${
          variant === "default" &&
          " bg-white text-[##090909] text-sm font-bold border border-[#00000030]"
        }`,
        `${
          variant === "outline" &&
          " bg-white text-sm leading-snug font-bold border border-[#00000030]"
        }`,
        `${size === "md" && "text-sm font-bold px-8 py-2.5"}`,
        `${size === "sm" && "text-[10px] font-bold px-6 py-2"}`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
