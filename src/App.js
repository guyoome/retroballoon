import React, { useState, useEffect } from "react";
import './App.css';
import WhiteBoard from './components/WhiteBoard';
import { ToolBarLast } from './components/ToolBarLast';

function App() {
  const [scale, setScale] = useState(0.3);
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);

  // useEffect(() => {
  //   try {

  //     var oldScale = stageX;
  //     const newScale = scale

  //     var center = {
  //       x: window.innerWidth / 2,
  //       y: window.innerHeight / 2,
  //     };

  //     var relatedTo = {
  //       x: (center.x - stageX) / oldScale,
  //       y: (center.y - stageY) / oldScale,
  //     };

  //     // var newScale =
  //     //   e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  //     // stage.scale({
  //     //   x: newScale,
  //     //   y: newScale
  //     // });

  //     var newPos = {
  //       x: center.x - relatedTo.x * newScale,
  //       y: center.y - relatedTo.y * newScale,
  //     };
  //     setStageX(newPos.x);
  //     setStageY(newPos.y);
  //   } catch (error) {

  //   }
  // }, [scale])

  const onZoom = (e) => {
    e.evt.preventDefault();
    // const scaleBy = 1.01;
    const scaleBy = 1.05;

    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    let newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    if (newScale > 1.8) {
      newScale = 1.8;
    } else if (newScale < 0.06) {
      newScale = 0.06;
    }
    stage.scale({ x: newScale, y: newScale });
    setScale(newScale);
    console.log("StageX:", stageX);
    console.log("StageX - calc", -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale)
    // console.log("🎉", -(window.innerWidth / 2 - stage.getPointerPosition().x / newScale) * newScale);
    console.log("🎉", stageX -(stageX / oldScale - stageX / newScale));
    // console.log("🎉", stageX / newScale );
    // const x = -rect.x * newScale + stageWidth / 2 - rectWidth / 2;

    console.log("StageY:", stageY);
    console.log("StageY - calc", -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale)
    setStageX(-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale);
    setStageY(-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale);
  }

  return (
    <div className="App">
      <WhiteBoard onZoom={(e) => onZoom(e)} scale={scale} stageX={stageX} stageY={stageY} />
      <ToolBarLast scale={scale} onZoom={(e) => { setScale(e) }} />
    </div>
  );
}

export default App;
