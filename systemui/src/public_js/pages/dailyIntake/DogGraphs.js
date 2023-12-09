import React from 'react';
import "./doggoGraph.scss";


class DogGraph extends React.Component {

    generateDoggoGraph(){
        let overFlow = 0;
        let barHeight = 0.4;
        let emptyValue = 0;
        let barValue = (this.props.actualIntake/this.props.suggestedIntake);

        let valueContent = null;
        let overFlowContent = null;
        if(barValue > 1){
            barHeight = barHeight*barValue;
            overFlow = (barValue - 1)/barValue;
            barValue = 1/barValue;         
            overFlowContent = this.props.actualIntake;
        }
        else{
            emptyValue = 1 - barValue;   
            valueContent = this.props.actualIntake;
        }

        return(
            <div class="bar" style={{height: (barHeight*100)+"%", left: (this.props.offset+"%")}}>
                
                <div class="barOverload" style={{height: (overFlow*100)+"%"}}>
                  {overFlowContent}
                </div>
                <div class="emptySpace" style={{height: (emptyValue*100)+"%"}}>
                  <span class="dogName leftshift">{this.props.suggestedIntake}ml</span>
                </div>
                <div class="barValue" style={{height: (barValue*100)+"%"}}>
                  {valueContent}
                  <span class="dogName" style={{bottom: 0}}>{this.props.name}</span>
                </div>
            </div>
        )
    }


  render() {
    return (
      <span class="max series">
        {/* {this.generateDoggoGraph()} */}
      </span>
    );
  }
}

export default DogGraph;
