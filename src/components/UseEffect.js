import React, { useState, useEffect } from "react";

export default function UseEffect(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("初始化了");
    return unMount;
  }, [count, setCount]);

  const unMount = () => {
    console.log("unMount 执行了");
  };

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      当前值为：{count}
      <br/>
      <button onClick={handleClick}>点击+1</button>
    </div>
  );
}
