import React, { useState, useEffect } from "react";
import { Group, Rect, Text } from "react-konva";
import { EditableText } from "./EditableText";

const charLimit = 50;

const getStyle = (color, selected, isHover, isDragged) => {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    x: 0,
    y: 0,
    width: 240,
    height: 260,
    fill: color.light,
    cornerRadius: 4,
    perfectDrawEnabled: false,
    strokeWidth: 4,
    stroke: color.light
  };
  if (isFirefox) {
    return baseStyle;
  }
  if (selected || isDragged) {
    return {
      ...baseStyle,
      stroke: color.primary,
      strokeWidth: 4
    }
  }
  if (isHover) {
    return {
      ...baseStyle,
      stroke: color.secondary,
      strokeWidth: 4
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
  width,
  height,
  selected,
  id,
  onTextClick
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
    onTextClick(!isEditing);
  }

  const style = getStyle(color, selected, isHover, isDragged);
  return (
    <Group
      id={id}
      rotation={selected || isDragged ? 0 : -1}
      offsetX={(width + 40) / 2}
      offsetY={(height + 60) / 2}
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
        width={width + 40}
        height={height + 60}
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
        width={width}
        height={height}
        isEditing={isEditing}
        onChange={(value) => { if (value.length <= charLimit) { setText(value) } }}
      />
      <Text
        x={16}
        y={height + 40 - 16}
        text={`${char}/${charLimit}`}
        fill="rgba(0,0,0,0.4)"
        fontFamily="sans-serif"
        fontSize={18}
        perfectDrawEnabled={false}
        width={width}
      />
    </Group>
  );
}
