import React from 'react';
import {shallowEqual} from 'react-redux';
import * as RN from 'react-native';

import * as Util from '../utils';
import {useDispatch, useSelector} from '../Store';
import {Theme} from '../Store/todosReducer';
import api from '../Api';
import {Todo} from '../Api/models';

const Screen = () => {
  const [isLoading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  const todos = useSelector(state => state.todos.todos, shallowEqual);
  const theme = useSelector(state => state.todos.theme);

  const toggleTheme = () => dispatch({type: 'TOGGLE_THEME'});

  const toggleTodoCompleted = React.useCallback(
    (todo: Todo) => dispatch({type: 'TOGGLE_TODO_COMPLETED', todo}),
    [dispatch],
  );

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const todos = await api.loadTodos();
      dispatch({type: 'UPDATE_TODOS', todos});
    } catch (e) {
      console.warn(e);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchTodos();
  }, []);

  const completed = todos.filter(x => x.completed);
  const incompleted = todos.filter(x => !x.completed);
  const sorted = completed.concat(incompleted);

  return (
    <RN.SafeAreaView style={screenStyles.container}>
      <RN.TouchableOpacity
        style={screenStyles.toggleButton}
        onPress={toggleTheme}>
        <RN.Text style={screenStyles.toggleButtonText}>Toogle theme</RN.Text>
      </RN.TouchableOpacity>
      <RN.Text style={screenStyles.completedCountText}>
        Completed count: {completed.length}
      </RN.Text>
      <RN.Text style={screenStyles.incompletedCountText}>
        Incompleted count: {incompleted.length}
      </RN.Text>
      <RN.FlatList
        style={screenStyles.list}
        data={sorted}
        keyExtractor={item => String(item.id)}
        renderItem={({item: todo}) => (
          <TodoView
            toggleTodoCompleted={toggleTodoCompleted}
            theme={theme}
            todo={todo}
          />
        )}
        refreshControl={
          <RN.RefreshControl onRefresh={fetchTodos} refreshing={isLoading} />
        }
      />
    </RN.SafeAreaView>
  );
};

const screenStyles = RN.StyleSheet.create({
  container: {flex: 1},
  list: {flex: 1},
  toggleButton: {
    borderRadius: 4,
    margin: 24,
    padding: 8,
    backgroundColor: '#cae',
    alignSelf: 'stretch',
  },
  toggleButtonText: {
    textAlign: 'center',
  },
  completedCountText: {
    marginHorizontal: 24,
  },
  incompletedCountText: {
    margin: 24,
  },
});

interface TodoProps {
  theme: Theme;
  toggleTodoCompleted: (todo: Todo) => void;
  todo: Todo;
}

const TodoView = React.memo(({todo, theme, toggleTodoCompleted}: TodoProps) => (
  <RN.View
    style={[todoViewStyles.containerView, getTodoBackgroundStyle(theme)]}>
    <RN.Text style={todoViewStyles.titleText}>{todo.title}</RN.Text>
    <RN.Text
      style={[
        todoViewStyles.statusText,
        todo.completed
          ? todoViewStyles.statusText__completed
          : todoViewStyles.statusText__incompleted,
      ]}>
      {todo.completed ? 'Completed' : 'Not completed'}
    </RN.Text>
    <RN.TouchableOpacity
      style={[
        todoViewStyles.button,
        todo.completed
          ? todoViewStyles.button__completed
          : todoViewStyles.button__incompleted,
      ]}
      onPress={() => toggleTodoCompleted(todo)}>
      <RN.Text style={todoViewStyles.buttonText}>
        {todo.completed ? 'Uncomplete' : 'Complete'}
      </RN.Text>
    </RN.TouchableOpacity>
  </RN.View>
));

const getTodoBackgroundStyle = (theme: Theme) => {
  switch (theme) {
    case 'dark':
      return todoViewStyles.containerView__dark;
    case 'light':
      return todoViewStyles.containerView__light;
    default:
      return Util.shouldNeverHappen(theme);
  }
};

const todoViewStyles = RN.StyleSheet.create({
  containerView: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  containerView__dark: {
    backgroundColor: '#ECEFF1',
  },
  containerView__light: {
    backgroundColor: '#FFFFFF',
  },
  titleText: {fontSize: 18},
  statusText: {marginTop: 16, fontWeight: 'bold'},
  statusText__completed: {color: '#43A047'},
  statusText__incompleted: {color: '#FF5722'},
  button: {
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 3,
    marginTop: 16,
  },
  button__completed: {
    backgroundColor: '#FF5722',
  },
  button__incompleted: {
    backgroundColor: '#43A047',
  },
  buttonText: {color: 'white'},
});

export default Screen;
