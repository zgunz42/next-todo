import {Todo} from "todo";
import {Promise} from 'bluebird';
import {uuidv4} from "../utils";

class TodoService {
  _todo: Todo[] = [];

  addTodo = async (todo: Todo) => {
    await Promise.delay(200);
    if (!todo.content) {
      throw new Error('Content cant be empty')
    }
    todo.id = todo.id || uuidv4();
    todo.expiredDate = todo.expiredDate || new Date();
    this._todo.push(todo);
  };

  loadTodo = async () => {
    await Promise.delay(200);
    return this._todo
  };

  deleteTodo = async (todo: string) => {
    await Promise.delay(200);
    this._todo = this._todo.filter(it => it.id !== todo);

    return this._todo;
  };

  toggleTodo = (todo: string): Todo[] => {
    const target = this._todo.find(value => value.id === todo);
    if (!target) {
      throw new Error('Content cant be found')
    }

    target.isDone = !target.isDone;

    return this._todo;
  };

  updateTodo = (todo: string, data: Todo): Todo[] => {
    const target = this._todo.find(value => value.id === todo);
    if (!target) {
      throw new Error('Content cant be found')
    }

    target.content = data.content;
    target.expiredDate = data.expiredDate;
    target.isDone = data.isDone;

    return this._todo;
  }
}

export default TodoService;
