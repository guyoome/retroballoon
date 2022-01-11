import React, { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import { StickyNote } from "./StickyNote";
import COLORS from "../utils/colors.json";

const WhiteBoard = ({ onZoom }) => {
  const [selected, setSelected] = useState();
  const [stickyNotes, setStickyNotes] = useState([]);
  const [stageScale, setStageScale] = useState(0.3);
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);
  const [handleWheel, setHandleWheel] = useState();

  useEffect(() => {
    try {
      handleWheel.evt.preventDefault();

      // const scaleBy = 1.01;
      const scaleBy = 1.05;

      const stage = handleWheel.target.getStage();
      const oldScale = stage.scaleX();
      const mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
      };

      let newScale = handleWheel.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      if (newScale > 1.8) {
        newScale = 1.8;
      } else if (newScale < 0.06) {
        newScale = 0.06;
      }

      stage.scale({ x: newScale, y: newScale });

      // this.setState({
      //   stageScale: newScale,
      //   stageX:
      //     -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      //   stageY:
      //     -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
      // });
      setStageScale(newScale);
      setStageX(-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale);
      setStageY(-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale);

    } catch (error) {

    }
  }, [handleWheel]);

  useEffect(() => {
    onZoom(stageScale)
  }, [stageScale]);

  return (
    <Stage
      style={{ backgroundColor: "#eff3f6" }}
      width={window.innerWidth}
      height={window.innerHeight}
      draggable
      scaleX={stageScale}
      scaleY={stageScale}
      x={stageX}
      y={stageY}
      onWheel={(e) => setHandleWheel(e)}
      onClick={(e) => {
        if (e.currentTarget._id === e.target._id) {
          setSelected();
        } else {
          setSelected(e.target.parent.attrs.id);
        }
      }}
      onDblClick={(e) => {
        console.log("🅱️", e.target.getRelativePointerPosition())
        console.log("🗻", e.evt.layerX, e.evt.layerY)
        if (e.currentTarget._id === e.target._id) {
          const mouse = e.target.getRelativePointerPosition();
          setStickyNotes(stickyNotes.concat({
            x: mouse.x,
            y: mouse.y
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
