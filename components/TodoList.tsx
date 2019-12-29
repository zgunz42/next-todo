import React, {FC, useState} from "react";
import {Todo} from "todo";
import TodoListItem from "./TodoListItem";

interface Props {
  todo: Todo[],
  onUpdate: (todo: Todo) => void,
  onRemove: (todo: Todo) => void,
}

const TodoList: FC<Props> = ({todo, onUpdate, onRemove}) => {
  const [editId, setEditId] = useState<string>();
  const isOnEdit = (todo: Todo) => todo.id === editId;

  return (
    <ul>
      {todo.map(it => (
        <a key={it.id} onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setEditId(it.id)
        }}>
          <li>
            <TodoListItem  todo={it} onEditCommit={onUpdate} onClose={() => setEditId('')} editable={isOnEdit(it)} />
            <button onTouchEnd={(e) => onRemove(it)} title="x">x</button>
          </li>
        </a>
        )
      )}
    </ul>
  )
};

export default TodoList;
