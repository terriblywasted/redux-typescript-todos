import {Todo} from '../api/models';

export type Theme = 'light' | 'dark';

type TodosState = {
  todos: Todo[];
  theme: Theme;
};

const initialState: TodosState = {
  todos: [],
  theme: 'light',
};

type TOGGLE_THEME = {type: 'TOGGLE_THEME'};
type UPDATE_TODOS = {type: 'UPDATE_TODOS'; todos: Todo[]};
type TOGGLE_TODO_COMPLETED = {type: 'TOGGLE_TODO_COMPLETED'; todo: Todo};

export type TODO_ACTION = UPDATE_TODOS | TOGGLE_TODO_COMPLETED | TOGGLE_THEME;
export type TodosDispatch = <T>(action: TODO_ACTION) => T;

const todoReducer = (state: TodosState = initialState, action: TODO_ACTION) => {
  switch (action.type) {
    case 'UPDATE_TODOS':
      return {
        ...state,
        todos: action.todos,
      };
    case 'TOGGLE_TODO_COMPLETED':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.todo.id
            ? {...todo, completed: !todo.completed}
            : todo,
        ),
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme:
          state.theme === 'light' ? ('dark' as 'dark') : ('light' as 'light'),
      };
    default:
      return state;
  }
};

export default todoReducer;
