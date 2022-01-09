import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import { StickyNote } from "./StickyNote";

const WhiteBoard = () => {
  const [text, setText] = useState("Click to resize. Double click to edit.");
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [selected, setSelected] = useState();
  const [stickyNotes, setStickyNotes] = useState(["", "","",""]);

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
    >
      <Layer>
        {stickyNotes.map((stickyNote, id) => (
          <StickyNote
            key={id}
            id={`SN-${id}`}
            x={50}
            y={50}
            colour="#d2ebd3"
            // onTextChange={(value) => setText(value)}
            width={width}
            height={height}
            selected={selected === `SN-${id}` ? true : false}
            // selected={selected}
            // onClick={() => { setSelected(true); }}
            onTextClick={(newSelected) => { console.log("Text_selected!!") }}
          />
        )
        )}
      </Layer>
    </Stage>
  );
};

export default WhiteBoard;
