export default function Table() {
  return (
    <table className="w-full h-full">
      <thead className="">
        <tr className="text-gray-500 text-xs font-normal border-t-1 border-gray-300 leading-none ">
          <th className="p-1">Task name</th>
          <th className="p-1">Due on</th>
          <th className="p-1">Task Status</th>
          <th className="p-1">Task Category</th>
        </tr>
      </thead>
      <div className=" flex w-full bg-pink-50">Todo (1)</div>
      <tbody>
        <tr>
          <td colSpan={1}>Todo</td>
          <td>abcd</td>
          <td>abcd</td>
          <td>abcd</td>
          <td>abcd</td>
        </tr>
      </tbody>
    </table>
  );
}
