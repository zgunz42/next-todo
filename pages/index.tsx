import React, {Component, FC} from "react";
import * as TodoStateAction from '../modules/todo/TodoState';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {TodoState, Todo} from "todo";
import TodoList from "../components/TodoList";
import Link from "next/link";
import Head from "next/dist/next-server/lib/head";

class Home extends Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      todos: nextProps.todos,
    };
  }

  componentDidMount(): void {
    this.props.todoStateAction.loadTodo()
  }

  _removeTodo = (todo: string) => this.props.todoStateAction.removeTodo(todo);

  _updateTodo = (todo: Todo) => this.props.todoStateAction.updateTodo(todo);

  render() {
    return (
      <>
        <Head>
          <title>Todo App | Home</title>
        </Head>
        <div className="container">
          <style jsx>{`
          .placeholder {
            position: absolute;
            width: 100%;
            top: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
          <div className="box">
            <div className="box-header">
              <h2>TODO APP</h2>
            </div>
            <div className="box-body">
              {this.state.todos.length ? <TodoList todo={this.state.todos}
                                                   onRemove={(todo) => this._removeTodo(todo.id)}
                                                   onUpdate={(todo) => this._updateTodo(todo)}
              /> : <div className="placeholder">No Content</div>}
            </div>
            <div className="box-footer">
              <Link href="/create">
                <a className="btn btn-primary">Create Todo</a>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
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
) (Home)
