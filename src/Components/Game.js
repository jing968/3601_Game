import React, { useEffect, useState, useContext } from "react";
import useKeyPress from "../Hooks/useKeyPress";
import styled, { keyframes } from "styled-components";
import { GlobalVars } from "../Context";

const GameContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const fadeIn = keyframes`
  0%   {width: 0px; height: 0px; opacity: 1; display: flex;}
  100% {width: 200px; height: 200px; opacity: 0; display: none}
`;

const StartPrompt = styled.img`
  z-index: 20;
  opacity: 0;
  position: absolute;
  margin: auto;
  width: 200px;
  height: 200px;
  top: 30%;
  left: 50%;
  translate: -50%;
  animation: ${fadeIn} 2s linear;
`;

const GameBorder = styled.div`
  postion: absolute;
  background-color: black;
  width: 2.5%;
  height: 100%;
`;

const GameArea = styled.div`
  width: 95%;
  height: 100%;
  background-color: paleturquoise;
`;

const BackGround = styled.div`
  position: relative;
  width: 100%;
  top: 60vh;
  height: 40vh;
  background-color: black;
`;

const floating1 = keyframes`
  0%   {left: 20%;}
  50%  {left: 35%}
  100% {left: 20%;}
`;

const floating2 = keyframes`
  0%   {left: 40%;}
  25%  {left: 25%;}
  50%  {left: 40%;}
  75%  {left: 55%;}
  100%  {left: 40%;}
`;

const Cloud1 = styled.img`
  position: absolute;
  top: 10%;
  width: 200px;
  height: 80px;
  animation: ${floating1} 6s linear infinite;
`;

const Cloud2 = styled.img`
  position: absolute;
  top: 18%;
  width: 200px;
  height: 80px;
  animation: ${floating2} 6s linear infinite;
`;

const Gap = styled.div`
  position: relative;
  height: 40vh;
  background-color: paleturquoise;
  z-index: 2;
`;
var scoreLock = false;

const Game = ({}) => {
  const maxWidth = 120 * 3;
  const minWidth = 40;
  const context = useContext(GlobalVars);
  const [gameOver, setGameOver] = context.gameOver;
  const [score, setScore] = context.score;
  const [gOffsetX, setGOffsetX] = context.gOffsetX;
  const [gapWidth, setGapWidth] = context.gapWidth;
  const [offset, setOffset] = context.offset;
  const [gapLocation, setGapLocation] = useState(50);

  // Check if "gap" is off-screan
  // meaning we need to create a new gap
  useEffect(() => {
    let boxX = window.innerWidth * 0.8 - 20;
    if (offset <= 0 && boxX < gOffsetX && boxX > gOffsetX - gapWidth) {
      setGameOver((prev) => {
        return !prev;
      });
      return;
    }

    if (gOffsetX / (window.innerWidth + gapWidth) + 0.2 > 1 && !scoreLock) {
      // debugger
      incrementScore();
      scoreLock = true;
    } else if (gOffsetX - gapWidth > window.innerWidth && scoreLock) {
      scoreLock = false;
      let _gw = minWidth + Math.random() * maxWidth;
      console.log("重置");
      setGapWidth(_gw);
      setGOffsetX(0);
    }
  }, [gOffsetX, gapWidth, offset]);

  const incrementScore = () => {
    setScore((intial) => {
      return intial + 1;
    });
  };

  // Handler for useKeyPress hook
  const doMove = () => {
    console.log(gameOver);
    setGapLocation((intial) => {
      // incrementScore();
      // if (intial === 40) setGameOver(true);
      return intial - 1;
    });
  };

  // Handler for menu trigger
  const testGameOver = () => {
    setGameOver((prev) => {
      return !prev;
    });
  };

  // const handleMove = useKeyPress("ArrowRight", doMove);

  // Debug function REMOVE LATER
  // const handleGameOver = useKeyPress("ArrowUp", testGameOver);

  return (
    <GameContainer>
      {/* {handleMove} */}
      {/* {handleGameOver} */}
      <GameBorder />
      <GameArea>
        <Cloud1 src={require("../Assets/cloud.png")} />
        <Cloud2 src={require("../Assets/cloud.png")} />
        <StartPrompt src={require("./../Assets/gameover.png")} />
        <BackGround>
          <Gap
            style={{
              width: `${gapWidth}px`,
              left: `${window.innerWidth - gOffsetX}px`,
            }}
          ></Gap>
        </BackGround>
      </GameArea>
      <GameBorder />
    </GameContainer>
  );
};

export default Game;
