import React from "react";
import Chart from "react-google-charts";
import { apiURL } from "../util/apiURL";

const API = apiURL();

export default function GuestStats(props) {
  const { result } = props;
  let frequencyObj = {
    1: 0,
    2: 0,
  };
  result.map((elem) => {
    frequencyObj[elem.severity]++;
  });
  const total = frequencyObj["1"] + frequencyObj["2"];
  return (
    <div>
      <div>
        <Chart
          width={"700px"}
          height={"300px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Severity", "Error", "Warning", "Combined Total"],
            ["", frequencyObj["2"], frequencyObj["1"], total],
          ]}
          options={{
            title: "Linter error/warning frequency chart",
            chartArea: { width: "50%" },
            colors: ["#b0120a", "#ffab91", "#faebd7"],
            hAxis: {
              title: "Frequency",
              minValue: 0,
            },
            vAxis: {
              title: "Severity",
            },
          }}
          // For tests
          rootProps={{ "data-testid": "4" }}
        />
      </div>
    </div>
  );
}
