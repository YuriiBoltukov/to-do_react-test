import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo,} from '../../models/data';
export interface State {
  todos: ITodo[]
}
const initialState:State = {
  todos: [],
};


const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<ITodo>) {
      state.todos.push({
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        date: action.payload.date,
        complete: action.payload.complete,
      });
    },
    setTodos: (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload;
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(
        (todo: ITodo) => todo.id !== action.payload
      );
    },
    toggleTodoComplete(state, action: PayloadAction<string>) {
      const toggledTodo = state.todos.find(todo => todo.id === action.payload);
      if (toggledTodo) toggledTodo.complete = !toggledTodo.complete;
    },
    editTodo(state, action: PayloadAction<ITodo>) {
      const existingTodoIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (existingTodoIndex !== -1) {
        state.todos[existingTodoIndex] = action.payload;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodoComplete, editTodo,setTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
