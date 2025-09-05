import { FaCircleCheck } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineEnter } from "react-icons/ai";
import { LuCalendarRange } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import { FaAngleDown } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import ToolTipOptions from "./TooltipOptions/TooltipOptions";
import { addTask, deleteTask, fetchTask } from "../feature/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store/store";
import TodoForm from "./TodoForm";

type taskItemProps = {
  id: string;
  title: string;
  dueDate: string;
  status: string;
  category: string;
};

export default function TableList() {
  const dispatch = useDispatch<AppDispatch>();
  const { taskItems, loading } = useSelector((state: any) => state.task);
  const [isNewTask, setIsNewTask] = useState<boolean>(false);
  const [isEditTask, setIsEditTask] = useState<boolean>(false);
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
  const [isNewTaskDetailsSelected, setIsNewTaskDetailsSelected] = useState({
    status: false,
    category: false,
  });

  const [editTask, setEditTask] = useState<any>(null);

  const [selectedOption, setSelectedOption] = useState("");

  const todoItems = taskItems.filter(
    (task: taskItemProps) => task.status === "to-do"
  );
  const inProgressItems = taskItems.filter(
    (task: taskItemProps) => task.status === "in-progress"
  );
  const completedItems = taskItems.filter(
    (task: taskItemProps) => task.status === "completed"
  );

  const hiddenDateRef = useRef<HTMLInputElement>(null);

  const tableHeadingList = [
    { id: 1, label: "Task name" },
    { id: 2, label: "Due on" },
    { id: 3, label: "Task Status" },
    { id: 4, label: "Task Category" },
    { id: 5, label: "Options" },
  ];

  const handleOpenPicker = () => {
    if (hiddenDateRef.current) hiddenDateRef?.current?.showPicker();
  };

  const handleSelectStatus = (selectedItem: any) => {
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

  const handleChooseOptions = (
    selectedOption: { id: number; label: string },
    selectedItemObj: taskItemProps
  ) => {
    if (selectedOption.label === "Delete") {
      dispatch(deleteTask(selectedItemObj.id));
      dispatch(fetchTask());
    } else if (selectedOption.label === "Edit") {
      setIsEditTask(true);
      setEditTask(selectedItemObj);
    }
    setSelectedOption("");
  };

  const handleSubmit = () => {
    dispatch(addTask(formData));

    setFormData({
      title: "",
      category: "work",
      dueDate: "",
      status: "",
    });
    setIsNewTask(false);
  };
  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  return (
    <section>
      {isEditTask && (
        <TodoForm formValue={editTask} setIsFormVisisble={setIsEditTask} />
      )}
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
              <div
                className="flex justify-between items-center px-2 cursor-pointer"
                onClick={() =>
                  setIsCollapse((prevCollapse) => ({
                    ...prevCollapse,
                    toDo: !prevCollapse.toDo,
                  }))
                }
              >
                <p>Todo (3)</p>
                <FaAngleDown size={15} className="cursor-pointer" />
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
                        <button
                          className="uppercase px-2.5 py-1.5 text-[0.65rem] bg-[#7B1984] text-white rounded-2xl font-semibold flex gap-1 justify-center leading-none cursor-pointer"
                          onClick={handleSubmit}
                        >
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
                    <button
                      className="flex gap-1 items-center text-gray-600 text-[0.7rem] border-gray-400 border-1 rounded-2xl leading-none px-3 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={handleOpenPicker}
                    >
                      <input
                        type="date"
                        className="hidden"
                        min={new Date().toISOString().split("T")[0]}
                        ref={hiddenDateRef}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            dueDate: e.target.value,
                          }))
                        }
                      />
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
                        isUpperCaseText={true}
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
                        isUpperCaseText={true}
                      />
                    )}
                  </td>
                  <td></td>
                </tr>
              )}
              {todoItems.map((item: taskItemProps) => (
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
                  <td className="cursor-pointer">
                    <SlOptions
                      size={10}
                      onClick={() => setSelectedOption(item.id)}
                    />
                    {selectedOption === item.id && (
                      <ToolTipOptions
                        className=" -ml-25"
                        items={[
                          { id: 1, label: "Edit" },
                          { id: 2, label: "Delete" },
                        ]}
                        handleSelect={(selectedOption) =>
                          handleChooseOptions(selectedOption, item)
                        }
                      />
                    )}
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
              <div
                className="flex justify-between items-center px-2 cursor-pointer"
                onClick={() =>
                  setIsCollapse((prevCollapse) => ({
                    ...prevCollapse,
                    inProgress: !prevCollapse.inProgress,
                  }))
                }
              >
                <p>In-Progress (3)</p>
                <FaAngleDown size={15} />
              </div>
            </td>
          </tr>
          {!isCollapse.inProgress && (
            <>
              {inProgressItems.map((item: taskItemProps) => (
                <tr
                  key={item.id}
                  className="border-b-1 border-gray-300 text-sm text-left bg-gray-100"
                >
                  <td className="p-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="outline-[#a7a7a7] accent-[#2683B5] cursor-pointer "
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
                  <td className="cursor-pointer">
                    <SlOptions
                      size={10}
                      onClick={() => setSelectedOption(item.id)}
                    />
                    {selectedOption === item.id && (
                      <ToolTipOptions
                        className=" -ml-25"
                        items={[
                          { id: 1, label: "Edit" },
                          { id: 2, label: "Delete" },
                        ]}
                        handleSelect={(selectedOption) =>
                          handleChooseOptions(selectedOption, item)
                        }
                      />
                    )}
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
              <div
                className="flex justify-between items-center px-2 cursor-pointer"
                onClick={() =>
                  setIsCollapse((prevCollapse) => ({
                    ...prevCollapse,
                    completed: !prevCollapse.completed,
                  }))
                }
              >
                <p>Completed (3)</p>
                <FaAngleDown size={15} />
              </div>
            </td>
          </tr>
          {!isCollapse.completed && (
            <>
              {completedItems.map((item: taskItemProps) => (
                <tr
                  key={item.id}
                  className="border-b-1 border-gray-300 text-sm text-left bg-gray-100"
                >
                  <td className="p-1">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="outline-[#a7a7a7] accent-[#1B8D17] cursor-pointer "
                      />
                      <SlOptionsVertical size={10} className="text-[#a7a7a7]" />
                      <SlOptionsVertical
                        size={10}
                        className="text-[#a7a7a7] "
                      />
                      <div className="flex gap-0.5 items-center">
                        <FaCircleCheck size={14} className="text-[#1B8D17]" />
                        <p className="leading-none">{item.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">{item.dueDate}</td>
                  <td className="p-2">{item.status}</td>
                  <td className="p-2">{item.category}</td>
                  <td className="cursor-pointer">
                    <SlOptions
                      size={10}
                      onClick={() => setSelectedOption(item.id)}
                    />
                    {selectedOption === item.id && (
                      <ToolTipOptions
                        className=" -ml-25"
                        items={[
                          { id: 1, label: "Edit" },
                          { id: 2, label: "Delete" },
                        ]}
                        handleSelect={(selectedOption) =>
                          handleChooseOptions(selectedOption, item)
                        }
                      />
                    )}
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
