import React from "react";
import Button from "@material-ui/core/Button";
import { Alert } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";

export default class RefComponent extends React.Component {
  constructor(props) {
    super(props);
    this.refEmail = React.createRef();
    this.refCom1 = React.createRef();
    this.forwardRefCom2 = React.createRef();
  }

  handelClick1 = () => {
    console.log("我的DOM原生组件", this.refs.name);
    console.log("原生组件获取输入框的值", this.refs.name.value);
  };

  handelClick2 = () => {
    console.log("我是自定义组件", this.refs.com1);
  };

  handelClick3 = () => {
    console.log("回调函数获取DOM组件", this.ageInputCallback);
    console.log("回调函数获取DOM组件的值", this.ageInputCallback.value);
    console.log("回调函数获取自定义组件", this.com1Callback);
  };

  handelClick4 = () => {
    console.log("createRef获取DOM组件", this.refEmail);
    console.log("createRef获取DOM组件的值", this.refEmail.current.value);
    console.log("createRef获取自定义组件", this.refCom1);
  };

  handelClick5 = () => {
    console.log("forwardRefCom2获取DOM组件", this.forwardRefCom2);
    console.log("forwardRefCom2获取DOM组件的值", this.forwardRefCom2.current.value);
    console.log("forwardRefCom2获取自定义组件", this.forwardRefCom2);
  };

  render = () => (
    <>
      <Alert severity="info">
        请打开<strong> 控制台 </strong>查看输出信息
      </Alert>

      <div>
        <label>
          name:<input ref="name" type="text" defaultValue="Tom"></input>
        </label>
        <p>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handelClick1}
          >
            String ref 获取原生Dom
          </Button>
        </p>
      </div>
      {/* 获取自定义组件 */}
      <div>
        <Com1 ref="com1"></Com1>
        <p>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handelClick2}
          >
            String ref获取 自定义组件
          </Button>
        </p>
      </div>
      {/* 回调函数获取值 */}
      <div>
        <label>
          age:
          <input
            ref={(input) => {
              this.ageInputCallback = input;
            }}
            type="text"
            defaultValue={12}
          ></input>
        </label>
        <Com1
          ref={(com1) => {
            this.com1Callback = com1;
          }}
        ></Com1>
        <p>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handelClick3}
          >
            回调函数方式
          </Button>
        </p>
      </div>
      {/* react 16.3 版本后新增React.createRef()方式来获取 */}

      <div>
        <label>
          email:
          <input
            ref={this.refEmail}
            type="text"
            defaultValue={"doudou@163.com"}
          ></input>
        </label>
        <Com1 ref={this.refCom1}></Com1>
        <p>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handelClick4}
          >
            createRef
          </Button>
        </p>
      </div>

      <Typography paragraph>
        String ref的方式 已经废弃，和createRef 一起还同时推出了forwardRef
        ,它可以用来获取function 组件或者HOC的子组件
      </Typography>

      <div>
        <Com2 ref={this.forwardRefCom2}></Com2>
        <p>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handelClick5}
          >
            forwardRefCom2
          </Button>
        </p>
      </div>
    </>
  );
}

class Com1 extends React.Component {
  render() {
    return <span>Com1</span>;
  }
}

const Com2 = React.forwardRef((props, ref) => {
  return (
    <>
      <span>
        Com2
        我是一个function组件，按理来说是不能使用ref的,但是通过React.forwardRef就可以拿到父组件
        中传入的 ref
      </span>
      mpbilePhone:<input ref={ref} defaultValue="15678762534"></input>
    </>
  );
});
