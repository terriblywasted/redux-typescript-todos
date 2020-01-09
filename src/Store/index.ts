import {
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import logger from 'redux-logger';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import todoReducer, {TodosDispatch} from './todosReducer';

const rootReducer = combineReducers({todos: todoReducer});
export type RootState = ReturnType<typeof rootReducer>;

export const useDispatch = () => useReduxDispatch<TodosDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default createStore(rootReducer, applyMiddleware(logger));
