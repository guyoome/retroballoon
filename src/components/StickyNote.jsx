import React, { useState, useEffect } from "react";
import { Group, Rect } from "react-konva";
import { EditableText } from "./EditableText";

const getStyle = (colour, selected,isHover) => {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    x: 0,
    y: 0,
    width: 240,
    height: 260,
    fill: colour,
    cornerRadius: 4,
    perfectDrawEnabled: false,
    strokeWidth: 4,
    stroke: colour
  };
  if (isFirefox) {
    return baseStyle;
  }
  if (selected) {
    return {
      ...baseStyle,
      stroke: "#4caf50",
      strokeWidth: 4
    }
  }
  if (isHover) {
    return {
      ...baseStyle,
      stroke: "#a6d7a8",
      strokeWidth: 4
    }
  }
  return {
    ...baseStyle,
    // margintop: "-4px"
  };
}

export function StickyNote({
  colour,
  text,
  x,
  y,
  width,
  height,
  onClick,
  onTextResize,
  onTextChange,
  selected,
  onTextClick
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isHover, setIsHover] = useState(false);
  // const [isTransforming, setIsTransforming] = useState(false);

  useEffect(() => {
    if (!selected && isEditing) {
      setIsEditing(false);
    }
    // else if (!selected && isTransforming) {
    //   setIsTransforming(false);
    // }
  }, [selected, isEditing]);

  function toggleEdit() {
    setIsEditing(!isEditing);
    onTextClick(!isEditing);
  }

  // function toggleTransforming() {
  //   setIsTransforming(!isTransforming);
  //   onTextClick(!isTransforming);
  // }
  const style = getStyle(colour, selected, isHover);
  return (
    <Group
      x={x}
      y={y}
      onClick={onClick}
      onTap={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <Rect
        // {...style}
        // style={style}
        x={20}
        y={20}
        width={width}
        height={height + 40}
        fill={"red"}
        shadowColor="black"
        shadowOffsetY={10}
        shadowOffsetX={0}
        shadowBlur={30}
        shadowOpacity={0.6}
        perfectDrawEnabled={false}
      />
      <Rect
        {...style}

      // x={0}
      // y={0}
      // width={width + 40}
      // height={height + 60}
      // fill={colour}
      // perfectDrawEnabled={false}


      />
      <EditableText
        x={20}
        y={40}
        text={text}
        width={width}
        height={height}
        // onResize={onTextResize}
        isEditing={isEditing}
        // isTransforming={isTransforming}
        onToggleEdit={toggleEdit}
        // onToggleTransform={toggleTransforming}
        onChange={onTextChange}
      />
    </Group>
  );
}
