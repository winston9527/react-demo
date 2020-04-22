import React from "react";
import moment from "moment";

export default class RenderProps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: 1,
      date: moment(),
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ date: moment() });
    }, this.state.interval * 1000);
  }

  render() {
    return (
      <>
        <span>props</span>
        <Mouse render={Cat}></Mouse>
      </>
    );
  }
}

class Mouse extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  handleMouseMove = (event) =>
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });

  render() {
    console.log("渲染了");
    return (
      <>
      <div
        style={{ minHeight: "600px", width: "100%", backgroundColor: "yellow" }}
        onMouseMove={this.handleMouseMove}
      >
        <span>{`x是${this.state.x}  y是${this.state.y}`}</span>
        
      </div>
      {this.props.render(this.state)}
      </>
    );
  }
}

const Cat = (props) => {
  return (
    <div
      style={{
        backgroundColor: "green",
        position: "absolute",
        left: props.x + 10,
        top: props.y + 10,
        height: "25px",
        width: "25px",
      }}
    >
      Cat
    </div>
  );
};
