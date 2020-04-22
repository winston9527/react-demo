import React, { useState } from "react";
import moment from "moment";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { events } from "./events";
let allViews = Object.keys(Views).map((k) => Views[k]);

export default (props) => {
  const localizerHandler = () => {
    moment.locale("en", {
      week: {
        dow: 0,
      },
    });
    return momentLocalizer(moment);
  };

  const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        //设置单元格颜色
        backgroundColor: "white",
      },
    });

  /**************************************时间格式化处理************************************/
  const dateFtt = (fmt, date) => {
    //author: meizz
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  };

  const resources = [
    {
      resourceId: 1,
      name: "资源1",
    },
    {
      resourceId: 2,
      name: "资源2",
    },
  ];

  const [date, setDate] = useState(new Date(2020, 3, 17));
  const [view, setView] = useState("day");

  return (
    <div style={{ height: "600px" }}>
      <Calendar
        localizer={localizerHandler()}
        //日历上显示的事件
        events={events}
        //event的开始时间的字段名称  默认为 start  该字段的值  必须是 Date 类型
        startAccessor="startTime"
        //event的结束时间的字段名称  默认为 end  该字段的值  必须是 Date 类型
        endAccessor="endTime"
        //事件 的title 生成规则
        titleAccessor={(event) => `${event.title}--事件`}
        //资源列表  可以是包含任何属性的对象, 可以将event映射到一个指定的 resource上面
        //但是需要通过resourceIdAccessor 唯一标识 单个resource  并且可以通过resourceTitleAccessor 设置一个resource 的title
        resources={resources}
        //为每个resource 提供一个具有唯一性的值  可以是resource的属性 或者传入一个function
        resourceIdAccessor="resourceId"
        //返回event对象里面 标识 resource的id ，他应该能至少匹配到一个resource 否则的话 将不会显示到calendar
        resourceAccessor={(event) => event.resourceId}
        // 为resource 提供一个 普通人也能很好理解的title
        resourceTitleAccessor={({ name }) => {
          return <div title={name}>{name}</div>;
        }}
        //设置显示  哪些视图
        views={["day", "month"]}
        //默认打开视图
        view={view}
        onView={(currentView) => {
          setView(currentView);
        }}
        //允许选择day 和 week view的时间块  日志上面  可以选中 下拉 来选中一段时间
        selectable
        //设置 day 和 week 视图 的 每个格子代表的时间（单位  分钟） 默认值  30分钟
        step={15}
        //在calendar的明细 上面 显示 多天的event，默认为 false 所有的跨天event 将被显示到 calendar的 头部 的全天event的区域内
        showMultiDayTimes
        // 默认展示的日期  如果为空的话  就取 getNow的值  如果 getNow 为空的话  就取 当前系统时间
        defaultDate={new Date(2020, 3, 16)}
        //当前显示的日期  可以动态切换
        date={date}
        //日期导航事件
        onNavigate={(date) => {
          setDate(date);
        }}
        //控制 工具栏是否显示   ToDay  Nex  back 以及view 切换 等工具按钮
        toolbar={true}
        onDrillDown={(date, view) => {
          console.log(date, view);
        }}
        //A callback fired when a date selection is made. Only fires when selectable is true.
        //当在calendar 上面选择了一个时间片段后 触发的回调函数 ，只有当 selectable = true的时候 才触发
        //  触发类型  action: "select" | "click" | "doubleClick",
        onSelectSlot={(slotInfo) => {
          console.log("时间片段的信息", slotInfo);
        }}
        onSelectEvent={(event, e) => {
          console.log("选择了指定的事件 ", event, "触发行为", e);
        }}
        //调整  每个网格之间的  槽数量   比如  1AM 开始  到下一次 时间开始之前 显示几个格子，可以和 step配合使用
        timeslots={4}
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
        messages={{
          showMore: () => "点击更多-自定义",
        }}
      ></Calendar>
    </div>
  );
};
