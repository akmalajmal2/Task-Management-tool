import clsx from "clsx";
import type { IconType } from "react-icons";

interface ListProps {
  items: { id: number; icon?: IconType | null; label: string }[];
  isUpperCaseText?: boolean;
  className?: string;
  handleSelect: (item: {
    id: number;
    icon?: IconType | null;
    label: string;
  }) => void;
}

export default function ToolTipOptions({
  items,
  handleSelect,
  isUpperCaseText = false,
  className,
}: ListProps) {
  return (
    <ul
      className={clsx(
        "absolute z-30 cursor-pointer border border-[#7B198426] bg-[#FFF9F9] inline-block rounded-xl px-4 py-2",
        className
      )}
    >
      {items.map((item) => (
        <li
          key={item.id}
          className="flex gap-2.5 cursor-pointer items-center justify-start mb-1.5 hover:text-gray-500"
          onClick={() => handleSelect(item)}
        >
          {item.icon && <item.icon />}
          <label
            className={`font-normal text-[16px] leading-[1.4] ${
              isUpperCaseText ? "uppercase" : ""
            }`}
          >
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  );
}
