import React, { useState, useEffect } from "react";
import "./toolbar.css"
import CONSTANTS from "../utils/constants.json";

export function ToolBarFirst({
  scale
}) {
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const percent = Math.round(scale * 100 / 0.2);
    setZoom(percent);
  }, [scale]);

  return (
    <div className="tb-first">
      <div className="tb-group --col">
        <div className="tb-item --col tooltip">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none">
            <path d="M2 21.4V2.6C2 2.26863 2.26863 2 2.6 2H21.4C21.7314 2 22 2.26863 22 2.6V9.4C22 9.73137 21.7314 10 21.4 10H10.6C10.2686 10 10 10.2686 10 10.6V21.4C10 21.7314 9.73137 22 9.4 22H2.6C2.26863 22 2 21.7314 2 21.4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 10V7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 10V7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 16H7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 10H7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span class="tooltiptext">Build Mode</span>
        </div>
      </div>
      <div className="tb-group --col">
        <div className="tb-item --col tooltip">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M19.5027 9.96958C20.7073 10.4588 20.6154 12.1941 19.3658 12.5533L13.0605 14.3658L10.1807 20.2606C9.60996 21.4288 7.88499 21.218 7.6124 19.9468L4.67677 6.25646C4.44638 5.18204 5.5121 4.2878 6.53019 4.70126L19.5027 9.96958Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span class="tooltiptext">Move Tool</span>
        </div>
        <div className="tb-item --col tooltip">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none">
            <path d="M19 7V5L5 5V7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 5L12 19M12 19H10M12 19H14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span class="tooltiptext">Text Tool</span>
        </div>
        <div className="tb-item --col tooltip">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none">
            <path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 16L10 13L21 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8C18 9.10457 17.1046 10 16 10Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span class="tooltiptext">Insert Image</span>
        </div>
        <div className="tb-item --col tooltip">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none">
            <path d="M6 3L6 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 3L18 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 6L21 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 18L21 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
            <span class="tooltiptext">Zone Tool</span>
        </div>
      </div>
    </div>
  );
}
