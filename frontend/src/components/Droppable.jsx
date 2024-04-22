import React from "react";
import { useDroppable } from "@dnd-kit/core";
import "./Droppable.css";

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} className="droppable">
      {props.children}
    </div>
  );
}
