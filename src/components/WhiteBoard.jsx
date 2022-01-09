import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import { StickyNote } from "./StickyNote";

const WhiteBoard = () => {
  const [text, setText] = useState("Click to resize. Double click to edit.");
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [selected, setSelected] = useState(false);


  console.log("👻 selected:",selected)
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={(e) => {
        if (e.currentTarget._id === e.target._id) {
          setSelected(false);
          console.log("turn false")
        }
      }}
    >
      <Layer>
        <StickyNote
          text={text}
          x={50}
          y={50}
          colour="#d2ebd3"
          onTextChange={(value) => setText(value)}
          width={width}
          height={height}
          selected={selected}
          // onTextResize={(newWidth, newHeight) => {
          //   setWidth(newWidth);
          //   setHeight(newHeight);
          // }}
          onClick={() => {
            // setSelected(!selected);
            setSelected(true);

            console.log("selected!!")
          }}
          onTextClick={(newSelected) => {
            // setSelected(newSelected);
            console.log("Text_selected!!")
          }}
        />
      </Layer>
    </Stage>
  );
};

export default WhiteBoard;
