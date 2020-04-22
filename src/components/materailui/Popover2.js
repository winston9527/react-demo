import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Popper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElDelete, setAnchorElDelete] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickDelete = (event) => {
    console.log("点击触发", event.currentTarget, event);
    setAnchorElDelete(event.target);
  };

  const handleCloseDelete = () => {
    setAnchorElDelete(null);
  };

  const openDelete = Boolean(anchorElDelete);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const popoverRef = useRef(null);
  const popoverRefDelete = useRef(null);

  useEffect(() => {
    const handelEvent = (event) => {
      console.log("大框框", popoverRef.current);
      console.log("点击的是", event.target);
      if (!popoverRef.current || popoverRef.current.contains(event.target)) {
        return;
      } else {
        // console.log("删除框框", popoverRefDelete.current);
        // if (
        //   !popoverRefDelete.current ||
        //   popoverRefDelete.current.contains(event.target)
        // ) {
        //   return;
        // } else {
        //   handleCloseDelete();
        // }
        // handleClose();
      }
    };
    document.addEventListener("mousedown", handelEvent);

    return () => {
      document.removeEventListener("mousedown", handelEvent);
    };
  }, []);

  return (
    <div>
      <Button
        //aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Open Popover
      </Button>
      <Popover
        //id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        ref={popoverRef}
      >
        <div id="1222">
          <Typography className={classes.typography}>
            <span>The content of the Popover.</span>
            <br />
            <span>The content of the Popover.</span>
            <br />
            <span>The content of the Popover.</span>
            <br />
            <span>The content of the Popover.</span>
            <br />
            <span>The content of the Popover.</span>
            <br />
            </Typography>

            <div
              onClick={handleClickDelete}
              style={{
                width: "150px",
                height: "150px",
                backgroundColor: "#eee",
              }}
            >
              {/* //将事件绑定到Div上面 里面包含了多个按钮  点击任何按钮触发的时候 event里面的target 是当前点击的按钮   但是 currentTarget永远都是 div  */}
              <Button
                // aria-describedby={id}
                variant="contained"
                color="primary"
              >
                按钮1 点击删除
              </Button>
              <br />
              <Button
                // aria-describedby={id}
                variant="contained"
                color="primary"
              >
                按钮2 点击删除
              </Button>
            </div>
            <Popover
              //id={id}
              open={openDelete}
              anchorEl={anchorElDelete}
              onClose={handleCloseDelete}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              style={{zIndex:2001}}
            >
              <div id="shanchu" ref={popoverRefDelete}>
                <Typography className={classes.typography}>
                  你真的需要删除了吗   --  本demo  使用两个 Popover实现，导致 无法一次性关闭两个popver  需要点两次才行
                </Typography>
             </div>
            </Popover>
        </div>
      </Popover>
    </div>
  );
}
