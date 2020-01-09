import React from 'react';
import {Provider} from 'react-redux';

import TodoListScreen from './Screen/TodoListScreen';
import store from './Store';

const App = () => {
  return (
    <Provider store={store}>
      <TodoListScreen />
    </Provider>
  );
};

export default App;
