import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import { StickyNote } from "./StickyNote";
import COLORS from "../utils/colors.json";
import MOUSE from "../utils/cursor.json";

const WhiteBoard = ({ onZoom, scale, stageX, stageY, onDrag }) => {
  const [selected, setSelected] = useState();
  const [stickyNotes, setStickyNotes] = useState([]);
  const [cursor, setCursor] = useState("default");
  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);


  // handle auto resize of the stage
  React.useEffect(() => {
    function handleResize() {
      setStageWidth(window.innerWidth);
      setStageHeight(window.innerHeight);

    }

    window.addEventListener('resize', handleResize)
  })

  const selectStage = (e) => {
    console.log("select", e)
    var container = e.currentTarget.container();
    console.log("container", container)
    // make it focusable

    container.tabIndex = 1;
    // focus it
    // also stage will be in focus on its click
    container.focus();
  }

  const deleteStickyNote = () => {
    console.log("Suppr");
    const idToDelete = selected;
    console.log("idToDelete", idToDelete);
    if (idToDelete !== undefined) {
      stickyNotes.forEach(stickyNote => {
        console.log("stickyNote", stickyNote)
        if (stickyNote.id === idToDelete) {
          const index = stickyNotes.map(function (e) { return e.id; }).indexOf(idToDelete);
          console.log("index", index);
          const copyOfStickyNotes = stickyNotes;
          console.log("copyOfStickyNotes", copyOfStickyNotes);
          if (index > -1) {
            copyOfStickyNotes.splice(index, 1);
          }
          setStickyNotes(copyOfStickyNotes);
          setSelected();
        }
      });
    }
  }

  const uniqueID = () => {
    return Math.floor(Math.random() * Date.now())
  }

  return (
    <div id="container"
      onKeyDown={(e) => { if (e.key === "Delete") deleteStickyNote(e) }}>
      <Stage
        container='container'
        id="stage"
        style={{
          backgroundColor: "#e5e5e5", cursor: MOUSE[cursor]
        }}
        width={stageWidth}
        height={stageHeight}
        draggable
        scaleX={scale}
        scaleY={scale}
        x={stageX}
        y={stageY}
        onWheel={(e) => onZoom(e)}
        onDragStart={(e) => { if (e.currentTarget._id === e.target._id) { setCursor("grab"); } }}
        onDragEnd={(e) => { setCursor("default"); onDrag(e) }}
        onMouseDown={(e) => { if (e.currentTarget._id === e.target._id) { setCursor("grab") } }}
        onMouseUp={(e) => setCursor("default")}
        onClick={(e) => {
          selectStage(e)
          if (e.currentTarget._id === e.target._id) {
            setSelected();
          } else {
            setSelected(e.target.parent.attrs.id);
          }
        }}
        onDblClick={(e) => {
          if (e.currentTarget._id === e.target._id) {
            const mouse = e.target.getRelativePointerPosition();
            const stickyNoteId = uniqueID();
            setStickyNotes(stickyNotes.concat({
              x: mouse.x,
              y: mouse.y,
              id: `SN-${stickyNoteId}`
            }))
            setSelected(`SN-${stickyNoteId}`);
          }
        }}>
        <Layer>
          {stickyNotes.map((stickyNote, id) => (
            <StickyNote
              key={id}
              id={stickyNote.id}
              x={stickyNote.x}
              y={stickyNote.y}
              color={COLORS.blue}
              selected={selected === `${stickyNote.id}` ? true : false}
            />))}
        </Layer>
      </Stage>
    </div>
  );
};

export default WhiteBoard;
