import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import { useRef } from "react";

export default function TodoForm() {
  const editorRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <div className="fixed top-1/2 left-1/2 w-[32rem] h-[31rem] transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl flex flex-col justify-between">
      <div>
        <div className="flex justify-between px-4 py-3 border-b-1 border-gray-300">
          <h2 className="text-lg">Create Task</h2>
          <span className="mr-1 cursor-pointer">x</span>
        </div>
        <div className="flex flex-col p-2 gap-2">
          <input
            className="w-full p-1.5 text-xs font-normal text-gray-500 outline-1 outline-gray-300 rounded-md bg-gray-50"
            placeholder="Task title"
          />
          <div className="p-2 w-full rounded-md bg-gray-50 border-1 border-gray-300 mb-2">
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className=" w-full border-gray-300 rounded-md p-2 min-h-[50px] outline-none text-xs"
            ></div>
            <div className="flex gap-1">
              <button
                onClick={() => formatText("bold")}
                className="p-1 rounded hover:bg-gray-200"
                // title="Bold"
              >
                <Bold size={14} />
              </button>
              <button
                onClick={() => formatText("italic")}
                className="p-1 rounded hover:bg-gray-200"
                // title="Italic"
              >
                <Italic size={14} />
              </button>
              <button
                onClick={() => formatText("strikeThrough")}
                className="p-1 rounded hover:bg-gray-200"
                title="Strikethrough"
              >
                <Strikethrough size={14} />
              </button>
              <button
                // onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className="p-1 rounded hover:bg-gray-200"
              >
                <ListOrdered size={14} />
              </button>
              <button
                // onClick={() => formatText("strikeThrough")}
                className="p-1 rounded hover:bg-gray-200"
              >
                <List size={14} />
              </button>
            </div>
          </div>

          <div className="flex justify-between px-2">
            <div className="flex flex-col">
              <label className="text-gray-600 text-xs font-normal">
                Task Category*
              </label>
              <div className="text-xs leading-none flex gap-2 mt-2">
                <button className="px-5 py-2 border-1  border-gray-400 rounded-2xl font-medium">
                  Work
                </button>
                <button className="px-5 py-2 border-1  border-gray-400 rounded-2xl font-medium">
                  Personal
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-[0.7rem]">Due on*</label>
              <input
                type="date"
                className="outline-1 rounded-md mt-2 p-1 text-sm text-gray-400 bg-gray-50"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-xs font-normal">
                Task Status*
              </label>
              <select className="outline-1 outline-gray-300 rounded-md mt-2 p-1 text-[0.7rem] leading-none text-gray-600 bg-gray-50">
                <option>Choose</option>
                <option className="uppercase">To-do</option>
                <option className="uppercase">In-progress</option>
                <option className="uppercase">Completed</option>
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
        <button className="uppercase px-4 py-2 text-xs bg-white rounded-2xl font-semibold border-1 border-gray-300">
          Cancel
        </button>
        <button className="uppercase px-4 py-2 text-xs bg-[#7B1984] text-white rounded-2xl font-semibold opacity-40">
          Create
        </button>
      </div>
    </div>
  );
}
