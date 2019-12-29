import React, {Component, FC} from "react";
import * as TodoStateAction from '../modules/todo/TodoState';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {TodoState, Todo} from "todo";
import TodoList from "../components/TodoList";
import Link from "next/link";

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
      <div>
        <h1>TODO APP</h1>
        <Link href="/create"><a>Create Todo</a></Link>
        <TodoList todo={this.state.todos}
                  onRemove={(todo) => this._removeTodo(todo.id)}
                  onUpdate={(todo) => this._updateTodo(todo)}
        />
      </div>
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
