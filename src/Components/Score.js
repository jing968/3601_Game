import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalVars } from "../Context";

const Score = () => {
  const context = useContext(GlobalVars);
  const [score] = context.score;

  const ScoreContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 40px;
    font-size: 20px;
    font-weight: bold;
  `;

  return (
    <ScoreContainer>
      <p>Score: {score}</p>
    </ScoreContainer>
  );
};

export default Score;
