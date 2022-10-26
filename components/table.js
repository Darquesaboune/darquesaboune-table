import useSWR from "swr";
import Link from "next/link";
import Spinner from "./spinner";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const fetchData = (url) => {
  const { data, error, isValidating } = useSWR(url, fetcher);

  return {
    data: data,
    isLoading: isValidating,
    isError: error,
  };
};

const groupByLevel = (scores) => {
    return scores.reduce(
        (acc, score) => ({
          ...acc,
          [score.level]: [...(acc[score.level] ?? []), score],
        }),
        {},
      );
}

const sortScores = (order, info) => {
  // mostly copypasted from original code because zzzz (with additional optimizations)
  if (order) {
    const orderAry = order.map((e) => e.toString());
    info.forEach((e) => (e["_index"] = orderAry.indexOf(e["level"])));

    info.sort(function (a, b) {
      if (a["_index"] < b["_index"]) {
        return -1;
      } else if (a["_index"] > b["_index"]) {
        return 1;
      } else if (a["title"].toLowerCase() < b["title"].toLowerCase()) {
        return -1;
      } else if (a["title"].toLowerCase() > b["title"].toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });

    info.forEach((e) => delete e["_index"]);
  } else {
    // そうでない場合はレベル順->タイトル順にソート
    info.sort(function (a, b) {
      var aLv = a["level"].toString();
      var bLv = b["level"].toString();
      if (isNaN(a["level"]) == false && isNaN(b["level"]) == false) {
        return a["level"] - b["level"];
      } else if (aLv < bLv) {
        return -1;
      } else if (aLv > bLv) {
        return 1;
      } else if (a["title"].toLowerCase() < b["title"].toLowerCase()) {
        return -1;
      } else if (a["title"].toLowerCase() > b["title"].toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  return info;
};

function LevelHeader({ symbol, level, numCharts }) {
  return (
    <tr className="bg-red-900 border-b dark:bg-gray-800 dark:border-gray-700">
      <td
        scope="row"
        colSpan="8"
        className="text-center py-2 font-medium text-gray-900 font-bold text-[color:white] whitespace-nowrap"
      >
        {symbol}
        {level} ({numCharts}譜面)
      </td>
    </tr>
  );
}

function ScoreEntry({ data, symbol }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {symbol + data.level}
      </th>
      <td className="px-6 py-4">
        <Link
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Link
        </Link>
      </td>
      <td className="px-6 py-4">
        <Link
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Link
        </Link>
      </td>
      <td className="px-6 py-4">
        <Link
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Link
        </Link>
      </td>
      <td className="px-6 py-4">{data.title}</td>
      <td className="px-6 py-4"><Link href={data.url}>{data.artist}</Link></td>
      <td className="px-6 py-4"><Link href={data.url_diff}>{data.url_diff}</Link></td>
      <td className="px-6 py-4">
      {data.comment}
      </td>
    </tr>
  );
}

function TableData() {
  const fetchHeader = fetchData("/header.json");
  const fetchScores = fetchData("/score.json");
  if (fetchScores.isLoading || fetchHeader.isLoading)
    return (
      <tr className="bg-white">
        <td scope="row" colSpan="8" className="py-2">
          <Spinner />
        </td>
      </tr>
    );
  if (fetchScores.isError || fetchHeader.isError)
    return <tr>Error loading data</tr>;

  const header = fetchHeader.data;
  let scores = fetchScores.data;
  scores = sortScores(header.level_order, scores);
  const subgroups = groupByLevel(scores);

  let data = []
  for (const [key, scores] of Object.entries(subgroups)) {
    data.push(<LevelHeader symbol={header.symbol} level={key} numCharts={scores.length} key={key} />)
    for (const score of scores) {
        data.push(<ScoreEntry data={score} symbol={header.symbol} key={key + score.md5} />)
    }
  }

  return (
    <>{data}</>
  );
}

export default function BmsTable() {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg mx-24 mb-4">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
