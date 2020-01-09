import * as t from 'io-ts';
import * as Util from '../utils';
import {IOTodo} from './models';

export default {
  loadTodos: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const responseJSON = await response.json();
    return await Util.decode(
      responseJSON,
      t.array(IOTodo),
      'Problem with decoding todos, check data of loadTodos request',
    );
  },
};
