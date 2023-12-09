import React from "react";
import dailyIntake from "./dailyIntake/dailyIntake.png";
import "./dailyIntake/doggoGraph.scss";
import Chart from "./chart";

class DailyIntake extends React.Component {
  render() {
    return (
        <Chart />
    );
  }
}

export default DailyIntake;

export const title = "Daily Intake";
export const img = dailyIntake;
