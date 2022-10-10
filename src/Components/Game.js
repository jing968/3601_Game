import React, { useEffect, useState, useContext } from "react";
import useKeyPress from "../Hooks/useKeyPress";
import styled from "styled-components";
import { GlobalVars } from "../Context";

const GameContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: white;
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
  background-color: transparent;
`;

const BackGround = styled.div`
  position: relative;
  width: 100%;
  top: 60vh;
  height: 40vh;
  background-color: black;
`;

const Gap = styled.div`
  position: relative;
  height: 40vh;
  background-color: white;
  z-index: 2;
`;

const Game = ({}) => {
  const maxWidth = 120;
  const minWidth = 40;
  const context = useContext(GlobalVars);
  const [gameOver, setGameOver] = context.gameOver;
  const [score, setScore] = context.score;
  const [gapWidth, setGapWidth] = useState(50);
  const [gapLocation, setGapLocation] = useState(50);

  // Check if "gap" is off-screan
  // meaning we need to create a new gap
  useEffect(() => {
    if (gapLocation === 0) {
      setGapWidth(() => {
        // Randomised gapWidth
        const newWidth = Math.random() * (maxWidth - minWidth) + minWidth;

        // Calc new gap location according to newWidth to fit in screen size
        //const newGapLocation = `98% - ${newWidth}px`;

        // Set new gap location
        setGapLocation(90);

        // Set new gap width
        return newWidth;
      });
    }
  }, [gapLocation]);

  const incrementScore = () => {
    setScore((intial) => {
      return intial + 1;
    });
  };

  // Handler for useKeyPress hook
  const doMove = () => {
    console.log(gameOver);
    setGapLocation((intial) => {
      incrementScore();
      if (intial === 40) setGameOver(true);
      return intial - 1;
    });
  };

  // Handler for menu trigger
  const testGameOver = () => {
    setGameOver((prev) => {
      return !prev;
    });
  };

  const handleMove = useKeyPress("ArrowRight", doMove);

  // Debug function REMOVE LATER
  const handleGameOver = useKeyPress("ArrowUp", testGameOver);

  return (
    <GameContainer>
      {handleMove}
      {handleGameOver}
      <GameBorder />
      <GameArea>
        <BackGround>
          <Gap
            style={{
              width: `${gapWidth}px`,
              left: `${gapLocation}%`,
            }}
          ></Gap>
        </BackGround>
      </GameArea>
      <GameBorder />
    </GameContainer>
  );
};

export default Game;
