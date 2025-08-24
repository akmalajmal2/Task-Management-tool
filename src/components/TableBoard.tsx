import { SlOptions } from "react-icons/sl";
export default function TableBoard() {
  const listItems = [
    {
      id: 1,
      title: "abcd",
      dueDate: "2025-08-15",
      status: "todo",
      category: "work",
    },
    {
      id: 2,
      title: "abcd",
      dueDate: "2025-08-15",
      status: "todo",
      category: "work",
    },
    {
      id: 3,
      title: "abcd",
      dueDate: "2025-08-15",
      status: "todo",
      category: "work",
    },
  ];
  return (
    <section className="flex gap-5 h-full w-5xl flex-1">
      <ul className=" bg-[#58575112] flex-1 rounded-xl border border-[#58575112] flex flex-col gap-3 px-3">
        <span className="uppercase bg-[#FAC3FF] p-2 w-fit font-medium text-sm rounded-sm px-2 py-1 mt-2.5">
          To-do
        </span>
        {listItems.map((item) => (
          <li
            key={item.id}
            className="bg-white p-3 rounded-xl border-[0.5px] border-[#58575147] w-xs h-24"
          >
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[16px]">{item.title}</h3>
                <SlOptions size={14} className="text-[#121212]" />
              </div>
              <div className="flex justify-between items-center font-semibold text-[10px] text-[#00000080] leading-none">
                <label>Work</label>
                <label>Today</label>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ul className=" bg-[#58575112] flex-1 rounded-xl border border-[#58575112] flex flex-col gap-3 px-3">
        <span className="uppercase bg-[#85D9F1] p-2 w-fit font-medium text-sm rounded-sm px-2 py-1 mt-2.5">
          in-progress
        </span>
        {listItems.map((item) => (
          <li
            key={item.id}
            className="bg-white p-3 rounded-xl border-[0.5px] border-[#58575147] w-xs h-24"
          >
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[16px]">{item.title}</h3>
                <SlOptions size={14} className="text-[#121212]" />
              </div>
              <div className="flex justify-between items-center font-semibold text-[10px] text-[#00000080] leading-none">
                <label>Work</label>
                <label>Today</label>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ul className=" bg-[#58575112] flex-1 rounded-xl border border-[#58575112] flex flex-col gap-3 px-3">
        <span className="uppercase bg-[#A2D6A0] p-2 w-fit font-medium text-sm rounded-sm px-2 py-1 mt-2.5">
          completed
        </span>
        {listItems.map((item) => (
          <li
            key={item.id}
            className="bg-white p-3 rounded-xl border-[0.5px] border-[#58575147] w-xs h-24"
          >
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[16px]">{item.title}</h3>
                <SlOptions size={14} className="text-[#121212]" />
              </div>
              <div className="flex justify-between items-center font-semibold text-[10px] text-[#00000080] leading-none">
                <label>Work</label>
                <label>Today</label>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
