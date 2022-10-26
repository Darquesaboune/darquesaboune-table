import TableData from "./tabledata";

export default function BmsTable() {
  return (
    <div className="relative overflow-x-auto md:rounded-lg md:mx-24">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nv
            </th>
            <th scope="col" className="px-6 py-3">
              Vidéo
            </th>
            <th scope="col" className="px-6 py-3">
              Partition
            </th>
            <th scope="col" className="px-6 py-3">
              Radar de rythme
            </th>
            <th scope="col" className="px-6 py-3">
              Titre
            </th>
            <th scope="col" className="px-6 py-3">
              Corps
            </th>
            <th scope="col" className="px-6 py-3">
              Saboune
            </th>
            <th scope="col" className="px-6 py-3">
              Commentaire
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
