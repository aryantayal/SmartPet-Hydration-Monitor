import React from "react";
import cog from "./settings/cog.svg";
import "./settings/settings.scss";
// https://www.npmjs.com/package/react-rangeslider
// documentation for working with slider
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
// https://www.npmjs.com/package/react-select
// Support for dropdown menus
import Select from "react-select";
import { QR_API } from "../api/qrAPI";

const measureUnits = [
  { value: "Metric", label: "Metric" },
  { value: "Imperial", label: "Imperial" },
];

const clockSelect = [
  { value: "12hr", label: "12hr" },
  { value: "24hr", label: "24hr" },
];

const sliderMin = 200;
const sliderMax = 700;
const sliderStep = 50;

class Settings extends React.Component {
  //constructor(props, context) {
  // super(props, context);
  state = {
    message: "Settings: Fill Limit",
    volume: 0,
    tempVolume: 0,
    selectedUnit: null,
    selectedClock: null,
    selectedView: null,
    edit: false,
  };
  //}

  componentDidMount = () => {
    this.getData();
    console.log("Getting Data");
  };
  getData = async () => {
    const volume = await QR_API.getFillLimit();
    this.setState({volume, tempVolume: volume});
    //TODO call get fill limit
  };

  setDataCallback = (data) => {
    this.setState({ volume: data.volume, tempVolume: data.volume });
    this.setState({ edit: true });
  };

  sendZero = async () => {
    console.log("Sending Zero");
    document.getElementById("sending").style.display = "";
    const zeroing = await QR_API.sendZero({});
    document.getElementById("sending").style.display = "none";
    console.log("sent zero. Ack");
    //TODO call zeroing API
  };

  sendFillLimit = async () => {
    const { tempVolume } = this.state;
    console.log(tempVolume);
    const setFillLimit = await QR_API.setFillLimit({ tempVolume });

    //TODO call API set fill limit
  };

  handleUnit = (selectedUnit) => {
    this.setState({ selectedUnit });
  };
  handleClock = (selectedClock) => {
    this.setState({ selectedClock });
  };

  handleSlider = (value) => {
    this.sendFillLimit();
    this.setState({ volume: value });
  };
  updateTempVal = (value) => {
    this.setState({ tempVolume: value });
  };

  setDev = () => {
    this.setState({
      message: "We Will Add all Setting info here",
      selectedView: "deviceSettings",
    });
  };

  setWifi = () => {
    this.setState({
      message: "list of available wifi networks here",
      selectedView: "wifiSettings",
    });
  };

  setFill = () => {
    this.setState({
      message: "Enter Fill limit (ml)",
      selectedView: "fillSettings",
    });
  };

  setAbout = () => {
    this.setState({
      message: "WAACI Tech was developed in 2020 as a small tech startup...",
      selectedView: "aboutSettings",
    });
  };

  render() {
    let { volume } = this.setState;
    const { selectedOption } = this.state;
    return (
      <span>
        <div class="pill-nav">
          {/* <a href="#DevSetting" onClick={this.setDev}>
            Device Settings
          </a>
          <a href="#WIFI" onClick={this.setWifi}>
            WIFI
          </a>
          <a href="#SetLimit" onClick={this.setFill}>
            Fill Limit
          </a>
          <a href="#About" onClick={this.setAbout}>
            About
          </a> */}

          {/*This is the message at the top when the button is clicked*/}
   
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>

          <div class='margin'>
            <div>Fill Amount: {this.state.tempVolume}</div>
          <Slider
                  value={this.state.tempVolume}
                  orientation="horizontal"
                  onChange={this.updateTempVal}
                  onChangeComplete={this.handleSlider}
                  min={0}
                  max={450}
                  step={50}
                  //labels={(0, 100)}
                />
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <button value={0} style={{padding: "20px" }} onClick={this.sendZero}>
                  Zero Out Bowl
                </button>
                <p id="sending" style={{ display: "none" }}>
                  zeroing
                </p>
          </div>
           
          {/*This is where the conditional for the page and the component*/}
          <div>
           
            {this.state.selectedView === "deviceSettings" ? (
              <div>
                {/*Select the units of measurment*/}
                <Select
                  value={selectedOption}
                  onChange={this.handleUnit}
                  options={measureUnits}
                  placeholder={"Select Units"}
                  isDisabled={this.state.edit}
                />
                {/*Select 12 or 24 hour clock*/}
                <Select
                  value={selectedOption}
                  onChange={this.handleClock}
                  options={clockSelect}
                  placeholder={"Select 12hr or 24hr"}
                  isDisabled={this.state.edit}
                />
              </div>
            ) : this.state.selectedView === "wifiSettings" ? (
              <div>Wifi Settings module</div>
            ) : this.state.selectedView === "fillSettings" ? (
               <div className={this.state.edit }>
                <Slider
                  value={this.state.tempVolume}
                  orientation="horizontal"
                  onChange={this.updateTempVal}
                  onChangeComplete={this.handleSlider}
                  min={0}
                  max={450}
                  step={10}
                  //labels={(0, 100)}
                />
                <button value={0} style={{padding: "20px" }} onClick={this.sendZero}>
                  Zero Out Bowl
                </button>
                <p id="sending" style={{ display: "none", padding: "50px" }}>
                  zeroing
                </p>
              </div>
            ) : this.state.selectedView === "aboutSettings" ? (
              <div>About information</div>
            ) : null}
          </div>
        </div>
      </span>
    );
  }
}

export default Settings;

export const title = "Settings";
export const img = cog;
