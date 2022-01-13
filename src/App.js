import React, { useState, useEffect } from "react";
import './App.css';
import WhiteBoard from './components/WhiteBoard';
import { ToolBarLast } from './components/ToolBarLast';

function App() {
  const [scale, setScale] = useState(0.2);
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);

  const onZoom = (e) => {
    e.evt.preventDefault();
    
    if (Math.abs(e.evt.wheelDelta) < 120) {
      let posX = stageX;
      posX -= e.evt.deltaX * 2;
      setStageX(posX);

      let posY = stageY;
      posY -= e.evt.deltaY * 2;
      setStageY(posY)
    } else {

      const scaleBy = 1.06;

      const stage = e.target.getStage();
      const oldScale = stage.scaleX();
      const mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
      };

      let newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
      if (newScale > 1.8) {
        newScale = 1.8;
      } else if (newScale < 0.06) {
        newScale = 0.06;
      }
      stage.scale({ x: newScale, y: newScale });
      setScale(newScale);
      setStageX(-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale);
      setStageY(-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale);
    }
  }

  // Remove accessibility zoom (pinch + ctrl + wheel) - zoom on DOM element
  document.addEventListener('wheel', function (e) {
    e.preventDefault();
  }, { passive: false });

  return (
    <div className="App">
      <WhiteBoard onZoom={(e) => onZoom(e)} scale={scale} stageX={stageX} stageY={stageY} />
      <ToolBarLast scale={scale} />
    </div>
  );
}

export default App;
