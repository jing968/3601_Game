import React, { useState, useEffect, useContext } from "react";
import useKeyPress from "../Hooks/useKeyPress";
import styled from "styled-components";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { GlobalVars } from "../Context";

const PlayerObj = styled.div`
  position: relative;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  background-color: transparent;
  z-index: 5;
`;

const PlayerUI = styled.img`
  width: 120%;
  height: 120%;
  transform: scaleX(-1);
`;

var Power = 0,
  PowerTimestamp = 0;
//当前的玩家状态 0 无状态 1 蓄力 2 跳跃中
var PlayerState = 0;
//蓄力时间最长为3秒
const MaxPower = 10000;

const Player = ({}) => {
  const [jumping, setJumping] = useState(false);
  const [jumpSize, setJumpSize] = useState(50);
  var [pheight, setPHeight] = useState(40);
  // var [gOffsetX,setOffsetX] = useState(window.innerWidth/2);
  var context = useContext(GlobalVars);
  const [gOffsetX, setGOffsetX] = context.gOffsetX;
  const [gapWidth, setGapWidth] = context.gapWidth;
  const [offset, setOffset] = context.offset;

  // Listener for jumping triggers
  useEffect(() => {}, [jumping, gapWidth]);

  // Handler for useKeyPress hook
  const doJump = (r) => {
    console.log(r);
    // Trigger jumpAnimation through useEffect hook
    if (!jumping) setJumping(true);
  };

  //没像素需要消耗的能量
  const powerPrePx = 20;
  var _gOffsetX = gOffsetX;
  //动画执行
  const invokeAnimation = () => {
    //假定动画在2s内执行完毕
    // 1.记录动画的启动时间
    // 2.计算离动画的上一次执行过了多久
    // 3.根据时间间隔计算偏移量
    // 向上的一个运加速运动,像右是一个匀速运动 设定动作的初始化为 y = 0,x = Power/ 2000
    console.log(PlayerState);
    if (PlayerState !== 1) {
      return;
    }
    PlayerState = 2;
    let lastOffsetX = _gOffsetX;
    let lastTimestamp = Date.now();
    let k = jumpSize + (3 * jumpSize * Power) / MaxPower;
    let timer = (1500 * Power) / MaxPower + 500;
    let intervalID = setInterval(() => {
      let ti = Date.now();
      ti = ti - lastTimestamp;
      console.log(ti);
      lastTimestamp += ti;
      if (_gOffsetX - lastOffsetX >= Power / powerPrePx) {
        lastTimestamp = null;
        PlayerState = 0;
        clearInterval(intervalID);
        intervalID = null;
        return;
      }

      let c = ((ti / timer) * Power) / powerPrePx;
      // ti/timer
      // setOffsetX(c + gOffsetX);
      _gOffsetX += c;
      setGOffsetX(function (gOffsetX) {
        return c + gOffsetX;
      });
      let h = Power / powerPrePx / 2;
      let x = _gOffsetX - lastOffsetX;
      let y = (-k / Math.pow(h, 2)) * Math.pow(x - h, 2) + k;
      if (y < 0) {
        y = 0;
      }
      setOffset(y);
      // let d = gOffsetX - (lastOffsetX / Power/powerPrePx)* jumpSize
      // Power/timer
    }, 60);
    return intervalID;
  };

  //蓄力
  /**
   * 监听蓄力开始
   */
  const doReadyDown = (e) => {
    console.log(e, PowerTimestamp, PlayerState, pheight);
    if (PlayerState == 2) {
      return;
    }
    //重置power
    if (!PowerTimestamp) {
      if (PlayerState) {
        return;
      }
      PowerTimestamp = Date.now();
      Power = 0;
      PlayerState = 1;
      return;
    }
    if (PlayerState !== 1) {
      return;
    }
    Power += Date.now() - PowerTimestamp;

    if (Power > MaxPower) {
      Power = MaxPower;
    }
    setPHeight(26 + ~~(14 * (1 - Power / MaxPower)).toFixed(0));
    console.log(`蓄力中 ${Power} ....`);
  };
  /**
   * 监听蓄力结束
   */
  const doReadyUp = (e) => {
    if (PlayerState == 2) {
      return;
    }
    console.log(e);
    console.log(`蓄力结束 当前能量:${Power}`);
    PowerTimestamp = 0;
    PlayerState = 1;
    setPHeight(40);
    // if (!jumping) setJumping(true);
    invokeAnimation();
  };

  const handleJump = useKeyPress("a", doReadyDown, doReadyUp);

  return (
    <PlayerObj
      style={{
        top: `calc(60vh - ${pheight}px - ${offset}px)`,
        height: `${pheight}px`,
        left: `20vw`,
      }}
      onClick={() => {
        function test() {
          console.log("6 seconds later");
        }
        setTimeout(test, 1000);
      }}
    >
      {handleJump}
      <PlayerUI src={require("./../Assets/player.png")} />
    </PlayerObj>
  );
};

export default Player;
