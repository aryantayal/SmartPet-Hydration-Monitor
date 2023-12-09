import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import { QR_API } from "../api/qrAPI";
import dayjs from "dayjs";
import stc from "string-to-color";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfDays: 7,
      CummulativeData: null,
      NonCummulativeData: null,
    };
  }
  sum = (array) => {
    const returnArray = [];
    var sum = 0;
    array.forEach((value) => {
      sum += parseInt(value);
      returnArray.push(sum);
    });
    console.log(returnArray);
    return returnArray;
  };

  getDaysOfWeek = () => {
    const { numberOfDays } = this.state;
    return [...Array(numberOfDays).keys()].map((i) => {
      return dayjs()
        .subtract(numberOfDays - i, "days")
        .format("ddd MM/DD");
    });
  };

  compileData = async () => {
    const { numberOfDays } = this.state;

    const dateFormat = "YYYY-MM-DD";
    const startDate = dayjs()
      .subtract(numberOfDays, "days")
      .startOf("day")
      .format(dateFormat);
    const endDate = dayjs().startOf("day").format(dateFormat);
    console.log("here");
    const doggoStats = await QR_API.getDoggoStats({ startDate, endDate });
    const cummulativeDatasets = doggoStats.map((item) => ({
      label: item.name,
      backgroundColor: stc(item.name),
      fill: false,
      data: this.sum(item.dailyWaterIntakes),
    }));
    const labels = this.getDaysOfWeek();
    const CummulativeData = { labels, datasets: cummulativeDatasets }; 
    const noncommulativeDatasets = doggoStats.map((item) => ({
      label: item.name,
      backgroundColor: stc(item.name),
      fill: false,
      data: item.dailyWaterIntakes,
    }));
    const NonCummulativeData = { labels, datasets: noncommulativeDatasets };
    this.setState({ CummulativeData, NonCummulativeData });
  };

  componentDidMount = () => {
    this.compileData();
  };
  setCummulative = () => {
    this.setState({
      //message: "We Will Add all Setting info here",
      selectedView: "C",
    });
  };

  setNonCummulative = () => {
    this.setState({
      //message: "list of available wifi networks here",
      selectedView: "Nc",
    });
  };

  render() {
    return (
      <span>
      <div class ="pill-nav">
        <a href="#Cummulative" onClick={this.setCummulative}>
            Cummulative Graph
          </a>
          <a href="#NonCummulative" onClick={this.setNonCummulative}>
            Non-cummulative Graph
          </a>
      </div>


      {/* <div className="chart">
        <Line
          data={this.state.CummulativeData}
          options={{
            title: {
              display: true,
              text: "Cummulative Water Intake",
              fontSize: 25,
            },
            legend: {
              display: false,
              position: "right",
            },
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Name",
                  },
                },
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Litters",
                  },
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
        <Bar
          data={this.state.NonCummulativeData}
          options={{
            title: {
              display: true,
              text: "Water Intake",
              fontSize: 25,
            },
            legend: {
              display: false,
              position: "right",
            },
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Name",
                  },
                },
              ],
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Litters",
                  },
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div> */}

      
           
           {this.state.selectedView === "C" ? (
             <div>
               <Line
          data={this.state.CummulativeData}
          options={{
            title: {
              display: true,
              text: "Cummulative Water Intake",
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
                    labelString: "Date",
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
           ) : this.state.selectedView === "Nc" ? (
             <div>
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
                       labelString: "Date",
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
             ) : null} 
      </span>
    );
  }
}

export default Graph;
