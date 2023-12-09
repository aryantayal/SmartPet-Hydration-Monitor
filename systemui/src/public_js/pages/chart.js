/*
This one is used in the daily intake (Hourly)

*/

import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { QR_API } from "../api/qrAPI";
import { DOG_API } from "../api/dogAPI";
import dayjs from "dayjs";
import stc from "string-to-color";

let refresher = false;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfHours: 24,
      NonCummulativeData: {},
    };
  }
  getNumberOfHours = () => {
    const { numberOfHours } = this.state;
    return [...Array(numberOfHours).keys()].map((i) => {
      return dayjs()
        .subtract(numberOfHours - i-1, "hours")
        .format("hh a");
    });
  };

  compileData = async () => {
    const endDate = new Date(); //TODO convert to "new Date();" for both
    const startDate = endDate.setHours(endDate.getHours() - 24);

    let doggoStats = await QR_API.getTodayStats({ startDate, endDate });
    const labels = this.getNumberOfHours();

    doggoStats.forEach((value, key)=>{
      doggoStats[key].name = doggoStats[key].name.trim();
    });

    const noncommulativeDatasets = doggoStats.map((item) => ({
      label: item.name,
      backgroundColor: stc(item.name),
      fill: true,
      data: item.dailyWaterIntakes.reverse(),
    }));


    const NonCummulativeData = { labels, datasets: noncommulativeDatasets };
    this.setState({ NonCummulativeData });
  };

  componentDidMount = () => {
    this.compileData();
    if(!refresher){
      refresher = true;
      setTimeout(()=>{this.refresh()}, 2000);
    }
  };


  refresh = () => {
    this.compileData();
    console.log("refreshed");
    setTimeout(()=>{this.refresh();}, 2000);
  }


  componentDidUpdate =(state, props) =>{
    console.log(state);
    console.log(props);
  }
  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.NonCummulativeData}
          options={{
            title: {
              display: true,
              text: "Water Intake",
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "right",
            },
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Time",
                  },
                },
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Milliliters",
                  },
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
}

export default Chart;
