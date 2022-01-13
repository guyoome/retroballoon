import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect, Group } from "react-konva";
import { StickyNote } from "./StickyNote";
import COLORS from "../utils/colors.json";

const WhiteBoard = ({ onZoom, scale, stageX, stageY }) => {
  const [selected, setSelected] = useState();
  const [stickyNotes, setStickyNotes] = useState([]);
  const [cursor, setCursor] = useState("default");

  return (
    <Stage
      id="stage"
      style={{ backgroundColor: "#eff3f6", cursor: cursor }}
      width={window.innerWidth}
      height={window.innerHeight}
      // draggable
      // scaleX={scale}
      // scaleY={scale}
      // x={stageX}
      // y={stageY}
      onWheel={(e) => onZoom(e)}

      // onTouchStart={()=>{console.log("hey")}}
      // onPointerMove={(e)=>{console.log("hey",e)}}
      onDragStart={(e) => { if (e.currentTarget._id === e.target._id) { setCursor("grabbing"); console.log("👻e", e) } }}
      onDragEnd={(e) => setCursor("default")}
      onMouseDown={(e) => { if (e.currentTarget._id === e.target._id) { setCursor("grabbing") } }}
      onMouseUp={(e) => setCursor("default")}
      onClick={(e) => {
        if (e.currentTarget._id === e.target._id) {
          setSelected();
        } else {
          setSelected(e.target.parent.attrs.id);
        }
      }}
      // onDblClick={(e) => {
      //   if (e.currentTarget._id === e.target._id) {
      //     const mouse = e.target.getRelativePointerPosition();
      //     setStickyNotes(stickyNotes.concat({
      //       x: mouse.x,
      //       y: mouse.y
      //     }))
      //     setSelected(`SN-${stickyNotes.length}`);
      //   }
      // }}
      >
      {/* <Group 
      scaleX={scale}
      scaleY={scale}
      x={stageX}
      y={stageY}> */}
        <Layer
        scaleX={scale}
        scaleY={scale}
        x={stageX}
        y={stageY}
        width={1000}
        height={1000}
        onDblClick={(e) => {
          console.log("ksdlskq")
          if (e.currentTarget._id === e.target._id) {
            const mouse = e.target.getRelativePointerPosition();
            setStickyNotes(stickyNotes.concat({
              x: mouse.x,
              y: mouse.y
            }))
            setSelected(`SN-${stickyNotes.length}`);
          }
        }}> 
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
      {/* </Group> */}
    </Stage>
  );
};

export default WhiteBoard;
