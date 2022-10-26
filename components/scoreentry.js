import { GrooveRadar } from "./radar";
import PopoverGraph from "./popover";

export default function ScoreEntry({ data, symbol }) {
  const video = data.video1
    ? "http://www.nicovideo.jp/watch/sm" + data.video1
    : data.video2
    ? "http://www.youtube.com/watch?v=" + data.video2
    : data.video3
    ? "http://vimeo.com/" + data.video3
    : null;
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
            target="_blank"
          >
            Lien
          </a>
        ) : null}
      </td>
      <td className="px-6 py-4">
        <a
          href={"http://www.ribbit.xyz/bms/score/view?p=1&md5=" + data.md5}
          className="font-medium text-blue-600 hover:underline"
          target="_blank"
        >
          Lien
        </a>
      </td>
      <td className="px-6 py-4">
        <PopoverGraph content={<GrooveRadar values={data.radar} />} />
      </td>
      <td className="px-6 py-4">
        <a
          href={
            "http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=" +
            data.md5
          }
          target="_blank"
        >
          {data.title}
        </a>
      </td>
      <td className="px-6 py-4">
        <a href={data.url} target="_blank">
          {data.artist}
        </a>
      </td>
      <td className="px-6 py-4">
        {data.url_diff ? (
          <a
            href={data.url_diff}
            className="font-medium text-blue-600 hover:underline"
            target="_blank"
          >
            Télécharger
          </a>
        ) : (
          "Inclue"
        )}
      </td>
      <td className="px-6 py-4">{data.comment}</td>
    </tr>
  );
}
