import React, {Component, createRef} from 'react';
import TodoForm from "../components/TodoForm";
import {connect} from "react-redux";
import {TodoState} from "todo";
import {bindActionCreators} from "redux";
import * as TodoStateAction from "../modules/todo/TodoState";
import Link from "next/link";
import {withRouter} from "next/router";

class Create extends Component<any, any> {

  _addTodo = (todo) => this.props.todoStateAction
    .addTodo(todo)
    .then(
      this.props.router.push({
        pathname: '/'
      })
    );

  render() {
    return (
      <div>
        <Link href="/"><a>back</a></Link>
        <TodoForm onSubmit={todo => this._addTodo(todo)} />
      </div>
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
