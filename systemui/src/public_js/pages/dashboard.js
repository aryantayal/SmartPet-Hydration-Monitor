import React from "react";
import graphimage from "./dashboard/graph.png";
import Graph from "./graph";

class Dashboard extends React.Component {
  render() {
    return (
      <span>
        <div>
          <Graph />
        </div>
      </span>
    );
  }
}

export default Dashboard;

export const title = "Graph";
export const img = graphimage;
