import { useState, useEffect } from "react";

const useKeyPress = (desiredKey, handler,upHandler_) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === desiredKey) {
      setKeyPressed(true);
      if(handler){
        handler({key,value:'down'});
      }
    }
  };

  const upHandler = ({ key }) => {
    setKeyPressed(false);
    if(upHandler_){
      upHandler_({key,value:'up'})
    }
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
