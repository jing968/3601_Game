import React, { useState } from "react";

export const GlobalVars = React.createContext([{}, () => { }]);

const StoreProvider = ({ props }) => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gOffsetX, setGOffsetX] = useState(window.innerWidth/2);
  const [gapWidth, setGapWidth] = useState(50);
  window.gapWidth = gapWidth;
  const [offset, setOffset] = useState(0)
  const global = {
    gameOver: [gameOver, setGameOver],
    score: [score, setScore],
    gOffsetX: [gOffsetX, setGOffsetX],
    gapWidth:[gapWidth,setGapWidth],
    offset:[offset,setOffset]
  };

  return <GlobalVars.Provider value={global}>{props}</GlobalVars.Provider>;
};

export default StoreProvider;
