import React from "react";
import Navigation from "./public_js/pages/navigation.js";
import * as DailyIntake from "./public_js/pages/dailyIntake.js";
import "./App.scss";

class App extends React.Component {
  state = {
    Tab: DailyIntake,
    data: {},
  };

  setPage = (newTab) => {
    this.setState({ Tab: newTab });
  };

  render() {
    return (
      <div className="App">
        <Navigation setPage={this.setPage} activeTab={this.state.Tab} />
        <span className="page" id="page">
          <this.state.Tab.default />
        </span>
      </div>
    );
  }
}

export default App;
