import useSWR from "swr";
import Spinner from "./spinner";
import LevelHeader from "./levelheader";
import ScoreEntry from "./scoreentry";

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

export default function TableData() {
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