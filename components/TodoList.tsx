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
  const isOnEdit = (todo: Todo) => todo.id === editId && !todo.isDone;

  return (
    <>
      <ul>
        {todo.map(it => (
            <a key={it.id} onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              setEditId(it.id)
            }}>
              <li>
                <TodoListItem todo={it} onEditCommit={onUpdate} onClose={() => setEditId('')} editable={isOnEdit(it)}/>
                <button className="btn btn-trans" onTouchEnd={(e) => onRemove(it)} title="x">
                  <span className="fa fa-times-circle" />
                </button>
              </li>
            </a>
          )
        )}
      </ul>
      <style jsx>{`
         ul {
          list-style: none;
          margin: 0;
          padding: 0;
         }
         li {
           display: flex;
           flex-wrap: wrap;
            border-bottom: 1px solid rgba(0,0,0,0.33);
         }
         button {
          flex: 1
         }
         a {
          display: block;
         }
      `}</style>
    </>
  )
};

export default TodoList;
