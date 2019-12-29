import {action, createAction, createAsyncAction, createReducer} from "typesafe-actions";
import {Todo, TodoState} from "todo";
import TodoService from "../../services/TodoService";

const initialState = {
  values: [],
  isLoading: true,
  error: '',
} as TodoState;

const _loadTodo = createAsyncAction(
  'TODO/REQUEST_ADD',
  'TODO/SUCCESS_ADD',
  'TODO/FAIL_ADD'
)<void, Todo[], string>();

export const loadTodo  = () => {
  return async (dispatch, getState, {repo}: {repo: TodoService}) => {
    dispatch(_loadTodo.request());
    try {
      let data = await repo.loadTodo();
      dispatch(_loadTodo.success(data));
    }catch (e) {
      dispatch(_loadTodo.failure(e))
    }
  }
};

export const toggleTodo = (todo: string) => {
  return async (dispatch, getState, {repo}: {repo: TodoService}) => {
    await repo.toggleTodo(todo);
    dispatch(loadTodo());
  }
};

export const updateTodo = (todo: Todo) => {
  return async (dispatch, getState, {repo}: {repo: TodoService}) => {
    await repo.updateTodo(todo.id, todo);
    dispatch(loadTodo());
  }
};

export const addTodo = (todo: Todo) => {
  return async (dispatch, getState, {repo}: {repo: TodoService}) => {
    await repo.addTodo(todo);
    dispatch(loadTodo())
  }
};

export const removeTodo = (todo: string) => {
  return async (dispatch, getState, {repo}: {repo: TodoService}) => {
    await repo.deleteTodo(todo);
    dispatch(loadTodo())
  }
};

const todoStateReducer = createReducer(initialState)
.handleAction(_loadTodo.request, state => ({...state, isLoading: true, error: ''} as TodoState))
.handleAction(_loadTodo.failure, (state, action) => ({...state, isLoading: true, error: action.payload} as TodoState))
.handleAction(_loadTodo.success, (state, action)=> ({...state, values: [...action.payload], isLoading: false} as TodoState));

export default todoStateReducer;
