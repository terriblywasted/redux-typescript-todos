import * as t from 'io-ts';

export const IOTodo = t.type({
  id: t.number,
  userId: t.number,
  title: t.string,
  completed: t.boolean,
});

export type Todo = t.TypeOf<typeof IOTodo>;
