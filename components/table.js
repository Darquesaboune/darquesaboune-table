import TableData from "./tabledata";

export default function BmsTable() {
  return (
    <div className="relative overflow-x-auto md:rounded-lg md:mx-24 mb-4">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Lv
            </th>
            <th scope="col" className="px-6 py-3">
              動画
            </th>
            <th scope="col" className="px-6 py-3">
              譜面
            </th>
            <th scope="col" className="px-6 py-3">
              Mocha
            </th>
            <th scope="col" className="px-6 py-3">
              タイトル
            </th>
            <th scope="col" className="px-6 py-3">
              本体
            </th>
            <th scope="col" className="px-6 py-3">
              差分
            </th>
            <th scope="col" className="px-6 py-3">
              コメント
            </th>
          </tr>
        </thead>
        <tbody>
          <TableData />
        </tbody>
      </table>
    </div>
  );
}
