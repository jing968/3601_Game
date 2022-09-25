import { useState, useEffect } from "react";

const useKeyPress = (desiredKey, handler) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === desiredKey) {
      setKeyPressed(true);
      handler();
    }
  };

  const upHandler = ({ key }) => {
    setKeyPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);
  return keyPressed;
};

export default useKeyPress;
