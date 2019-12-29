import React, {createRef, FC, useState} from "react";
import {Todo} from "todo";
import {Formik, Form, Field, ErrorMessage, yupToFormErrors} from "formik";
import {AutoSave} from "./TodoForm";

interface Props {
  todo: Todo,
  editable: boolean,
  onClose: () => void,
  onEditCommit: (todo: Todo) => void
}

const TodoListItem: FC<Props> = ({todo, editable, onEditCommit, onClose}) => {
  return (
    <Formik initialValues={todo} onSubmit={(values, {setSubmitting}) => {
      onEditCommit(values);
      setSubmitting(false);
    }}>
      <Form onSubmit={(e) => {
        e.preventDefault();
        onClose();
      }}>
        <AutoSave debounceMs={300} />
        <Field onClick={e => e.stopPropagation()} type="checkbox" name="isDone" />
        {editable ? (<Field innerRef={(instance) => instance && instance.focus()} name="content" onBlur={onClose} />): (<div>{todo.content}</div>)}
      </Form>
    </Formik>
  )
};

export default TodoListItem;
