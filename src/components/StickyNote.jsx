import React, { useState, useEffect } from "react";
import { Group, Rect, Text } from "react-konva";
import { EditableText } from "./EditableText";

import CONSTANTS from "../utils/constants.json";

const getStyle = (color, selected, isHover, isDragged) => {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    x: 0,
    y: 0,
    width: CONSTANTS.stickyNote.width + 40,
    height: CONSTANTS.stickyNote.height + 60,
    fill: color.light,
    cornerRadius: CONSTANTS.stickyNote.cornerRadius,
    perfectDrawEnabled: false,
    strokeWidth: CONSTANTS.stickyNote.strokeWidth,
    stroke: color.light
  };
  if (isFirefox) {
    return baseStyle;
  }
  if (selected || isDragged) {
    return {
      ...baseStyle,
      stroke: color.primary
    }
  }
  if (isHover) {
    return {
      ...baseStyle,
      stroke: color.secondary
    }
  }
  return {
    ...baseStyle,
    margintop: "-4px"
  };
}

export function StickyNote({
  color,
  x,
  y,
  selected,
  id
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isDragged, setIsDragged] = useState(false);
  const [text, setText] = useState("");
  const [char, setChar] = useState(0);

  useEffect(() => {
    setIsEditing(true);
  }, []);

  useEffect(() => {
    if (!selected && isEditing) {
      setIsEditing(false);
    }
  }, [selected, isEditing]);

  useEffect(() => {
    setChar(text.length)
  }, [text]);

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  const style = getStyle(color, selected, isHover, isDragged);
  return (
    <Group
      id={id}
      rotation={selected || isDragged ? 0 : -1}
      offsetX={(CONSTANTS.stickyNote.width + 40) / 2}
      offsetY={(CONSTANTS.stickyNote.height + 60) / 2}
      duration={1}
      draggable
      x={x}
      y={y}
      onClick={(e) => { e.target.parent.moveToTop(); }}
      onDblClick={() => { toggleEdit() }}
      onDragStart={(e) => { setIsDragged(true); e.target.moveToTop() }}
      onDragEnd={() => { setIsDragged(false) }}
      onMouseEnter={() => { setIsHover(true); }}
      onMouseLeave={() => { setIsHover(false); }}
      onMouseDown={(e) => { setIsDragged(true); e.target.parent.moveToTop(); }}
      onMouseUp={(e) => { setIsDragged(false); }}
    >

      <Rect
        x={0}
        y={0}
        width={CONSTANTS.stickyNote.width + 40}
        height={CONSTANTS.stickyNote.height + 60}
        fill={color.light}
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
        width={CONSTANTS.stickyNote.width}
        height={CONSTANTS.stickyNote.height}
        isEditing={isEditing}
        onChange={(value) => { if (value.length <= CONSTANTS.stickyNote.charLimit) { setText(value) } }}
      />
      {selected &&
        <Text
          x={16}
          y={CONSTANTS.stickyNote.height + 40 - 16}
          text={`${char}/${CONSTANTS.stickyNote.charLimit}`}
          fill="rgba(0,0,0,0.4)"
          fontFamily="Poppins"
          fontSize={18}
          perfectDrawEnabled={false}
          width={CONSTANTS.stickyNote.width}
        />
      }
    </Group>
  );
}
