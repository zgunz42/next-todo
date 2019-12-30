import React, {Component, createRef} from 'react';
import TodoForm from "../components/TodoForm";
import {connect} from "react-redux";
import {TodoState} from "todo";
import {bindActionCreators} from "redux";
import * as TodoStateAction from "../modules/todo/TodoState";
import Link from "next/link";
import {withRouter} from "next/router";
import Head from "next/head";
import {ErrorMessage, Field, Form} from "formik";
import DatePickerField from "../components/DatePickerField";

import css from 'styled-jsx/css'

const form = css.resolve`
  form { 
    height: 100%;
    display: flex; 
    flex-direction: column;
  }
`;

class Create extends Component<any, any> {

  formRef = createRef<HTMLFormElement>();

  _addTodo = (todo) => this.props.todoStateAction
    .addTodo(todo)
    .then(
      this.props.router.push({
        pathname: '/'
      })
    );

  render() {
    return (
      <>
        <Head>
          <title>Create Todo</title>
        </Head>
        <div className="container">
          <style jsx>{`
            .fields {
              flex: 1;
              padding: 16px;
              padding-bottom: 60px;
            }
          `}</style>
          <div className="box">
            <div className="box-header">
              <Link href="/"><a title="back"><span className="fa fa-arrow-left"/></a></Link>
              <h2>ADD TODO</h2>
            </div>
            <TodoForm onSubmit={todo => {
              console.log(todo);
              return this._addTodo(todo)
            }}>
              {({values, setFieldValue, isSubmitting, handleSubmit }) => (
                <>
                  <div className="box-body">
                    <Form ref={this.formRef} className={form.className}>
                      <div className="fields">
                        <label>
                          <p>Think To Remember:</p>
                          <Field name="content"/>
                          <ErrorMessage name="content" component="p"/>
                        </label>
                        <label>
                          <p>Expired Date:</p>
                          <Field name="expiredDate">{DatePickerField}</Field>
                          <ErrorMessage name="expiredDate" component="p"/>
                        </label>
                      </div>
                    </Form>
                  </div>
                  <div className="box-footer">
                    <button className="btn btn-primary" type="submit" onClick={e => {
                      e.preventDefault();
                      handleSubmit();
                    }}>
                      Submit
                    </button>
                  </div>
                </>
                )}
            </TodoForm>
          </div>
          {form.styles}
          <style jsx>{`
            a {
              justify-content: center;
              align-items: center;
              display: flex;
              margin-right: 16px;
              text-decoration: none;
              color: #45a7ee;
            }
        `}</style>
        </div>
      </>
    );
  }
}

export default connect(
  (initialState: {todo: TodoState}) => ({
    todos: initialState.todo.values || []
  }),
  (dispatch, ownProps) => {
    return ({
      todoStateAction: bindActionCreators(TodoStateAction, dispatch)
    })
  }
) (withRouter(Create));
