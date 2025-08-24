import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import Button from "./Button/Button";
import { addTask } from "../feature/taskSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

const editorIcons = [
  { id: 1, icon: <Bold size={14} />, name: "bold" },
  { id: 2, icon: <Italic size={14} />, name: "italic" },
  { id: 3, icon: <List size={14} />, name: "list" },
  { id: 4, icon: <ListOrdered size={14} />, name: "listordered" },
  { id: 5, icon: <Strikethrough size={14} />, name: "strikethrough" },
];

const statusOptions = [
  { id: 1, name: "Choose" },
  { id: 2, name: "to-do" },
  { id: 3, name: "in-progress" },
  { id: 4, name: "completed" },
];

export default function TodoForm({
  setIsFormVisisble,
}: {
  setIsFormVisisble: any;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedButton, setSelectedButton] = useState({
    work: true,
    personal: false,
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "work",
    dueDate: "",
    status: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleChangeCategory = () => {
    setSelectedButton((prev) => ({
      work: !prev.work,
      personal: !prev.personal,
    }));
    setFormData((prev) => ({
      ...prev,
      category: selectedButton.work ? "personal" : "work",
    }));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const formatText = (command: string) => {
    document.execCommand(command, false, "");
  };

  const handleSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    let currentValue = e.currentTarget.innerText;
    setFormData((prev) => ({
      ...prev,
      description: currentValue || "",
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.title &&
      formData.description &&
      formData.dueDate &&
      formData.status
    ) {
      console.log("submitted", formData);
      dispatch(addTask(formData));

      setFormData({
        title: "",
        description: "",
        category: "work",
        dueDate: "",
        status: "",
      });
      setIsFormVisisble(false);
    }
  };

  return (
    <section>
      <div className="fixed top-0 left-0 bottom-0 right-0 opacity-50 bg-gray-800" />
      <form
        className="fixed top-1/2 left-1/2 w-[32rem] h-[31rem] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl flex flex-col justify-between"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="flex justify-between px-4 py-3 border-b-1 border-gray-300">
            <h2 className="text-lg">Create Task</h2>
            <span
              className="mr-1 cursor-pointer"
              onClick={() => setIsFormVisisble(false)}
            >
              x
            </span>
          </div>
          <div className="flex flex-col p-2 gap-2">
            <input
              className="w-full p-1.5 text-xs font-normal text-gray-500 outline-1 outline-gray-300 rounded-md bg-gray-50"
              placeholder="Task title"
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }))
              }
            />
            <div className="p-2 w-full rounded-md bg-gray-50 border-1 border-gray-300 mb-2">
              <div
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                className=" w-full border-gray-300 rounded-md p-2 min-h-[50px] outline-none text-xs"
              ></div>
              <div className="flex gap-1">
                {editorIcons.map((icons) => (
                  <button
                    key={icons.id}
                    onClick={() => formatText(icons.name)}
                    className="p-1 rounded hover:bg-gray-200"
                  >
                    {icons.icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between px-2">
              <div className="flex flex-col">
                <label className="text-gray-600 text-xs font-normal">
                  Task Category*
                </label>
                <div className="text-xs leading-none flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      selectedButton.work ? "!bg-[#7B1984] text-white" : ""
                    }
                    onClick={handleChangeCategory}
                  >
                    Work
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      selectedButton.personal ? "!bg-[#7B1984] text-white" : ""
                    }
                    onClick={handleChangeCategory}
                  >
                    Personal
                  </Button>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-[0.7rem]">Due on*</label>
                <input
                  type="date"
                  className="outline-1 rounded-md mt-2 p-1 text-sm text-gray-400 bg-gray-50 cursor-pointer"
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      dueDate: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 text-xs font-normal">
                  Task Status*
                </label>
                <select
                  className="outline-1 outline-gray-300 rounded-md mt-2 p-1 text-[0.7rem] leading-none text-gray-600 bg-gray-50 cursor-pointer"
                  onChange={handleSelectStatus}
                >
                  {statusOptions.map((item) => (
                    <option
                      key={item.id}
                      className={item.name !== "Choose" ? "uppercase" : ""}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-gray-600 text-xs font-normal">
                Attachment
              </label>
              <div className="p-2 w-full border-1 border-gray-300 rounded-md text-xs text-gray-700 bg-gray-50 flex gap-1 justify-center">
                <p className="text-center">Drop your files here or </p>
                <button
                  className="underline text-blue-600 cursor-pointer"
                  onClick={handleClick}
                >
                  {" "}
                  Update
                </button>
                <input
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  type="file"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 bg-[#F1F1F1] py-3 px-2 rounded-b-xl">
          <button
            className="uppercase px-4 py-2 text-xs bg-white rounded-2xl font-semibold border-1 border-gray-300"
            onClick={() => setIsFormVisisble(false)}
          >
            Cancel
          </button>
          <button
            disabled={
              !formData.title ||
              !formData.description ||
              !formData.dueDate ||
              !formData.status
            }
            className="uppercase px-4 py-2 text-xs bg-[#7B1984] text-white rounded-2xl font-semibold disabled:opacity-40"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
}
