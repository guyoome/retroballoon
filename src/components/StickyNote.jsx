import React, { useState, useEffect } from "react";
import { Group, Rect } from "react-konva";
import { EditableText } from "./EditableText";

const getStyle = (colour, selected, isHover, isDragged) => {
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
  if (selected || isDragged) {
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
    margintop: "-4px"
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
  const [isDragged, setIsDragged] = useState(false);

  useEffect(() => {
    if (!selected && isEditing) {
      setIsEditing(false);
    }
  }, [selected, isEditing]);

  function toggleEdit() {
    setIsEditing(!isEditing);
    onTextClick(!isEditing);
  }

  const style = getStyle(colour, selected, isHover, isDragged);
  return (
    <Group
      rotation={selected || isDragged ? 0 : -1}
      offsetX={(width + 40) / 2}
      offsetY={(height + 60) / 2}
      duration={1}
      draggable
      x={x}
      y={y}
      onClick={() => { onClick(); }}
      onTap={onClick}
      onDragStart={() => { setIsDragged(true) }}
      onDragEnd={() => { setIsDragged(false) }}
      onMouseEnter={() => { setIsHover(true); }}
      onMouseLeave={() => { setIsHover(false); }}>
      <Rect
        x={0}
        y={0}
        width={width + 40}
        height={height + 60}
        fill={colour}
        shadowColor="black"
        shadowOffsetY={0}
        shadowOffsetX={0}
        shadowBlur={30}
        shadowOpacity={0.2}
        perfectDrawEnabled={false}
      />
      <Rect
        {...style}
      />
      <EditableText
        x={16}
        y={32}
        text={text}
        width={width}
        height={height}
        isEditing={isEditing}
        onToggleEdit={toggleEdit}
        onChange={onTextChange}
      />
    </Group>
  );
}
