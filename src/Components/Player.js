import React, { useState, useEffect } from "react";
import useKeyPress from "../Hooks/useKeyPress";
import styled from "styled-components";

const Player = ({}) => {
  const [jumping, setJumping] = useState(false);
  const [offset, setOffset] = useState(0);
  const [jumpSize, setJumpSize] = useState(10);

  // Listener for jumping triggers
  useEffect(() => {
    if (jumping) {
      // Use non-stats vars to save resouces
      var height = jumpSize;
      var decrementSize = height / 10;
      // Elevate player
      setOffset(height);
      // Define falling animation
      const jumpAnimation = () => {
        if (height !== 0) {
          setOffset(height);
          height -= decrementSize;
          setTimeout(() => {
            jumpAnimation();
          }, 60);
        } else {
          setJumping(false);
        }
      };
      // Start falling animation
      jumpAnimation();
    }
  }, [jumping]);

  // Handler for useKeyPress hook
  const doJump = () => {
    // Trigger jumpAnimation through useEffect hook
    if (!jumping) setJumping(true);
  };

  const handleJump = useKeyPress(" ", doJump);

  const PlayerUI = styled.div`
    position: relative;
    top: ${56 - offset}vh;
    left: 20%;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background-color: red;
    z-index: 5;
  `;
  return (
    <PlayerUI
      onClick={() => {
        function test() {
          console.log("6 seconds later");
        }
        setTimeout(test, 1000);
      }}
    >
      {handleJump}
    </PlayerUI>
  );
};

export default Player;
