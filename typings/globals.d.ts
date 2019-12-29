declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare module 'todo' {
  export type Todo = {
    id: string,
    content: string,
    isDone: boolean,
    expiredDate: Date,
  }

  export type TodoState = {
    values: Todo[],
    isLoading: boolean,
    error: string,
  }
}

declare var __DEV__: any;
declare var window: Window;
