import React from 'react';


class Tab extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <div>
          {this.props.text}
        </div>
        <div>
        <img src={this.props.img?this.props.img:null} className="icon"/>
        </div>
      </div>
    );

  }
}


export default Tab;