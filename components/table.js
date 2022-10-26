import useSWR from "swr";
import Spinner from "./spinner";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useFetchData = (url) => {
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
    {}
  );
};

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
    <tr className="bg-red-900 border-b">
      <td
        scope="row"
        colSpan="8"
        className="text-center py-2 font-medium font-bold text-white whitespace-nowrap"
      >
        {symbol}
        {level} ({numCharts}譜面)
      </td>
    </tr>
  );
}

function ScoreEntry({ data, symbol }) {
  const video =
    data.video1 ? "http://www.nicovideo.jp/watch/sm" + data.video1 :
    data.video2 ? "http://www.youtube.com/watch?v=" + data.video2  :
    data.video3 ? "http://vimeo.com/" + data.video3                :
            null ;
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {symbol + data.level}
      </th>
      <td className="px-6 py-4">
        {video ? (
          <a
            href={video}
            className="font-medium text-blue-600 hover:underline"
          >
            Link
          </a>
        ) : null}
      </td>
      <td className="px-6 py-4">
        <a
          href={"http://www.ribbit.xyz/bms/score/view?p=1&md5=" + data.md5}
          className="font-medium text-blue-600 hover:underline"
        >
          Link
        </a>
      </td>
      <td className="px-6 py-4">
        <a
          href={"https://mocha-repository.info/song.php?sha256=" + data.sha256}
          className="font-medium text-blue-600 hover:underline"
        >
          Link
        </a>
      </td>
      <td className="px-6 py-4">
        <a
          href={
            "http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=" +
            data.md5
          }
        >
          {data.title}
        </a>
      </td>
      <td className="px-6 py-4">
        <a href={data.url}>{data.artist}</a>
      </td>
      <td className="px-6 py-4">
        <a href={data.url_diff}>{data.url_diff}</a>
      </td>
      <td className="px-6 py-4">{data.comment}</td>
    </tr>
  );
}

function TableData() {
  const fetchHeader = useFetchData("/table/header.json");
  const fetchScores = useFetchData("/table/score.json");
  if (fetchScores.isLoading || fetchHeader.isLoading)
    return (
      <tr className="bg-white">
        <td scope="row" colSpan="8" className="py-2">
          <Spinner />
        </td>
      </tr>
    );
  if (fetchScores.isError || fetchHeader.isError)
    return (
      <tr className="bg-white">
        <td scope="row" colSpan="8" className="text-center py-2">
          Error loading data
        </td>
      </tr>
    );

  const header = fetchHeader.data;
  let scores = fetchScores.data;
  scores = sortScores(header.level_order, scores);
  const subgroups = groupByLevel(scores);

  let data = [];
  for (const [key, scores] of Object.entries(subgroups)) {
    data.push(
      <LevelHeader
        symbol={header.symbol}
        level={key}
        numCharts={scores.length}
        key={key}
      />
    );
    for (const score of scores) {
      data.push(
        <ScoreEntry data={score} symbol={header.symbol} key={key + score.md5} />
      );
    }
  }

  return <>{data}</>;
}

export default function BmsTable() {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg mx-24 mb-4">
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
