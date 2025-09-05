import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import ToolTipOptions from "../TooltipOptions/TooltipOptions";

const DropDownButton = ({
  children,
  dataArr,
  handleSelect,
}: {
  children: React.ReactNode;
  dataArr?: any;
  handleSelect?: any;
}) => {
  const [isTooltip, setIsTooltip] = useState(false);
  const handleSelectData = (data: any) => {
    handleSelect(data);
    setIsTooltip(false);
  };
  return (
    <section>
      <button
        className="border border-gray-500 flex gap-2 leading-none rounded-4xl p-2 font-semibold text-xs text-[rgba(0,0,0,0.6)] cursor-pointer"
        onClick={() => setIsTooltip((prev) => !prev)}
      >
        {children}
        <FaChevronDown size={10} className="leading-none" />
      </button>
      {isTooltip && dataArr && (
        <ToolTipOptions items={dataArr} handleSelect={handleSelectData} />
      )}
    </section>
  );
};

export default DropDownButton;
