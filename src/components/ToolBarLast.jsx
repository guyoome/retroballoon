import React, { useState, useEffect } from "react";
import "./toolbar.css"
import CONSTANTS from "../utils/constants.json";

export function ToolBarLast({
  scale
}) {
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const percent = Math.round(scale * 100 / 0.2);
    setZoom(percent);
  }, [scale]);

  return (
    <div className="tb-last">
      <div className="tb-group">
        <div className="tb-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none">
            <path d="M9 11H11M13 11H11M11 11V9M11 11V13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M16 16L20 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4 11C4 14.866 7.13401 18 11 18C12.9363 18 14.6891 17.2138 15.9563 15.9432C17.2192 14.6769 18 12.9296 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div className="tb-item --2 --text">{zoom}%</div>
        <div></div>
      </div>
    </div>
  );
}
