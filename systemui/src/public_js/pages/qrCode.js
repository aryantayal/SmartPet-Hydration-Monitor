import React from "react";
import qrcode from "./qrcode/qrcode.png";
import Code from "qrcode.react";
import { QR_API } from "../api/qrAPI.js";

//const localIpUrl = require('local-ip-url');

//const ip = window.location.href;//localIpUrl('public', 'ipv4');
class QRCode extends React.Component {
  // updateIP=(ip)=>{
  //   this.props.data.ip = ip;
  // }
  constructor(props, context) {
    super(props, context);
    this.state = {
      url: "",
    };
  }

  componentDidMount() {
    this.getQRURL();
  }

  getQRURL = async () => {
    const url = await QR_API.getClientIP();
    this.setState({url: "http://"+url.ip});
    console.log(this.state.url);
  };

  render() {
    const styleObj = {
      fontSize: 20,
      color: "#4a54f1",
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#ADD8E6",
    };
    return (
      <span>
        <div class="margin">
          <p style={styleObj}>
            QR Code: To connect to the device. Scan this code with your camera
            app - Make sure you are on the same network
          </p>
          <div class="urlMargin">
            <Code
              value={this.state.url}
              size={300}
              bgColor="#ADD8E6"
              includeMargin
            />
          </div>
          
        </div>
      </span>
    );
  }
}

export default QRCode;

export const title = "QR Code";
export const img = qrcode;
