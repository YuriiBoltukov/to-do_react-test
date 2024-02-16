import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodoComplete } from '../../store/reducers/todoSlice';
import style from './todoItem.module.scss';
import { Link } from 'react-router-dom';
import { TodoView } from '../TodoView/TodoView';
import { ITodo } from "../../models/data";

interface TodoItemProps extends ITodo {}

export const TodoItem: React.FC<TodoItemProps> = (props) => {
  const dispatch = useDispatch();
  const [openDescription, setOpenDescription] = useState<boolean>(false);

  /**
   * Toggles the description view
   */
  function handleOpenDescription() {
    setOpenDescription(!openDescription);
  }

  /**
   * Handles marking a todo as complete
   */
  function completeTodo() {
    dispatch(toggleTodoComplete(props.id));
  }

  /**
   * Handles removing a todo
   */
  async function remove(id: string) {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });

      dispatch(removeTodo(id));
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  }

  return (
    <div className={style.todo}>
      <div className={style.todo_check}>
        <label htmlFor='checkbox'></label>
        <input
          className={style.todo_check_checkbox}
          type='checkbox'
          checked={props.complete}
          onChange={completeTodo}
        />
        <p className={style.todo_check_date}>{props.date}</p>
      </div>
      <div
        className={
          props.complete
            ? `${style.todo_text} ${style.todo_complete}`
            : style.todo_text
        }>
        <div className={style.todo_text_title}>
          <p>{props.title}</p>
        </div>
      </div>
      <div className={style.todo_btn}>
        <button onClick={handleOpenDescription}>View</button>
        <Link to={`/update/${props.id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => remove(props.id)}>Remove</button>
      </div>
      {openDescription && <TodoView todos={props} handleOpen={handleOpenDescription} />}
    </div>
  );
};
