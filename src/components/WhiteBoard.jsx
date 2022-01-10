import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import { StickyNote } from "./StickyNote";
import COLORS from "../utils/colors.json";

const WhiteBoard = () => {
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
