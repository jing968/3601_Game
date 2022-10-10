import React, { useContext } from "react";
import { GlobalVars } from "../Context";
import styled from "styled-components";

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  border-radius: 20px;
  top: 45%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  height: 300px;
  width: 250px;
  border: 2px solid black;
  z-index: 10;
`;

const MenuTitle = styled.div`
  position: relative;
  display: flex;
  margin: auto;
  color: black;
`;

const MenuButton = styled.div`
  position: relative;
  margin: auto;
  margin-top: 20px;
  border-radius: 20px;
  border: 2px solid transparent;
  background-color: black;
  width: 180px;
  height: 25px;
  color: white;
  padding-top: 5px;
  text-align: center;
  font-weight: 800;
`;

const Menu = ({}) => {
  const context = useContext(GlobalVars);
  const [score, setScore] = context.score;
  const [gameOver, setGameOver] = context.gameOver;

  const VisibleMenu = () => {
    const handleRestart = () => {
      setGameOver((initial) => {
        return !initial;
      });
      setScore(-1);
    };

    return (
      <MenuWrapper>
        <MenuTitle>You Lost! Your score: {score}</MenuTitle>
        <MenuButton onClick={handleRestart}>Restart</MenuButton>
      </MenuWrapper>
    );
  };

  return gameOver ? <VisibleMenu /> : null;
};

export default Menu;
