import ChangelogEntry from "./changelogentry";
import useFetchData from "../utils/fetchdata";
import Spinner from "./spinner";

export default function Changelog() {
  const fetchChangelog = useFetchData("/table/changelog.json");
  if (fetchChangelog.isLoading)
    return (
      <div className="mb-10 ml-4">
        <Spinner />
      </div>
    );
  if (fetchChangelog.isError)
    return <div className="mb-10 ml-4 text-center">Error loading data</div>;
  let changelogEntries = fetchChangelog.data;

  let data = [];
  for (const changelogEntry of changelogEntries) {
    data.push(
      <ChangelogEntry
        date={changelogEntry.date}
        title={changelogEntry.title}
        description={changelogEntry.description}
        key={Math.random()}
      />
    );
  }
  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {data}
    </ol>
  );
}
