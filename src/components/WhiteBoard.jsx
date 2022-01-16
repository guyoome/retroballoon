import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { StickyNote } from "./StickyNote";
import COLORS from "../utils/colors.json";
import MOUSE from "../utils/cursor.json";

const WhiteBoard = ({ onZoom, scale, stageX, stageY }) => {
  const [selected, setSelected] = useState();
  const [stickyNotes, setStickyNotes] = useState([]);
  const [cursor, setCursor] = useState("default");
  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);


  // handle auto resize of the stage
  React.useEffect(() => {
    function handleResize() {
      setStageWidth(window.innerWidth);
      setStageHeight(window.innerHeight);

    }

    window.addEventListener('resize', handleResize)
  })

  return (
    <Stage
      id="stage"
      style={{
        backgroundColor: "#eff3f6", cursor: MOUSE[cursor]
      }}
      width={stageWidth}
      height={stageHeight}
      draggable
      scaleX={scale}
      scaleY={scale}
      x={stageX}
      y={stageY}
      onWheel={(e) => onZoom(e)}
      onDragStart={(e) => { if (e.currentTarget._id === e.target._id) { setCursor("grab");} }}
      onDragEnd={(e) => setCursor("default")}
      onMouseDown={(e) => { if (e.currentTarget._id === e.target._id) { setCursor("grab") } }}
      onMouseUp={(e) => setCursor("default")}
      onClick={(e) => {
        if (e.currentTarget._id === e.target._id) {
          setSelected();
        } else {
          setSelected(e.target.parent.attrs.id);
        }
      }}
      onDblClick={(e) => {
        if (e.currentTarget._id === e.target._id) {
          const mouse = e.target.getRelativePointerPosition();
          setStickyNotes(stickyNotes.concat({
            x: mouse.x,
            y: mouse.y
          }))
          setSelected(`SN-${stickyNotes.length}`);
        }
      }}>
      <Layer>
        {stickyNotes.map((stickyNote, id) => (
          <StickyNote
            key={id}
            id={`SN-${id}`}
            x={stickyNote.x}
            y={stickyNote.y}
            color={COLORS.blue}
            selected={selected === `SN-${id}` ? true : false}
          />
        )
        )}
      </Layer>
    </Stage>
  );
};

export default WhiteBoard;
