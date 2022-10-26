export default function LevelHeader({ symbol, level, numCharts }) {
  return (
    <tr className="bg-red-900 border-b">
      <td
        scope="row"
        colSpan="8"
        className="text-center py-2 font-medium font-bold text-white whitespace-nowrap"
      >
        {symbol}
        {level} ({numCharts} partition{numCharts > 1 ? 's' : ''})
      </td>
    </tr>
  );
}
