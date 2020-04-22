import React, { useState, useEffect, useRef } from "react";

function CountDown(num) {
  const [count, setCount] = useState(num);
  const ref = useRef();

  useEffect(() => {
      console.log(count,"执行了");
    ref.current = setInterval(() => {
        console.log("执行1次");
      setCount(count - 1);
    }, 1000);

    return clearCountDown;
  }, [count, setCount]);

  const clearCountDown = () => {
    console.log("回收1次");
    clearInterval(ref.current);
  };

  return [count, clearCountDown];
}


export default function CountDownDemo() {
  const [count, clearCountDown] = CountDown(20);

  return (
    <div>
      <span>倒计时测试</span>
      {count}
    </div>
  );
}
