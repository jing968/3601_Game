import React, { useContext } from "react";
import { GlobalVars } from "../Context";
import styled from "styled-components";
import Score from "./Score";

const Menu = ({}) => {
  const context = useContext(GlobalVars);
  const [score, setScore] = context.score;
  const [gameOver, setGameOver] = context.gameOver;

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
    border: 2px solid blue;
    z-index: 10;
  `;

  const MenuTitle = styled.div`
    position: relative;
    display: flex;
    margin: auto;
    color: blue;
  `;

  const MenuButton = styled.div`
    position: relative;
    margin: auto;
    margin-top: 20px;
    border-radius: 20px;
    border: 2px solid transparent;
    background-color: blue;
    width: 180px;
    height: 25px;
    color: white;
    padding-top: 5px;
    text-align: center;
    font-weight: 800;
  `;

  const VisibleMenu = () => {
    const handleRestart = () => {
      setGameOver(false);
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
