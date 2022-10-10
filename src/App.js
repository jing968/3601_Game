import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalVars } from "./Context";
// Importing customer moudles
import Game from "./Components/Game";
import Player from "./Components/Player";
import Menu from "./Components/Menu";
import Score from "./Components/Score";

const App = () => {
  const context = React.useContext(GlobalVars);
  const [gameOver] = context.gameOver;
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              {gameOver ? (
                <Menu />
              ) : (
                <>
                  <Game />
                  <Score />
                  <Player />{" "}
                </>
              )}
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;