import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '../../models/data';

/**
 * Interface for the state of todos
 */
export interface TodoState {
  todos: ITodo[];
}

/**
 * Initial state for todos
 */
const initialState: TodoState = {
  todos: [],
};

/**
 * Slice for managing todo state
 */
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    /**
     * Action for adding a todo
     */
    addTodo(state, action: PayloadAction<ITodo>) {
      state.todos.push(action.payload);
    },
    /**
     * Action for setting todos
     */
    setTodos(state, action: PayloadAction<ITodo[]>) {
      state.todos = action.payload;
    },
    /**
     * Action for removing a todo
     */
    removeTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    /**
     * Action for toggling the completion status of a todo
     */
    toggleTodoComplete(state, action: PayloadAction<string>) {
      const toggledTodo = state.todos.find(todo => todo.id === action.payload);
      if (toggledTodo) toggledTodo.complete = !toggledTodo.complete;
    },
    /**
     * Action for editing a todo
     */
    editTodo(state, action: PayloadAction<ITodo>) {
      const existingTodoIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (existingTodoIndex !== -1) {
        state.todos[existingTodoIndex] = action.payload;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodoComplete, editTodo, setTodos } = todoSlice.actions;

export default todoSlice.reducer;
