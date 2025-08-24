import { FaCircleCheck } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineEnter } from "react-icons/ai";
import { LuCalendarRange } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";
import ToolTipOptions from "./TooltipOptions/TooltipOptions";

export default function TableList() {
  const [isNewTask, setIsNewTask] = useState<boolean>(false);
  const [isCollapse, setIsCollapse] = useState({
    toDo: false,
    inProgress: false,
    completed: false,
  });

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    status: "",
    dueDate: "",
  });
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

  const tableHeadingList = [
    { id: 1, label: "Task name" },
    { id: 2, label: "Due on" },
    { id: 3, label: "Task Status" },
    { id: 4, label: "Task Category" },
    { id: 5, label: "Options" },
  ];

  const [isNewTaskDetailsSelected, setIsNewTaskDetailsSelected] = useState({
    status: false,
    category: false,
  });

  const handleSelectStatus = (selectedItem: any) => {
    console.log(22, selectedItem);
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: selectedItem.label,
    }));
    setIsNewTaskDetailsSelected({ status: false, category: false });
  };

  const handleSelectCategory = (selectedItem: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: selectedItem.label,
    }));
    setIsNewTaskDetailsSelected({ status: false, category: false });
  };

  console.log(234, formData);

  return (
    <section>
      <table className="w-full">
        <thead>
          <tr className="text-gray-500 text-xs text-left font-normal border-t-1 border-gray-300 leading-none ">
            {tableHeadingList.map((headings) => (
              <th className="py-2" key={headings.id}>
                {headings.label !== "Options" ? headings.label : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[#fac3ff] text-left">
            <td className="p-2 rounded-t-xl font-semibold text-lg" colSpan={5}>
              <div className="flex justify-between items-center px-2">
                <p>Todo (3)</p>
                <FaAngleDown
                  size={15}
                  className="cursor-pointer"
                  onClick={() =>
                    setIsCollapse((prevCollapse) => ({
                      ...prevCollapse,
                      toDo: !prevCollapse.toDo,
                    }))
                  }
                />
              </div>
            </td>
          </tr>
          {!isCollapse.toDo && (
            <>
              <tr className="border-b-1 border-gray-300 text-sm text-left bg-gray-100">
                <td colSpan={5} className="uppercase">
                  <div
                    className="flex gap-1.5 items-center py-2 ml-6 cursor-pointer"
                    onClick={() => setIsNewTask((prev) => !prev)}
                  >
                    <span className="text-[#7B1984] text-xl leading-[0] mb-1">
                      +
                    </span>
                    <p className="leading-none font-semibold text-[0.7rem]">
                      Add Task
                    </p>
                  </div>
                </td>
              </tr>
              {isNewTask && (
                <tr className="border-b-1 border-gray-300 text-sm text-left bg-gray-100">
                  <td className="uppercase ">
                    <div className="flex flex-col gap-3 items-start py-2 ml-6">
                      <input
                        placeholder="Task Title"
                        className="outline-none text-xs"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                      <div className="flex gap-3">
                        <button className="uppercase px-2.5 py-1.5 text-[0.65rem] bg-[#7B1984] text-white rounded-2xl font-semibold flex gap-1 justify-center leading-none cursor-pointer">
                          Add <AiOutlineEnter size={11} />
                        </button>
                        <button
                          className="uppercase text-[0.7rem] font-bold cursor-pointer"
                          onClick={() => setIsNewTask(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button className="flex gap-1 items-center text-gray-600 text-[0.7rem] border-gray-400 border-1 rounded-2xl leading-none px-3 py-2 hover:bg-gray-200 cursor-pointer">
                      <input type="date" className="hidden" />
                      <LuCalendarRange size={13} className="text-gray-700" />
                      Add date
                    </button>
                  </td>
                  <td>
                    <button
                      className="text-lg rounded-2xl border border-gray-400 leading-none px-2 py-1 text-center hover:bg-gray-200 cursor-pointer"
                      onClick={() =>
                        setIsNewTaskDetailsSelected(() => ({
                          status: true,
                          category: false,
                        }))
                      }
                    >
                      +
                    </button>
                    {isNewTaskDetailsSelected.status && (
                      <ToolTipOptions
                        items={[
                          { id: 2, label: "to-do" },
                          { id: 3, label: "in-progress" },
                          { id: 4, label: "completed" },
                        ]}
                        handleSelect={handleSelectStatus}
                      />
                    )}
                  </td>
                  <td>
                    <button
                      className="text-lg rounded-2xl border border-gray-400 leading-none px-2 py-1 text-center hover:bg-gray-200 cursor-pointer"
                      onClick={() =>
                        setIsNewTaskDetailsSelected(() => ({
                          status: false,
                          category: true,
                        }))
                      }
                    >
                      +
                    </button>
                    {isNewTaskDetailsSelected.category && (
                      <ToolTipOptions
                        items={[
                          { id: 1, label: "work" },
                          { id: 2, label: "personal" },
                        ]}
                        handleSelect={handleSelectCategory}
                      />
                    )}
                  </td>
                  <td></td>
                </tr>
              )}
              {listItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b-1 border-gray-300 text-sm text-left bg-gray-100"
                >
                  <td className="p-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="outline-[#a7a7a7] accent-[#7B1984] cursor-pointer "
                      />
                      <SlOptionsVertical size={10} className="text-[#a7a7a7]" />
                      <SlOptionsVertical
                        size={10}
                        className="text-[#a7a7a7] "
                      />
                      <div className="flex gap-0.5 items-center">
                        <FaCircleCheck size={14} className="text-[#a7a7a7]" />
                        <p className="leading-none">{item.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">{item.dueDate}</td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2">{item.category}</td>
                  <td>
                    <SlOptions size={10} />
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <br />
      <table className="w-full">
        <tbody>
          <tr className="bg-[#85D9F1] text-left">
            <td className="p-2 rounded-t-xl font-semibold text-lg" colSpan={5}>
              <div className="flex justify-between items-center px-2">
                <p>In-Progress (3)</p>
                <FaAngleDown
                  size={15}
                  onClick={() =>
                    setIsCollapse((prevCollapse) => ({
                      ...prevCollapse,
                      inProgress: !prevCollapse.inProgress,
                    }))
                  }
                />
              </div>
            </td>
          </tr>
          {!isCollapse.inProgress && (
            <>
              {listItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b-1 border-gray-300 text-sm text-left bg-gray-100"
                >
                  <td className="p-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="outline-[#a7a7a7] accent-[#7B1984] cursor-pointer "
                      />
                      <SlOptionsVertical size={10} className="text-[#a7a7a7]" />
                      <SlOptionsVertical
                        size={10}
                        className="text-[#a7a7a7] "
                      />
                      <div className="flex gap-0.5 items-center">
                        <FaCircleCheck size={14} className="text-[#a7a7a7]" />
                        <p className="leading-none">{item.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">{item.dueDate}</td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2">{item.category}</td>
                  <td>
                    <SlOptions size={10} />
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <br />
      <table className="w-full">
        <tbody>
          <tr className="bg-[#CEFFCC] text-left">
            <td className="p-2 rounded-t-xl font-semibold text-lg" colSpan={5}>
              <div className="flex justify-between items-center px-2">
                <p>Completed (3)</p>
                <FaAngleDown
                  size={15}
                  onClick={() =>
                    setIsCollapse((prevCollapse) => ({
                      ...prevCollapse,
                      completed: !prevCollapse.completed,
                    }))
                  }
                />
              </div>
            </td>
          </tr>
          {!isCollapse.completed && (
            <>
              {listItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b-1 border-gray-300 text-sm text-left bg-gray-100"
                >
                  <td className="p-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="outline-[#a7a7a7] accent-[#7B1984] cursor-pointer "
                      />
                      <SlOptionsVertical size={10} className="text-[#a7a7a7]" />
                      <SlOptionsVertical
                        size={10}
                        className="text-[#a7a7a7] "
                      />
                      <div className="flex gap-0.5 items-center">
                        <FaCircleCheck size={14} className="text-[#a7a7a7]" />
                        <p className="leading-none">{item.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">{item.dueDate}</td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2">{item.category}</td>
                  <td>
                    <SlOptions size={10} />
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </section>
  );
}
