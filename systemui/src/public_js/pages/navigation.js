import React from 'react';

import Tab from './nav/tab.js';
import "./nav/navigation.scss";

import * as DailyIntake from "./dailyIntake.js";
import * as Dashboard from "./dashboard.js";
import * as ManageDogs from "./dogManagement.js";
import * as QRCode from "./qrCode.js";
import * as Settings from "./settings.js";


let tabs = [
  DailyIntake,
  Dashboard, 
  ManageDogs,
  QRCode,
  Settings
];

class Navigation extends React.Component {

    
    generateTabs=()=>{
        let classValue = "unselectedTab";
        return tabs.map(tab=>{
            if(this.props.activeTab.title === tab.title){
                classValue = "selectedTab tab";
            }
            else{
                classValue = "unselectedTab tab";
            }

            return <div key={tab.title} onClick={this.props.setPage.bind(this, tab)} ><Tab text={tab.title} tab={tab} img={tab.img} className={classValue}/></div>
        });
    }
  

  render() {
    return (
      <div className="nav" id="nav">
        {this.generateTabs()}
      </div>
    );

  }
}


export default Navigation;