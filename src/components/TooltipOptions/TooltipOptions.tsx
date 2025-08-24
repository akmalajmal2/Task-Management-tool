import type { IconType } from "react-icons";

interface ListProps {
  items: { id: number; icon?: IconType | null; label: string }[];
  handleSelect: (item: {
    id: number;
    icon?: IconType | null;
    label: string;
  }) => void;
}

export default function ToolTipOptions({ items, handleSelect }: ListProps) {
  return (
    <ul className="absolute border border-[#7B198426] bg-[#FFF9F9] inline-block rounded-xl px-4 py-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex gap-2.5 items-center justify-start cursor-pointer mb-1.5"
          onClick={() => handleSelect(item)}
        >
          {item.icon && <item.icon />}
          <label className="font-normal text-[16px] leading-[1.4]">
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  );
}
