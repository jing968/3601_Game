import React, { useState } from "react";

export const GlobalVars = React.createContext([{}, () => {}]);

const StoreProvider = ({ props }) => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const global = {
    gameOver: [gameOver, setGameOver],
    score: [score, setScore],
  };

  return <GlobalVars.Provider value={global}>{props}</GlobalVars.Provider>;
};

export default StoreProvider;
