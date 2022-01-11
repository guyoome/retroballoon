import React, { useState, useEffect } from "react";
import './App.css';
import WhiteBoard from './components/WhiteBoard';
import { ToolBarLast } from './components/ToolBarLast';

function App() {
  const [scale, setScale]= useState(0.3);

  return (
    <div className="App">
      <WhiteBoard onZoom={(e) => setScale(e)} />
      <ToolBarLast scale={scale} />
    </div>
  );
}

export default App;
