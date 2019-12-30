import React, {createRef, FC, useState} from "react";
import {Todo} from "todo";
import {Formik, Form, Field, ErrorMessage, yupToFormErrors} from "formik";
import {AutoSave} from "./TodoForm";
import {TodoSchema} from "../utils";

interface Props {
  todo: Todo,
  editable: boolean,
  onClose: () => void,
  onEditCommit: (todo: Todo) => void
}

const TodoListItem: FC<Props> = ({todo, editable, onEditCommit, onClose}) => {
  return (
    <Formik
      validationSchema={TodoSchema}
      initialValues={todo}
      onSubmit={(values, {setSubmitting}) => {
        onEditCommit(values);
        setSubmitting(false);
    }}>
      <Form style={{flex: 6}} onSubmit={(e) => {
        e.preventDefault();
        onClose();
      }}>
        <div className="todo">
          <div className="field-action">
            <Field id={todo.id} onClick={e => e.stopPropagation()} type="checkbox" name="isDone"/>
            <label onClick={e => e.stopPropagation()} htmlFor={todo.id}/>
          </div>
          <div className="field-container"> {editable ? (
            <Field style={{padding: 0, width: '100%'}} innerRef={(instance) => instance && instance.focus()} name="content" onBlur={onClose}/>) : (
            <p className={todo.isDone ? 'disabled' : null} >{todo.content}</p>)}
            <AutoSave debounceMs={300}/>
          </div>
        </div>
        <style jsx>{`
        .todo {
          display: flex;
        }
        .disabled {
          text-decoration: line-through;
          color: rgba(0,0,0,0.42);
        }
        .field-action {
          flex: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 1px solid rgba(0,0,0,0.33);
        }
        .field-container {
          flex: 6;
          margin: 8px;
          overflow: hidden;
        }
        p {
          padding: 0;
          margin: 0;
          width:100%;
        }
      `}</style>
      </Form>
    </Formik>
  )
};

export default TodoListItem;
