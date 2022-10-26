import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export function GrooveRadar({ values }) {
  const data = {
    labels: [
      "darquesabouneness",
      "(^^)",
      "mesure mystère",
      "moker",
      "cuteness",
    ],
    datasets: [
      {
        label: "Level",
        data: values && values.length === 5 ? values : [0, 0, 0, 0, 0],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          display: false,
        },
      },
    },
  };
  return <Radar data={data} options={options} />;
}
