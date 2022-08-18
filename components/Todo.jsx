import React, { useState } from "react";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Todo(props) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <div
      className="border-bottom p-1 py-2 fs-2 d-flex gap-2"
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <span
        className="me-auto"
        style={{ textDecoration: props.completed ? "line-through" : "none" }}
      >
        {props.name}
      </span>
      {isMouseOver && (
        <>
          <button className="btn btn-success" onClick={props.onMark}>
            <IconCheck />
          </button>
          <button className="btn btn-secondary" onClick={props.onClickUp}>
            <IconArrowUp />
          </button>
          <button className="btn btn-secondary" onClick={props.onClickDown}>
            <IconArrowDown />
          </button>
          <button className="btn btn-danger" onClick={props.onDelete}>
            <IconTrash />
          </button>
        </>
      )}
    </div>
  );
}
