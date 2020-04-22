import RefComponent from "../components/RefComponent";
import CotextComponent from "../components/CotextComponent";
import PureComponent from "../components/PureComponent";
import RenderProps from "../components/RenderProps";
import Basic from "../components/Calendar/BigCalendar/Basic";
import UseEffect from "../components/UseEffect";

import CountDownDemo from "../components/CountDown";
import SimplePopover from "../components/materailui/Popover2";

const routers = [
  { title: "Ref", url: "ref", component: RefComponent },
  { title: "Context", url: "context", component: CotextComponent },
  { title: "PureComponent", url: "pure", component: PureComponent },
  { title: "RenderProps", url: "renderProps", component: RenderProps },
  { title: "RenderProps", url: "renderProps", component: RenderProps },
  { title: "BasicCalendar", url: "basic", component: Basic },
  { title: "CountDownDemo", url: "countDownDemo", component: CountDownDemo },
  { title: "UseEffect", url: "useEffect", component: UseEffect },
  { title: "SimplePopover", url: "simplePopover", component: SimplePopover },
];
export default routers;
