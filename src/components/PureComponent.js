import React from "react";
import moment from "moment";
import Drawer from "@material-ui/core/Drawer";

export default class PureComponent extends React.Component {
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
      <div>
        时间是：{this.state.date.toString()}
        <Child interval={this.state.interval}></Child>
        <Drawer></Drawer>
        {/* <Child2 interval={this.state.interval}></Child2> */}
        <Child2Memo interval={this.state.interval}></Child2Memo>
      </div>
    );
  }
}

//以下的 Child组件 每次都不会变化  但是 随着父组件的重新渲染  子组件也会重新渲染。 可以看到  render了 每秒都被打印一次
//当我们继承PureComponent 的话 就可以避免这个问题  我们可以看到  render了 只被打印了一次
class Child extends React.PureComponent {
  render() {
    console.log("render了");
    return <div>类组件--刷新间隔为：{this.props.interval}秒</div>;
  }
}

const Child2 = (props) => {
  console.log("函数组件render了");
  return <div>函数组件--刷新间隔为：{props.interval}秒</div>;
};
//React.memo 是针对 函数组件 优化了  避免重复渲染
const Child2Memo = React.memo(Child2);
