import React from 'react';



export default class Accordian extends React.Component {
  constructor(props) {
      super(props);
      this.state={
        open: false,
        class: "section"
      }
  }


  handleClick(){
    if(this.state.open) {
      this.setState({
        open: false,
        class: "section"
      });
    }
    else{
      this.setState({
        open: true,
        class: "section open"
      });
    }
  }

  render() {
    return (
      <div className={this.state.class}>
        <button className = "toggleButton">toggle</button>
        <div className="sectionhead" onClick={this.handleClick.bind(this)}>{this.props.title}</div>
        <div className="articlewrap">
          <div className="article">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
};
