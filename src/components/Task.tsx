import clsx from "clsx";
import { useState } from "react";
import { CiViewBoard } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { LuClipboardList } from "react-icons/lu";
import { TfiViewList } from "react-icons/tfi";
import { RiLogoutBoxLine } from "react-icons/ri";

import TableBoard from "./TableBoard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TableList from "./TableList";
import DropDownButton from "./DropDownButton/DropDownButton";
import TodoForm from "./TodoForm";

interface TaskStyleProps {
  list: boolean;
  board: boolean;
}

export default function Task() {
  const [taskStyle, setTaskStyle] = useState<TaskStyleProps>({
    list: true,
    board: false,
  });
  const [isFormVisisble, setIsFormVisisble] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handelLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleSelect = (selectedOption: any) => {
    console.log("selected", selectedOption);
  };

  return (
    <main className=" p-3 w-full h-full flex flex-col">
      <div className="flex gap-1 items-center">
        <LuClipboardList strokeWidth={2} size={20} />
        <h2 className="leading-none text-lg font-medium">TaskBuddy</h2>
      </div>
      <div className="flex gap-4 items-center py-4 px-2">
        <div
          className={clsx(
            ` flex p-0.5 gap-1 items-center`,
            taskStyle.list ? "text-black border-b-[1.4px]" : " text-gray-400"
          )}
          onClick={() => setTaskStyle({ list: true, board: false })}
        >
          <TfiViewList size={10} className="cursor-pointer" />
          <label className="leading-none text-sm font-medium cursor-pointer">
            List
          </label>
        </div>
        <div
          className={clsx(
            `flex p-0.5 gap-1 items-center`,
            taskStyle.board ? "text-black border-b-[1.4px]" : " text-gray-400"
          )}
          onClick={() => setTaskStyle({ list: false, board: true })}
        >
          <CiViewBoard className="cursor-pointer" size={14} />
          <label className="leading-none text-sm font-medium cursor-pointer">
            Board
          </label>
        </div>
        <div className="ml-auto">
          <button
            className="px-3 py-2 flex gap-1 items-center font-semibold text-sm leading-none bg-[#FFF9F9] rounded-xl border border-[#7B198426] cursor-pointer "
            onClick={handelLogout}
          >
            <RiLogoutBoxLine size={16} />
            Logout
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <label className="text-xs text-gray-500 leading-none">
            Filter by:
          </label>
          <DropDownButton
            dataArr={[
              { id: 1, label: "work" },
              { id: 2, label: "personal" },
            ]}
            handleSelect={handleSelect}
          >
            Category
          </DropDownButton>
          <DropDownButton>Due Date</DropDownButton>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex gap-1 border-1 border-gray-500 h-7 max-w-xs  rounded-2xl">
            <FiSearch className="mt-1.5 ml-2" size={14} />
            <input
              placeholder="Search"
              className="outline-none w-full h-full text-[0.7rem] text-gray-700 placeholder-gray-900"
            />
          </div>
          <button
            className="uppercase px-6 py-2 text-[0.7rem] bg-[#7B1984] text-white rounded-2xl font-semibold cursor-pointer"
            onClick={() => setIsFormVisisble(true)}
          >
            Add Task
          </button>
        </div>
      </div>
      <br />
      {isFormVisisble && <TodoForm setIsFormVisisble={setIsFormVisisble} />}
      <hr className="text-gray-200" />
      {taskStyle.list && <TableList />}
      {taskStyle.board && <TableBoard />}
    </main>
  );
}
