import React, { useEffect, useState } from "react";
import useKeyPress from "../Hooks/useKeyPress";
import styled from "styled-components";

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
  background-color: yellow;
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

const Game = ({}) => {
  const maxWidth = 120;
  const minWidth = 40;
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

  // Handler for useKeyPress hook
  const doMove = () => {
    setGapLocation((intial) => {
      // Getting
      return intial - 1;
    });
  };

  const handleMove = useKeyPress("ArrowRight", doMove);

  const Gap = styled.div`
    position: relative;
    width: ${gapWidth}px;
    height: 40vh;
    left: ${gapLocation}%;
    background-color: white;
    z-index: 2;
  `;
  return (
    <GameContainer>
      {handleMove}
      <GameBorder />
      <GameArea>
        <BackGround>
          <Gap></Gap>
        </BackGround>
      </GameArea>
      <GameBorder />
    </GameContainer>
  );
};

export default Game;
