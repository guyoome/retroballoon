import React, { useState, useEffect } from "react";
import "./toolbar.css"
import CONSTANTS from "../utils/constants.json";

export function ToolBarLast({
  scale
}) {
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const percent = Math.round(scale * 100 / 0.3);
    setZoom(percent);
  }, [scale]);


  // const style = getStyle(color, selected, isHover, isDragged);
  return (
    <div className="tb-last">
      <div className="tb-group">
        <div className="tb-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none">
            <path d="M6 12H18" stroke="rgba(0,0,0,0.9)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="tb-item --2 --text">{zoom}%</div>
        <div className="tb-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none">
            <path d="M6 12H12M18 12H12M12 12V6M12 12V18" stroke="rgba(0,0,0,0.9)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
