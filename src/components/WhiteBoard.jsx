import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import { StickyNote } from "./StickyNote";
import COLORS from "../utils/colors.json";

const WhiteBoard = () => {
  const [text, setText] = useState("Click to resize. Double click to edit.");
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [selected, setSelected] = useState();
  const [stickyNotes, setStickyNotes] = useState([]);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={(e) => {
        if (e.currentTarget._id === e.target._id) {
          setSelected();
        } else {
          setSelected(e.target.parent.attrs.id);
        }
      }}
      onDblClick={(e) => {
        console.log("🦁", e)
        if (e.currentTarget._id === e.target._id) {
          setStickyNotes(stickyNotes.concat({
            x: e.evt.layerX,
            y: e.evt.layerY
          }))
          setSelected(`SN-${stickyNotes.length}`);
        }
      }}
    >
      <Layer>
        {stickyNotes.map((stickyNote, id) => (
          <StickyNote
            key={id}
            id={`SN-${id}`}
            // id={stickyNote.id}
            x={stickyNote.x}
            y={stickyNote.y}
            color={COLORS.blue}
            width={width}
            height={height}
            selected={selected === `SN-${id}` ? true : false}
            onTextClick={(newSelected) => { console.log("Text_selected!!") }}
          />
        )
        )}
      </Layer>
    </Stage>
  );
};

export default WhiteBoard;
