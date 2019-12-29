import thunk from "redux-thunk";
import TodoService from "../../services/TodoService";

export default thunk.withExtraArgument({
  repo: new TodoService()
})
