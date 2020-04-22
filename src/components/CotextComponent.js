import React from "react";
export default class CotextComponent extends React.Component {
  handelClick = () => {
    console.log(this.refs.name);
    console.log(this.refs.name.value);
  };

  render = () => (
    <div>
      CotextComponent
    </div>
  );
}
