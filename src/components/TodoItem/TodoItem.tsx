import  { useState } from 'react';
import { useDispatch }     from 'react-redux';
import { removeTodo, toggleTodoComplete } from '../../store/reducers/todoSlice';
import style from './todoItem.module.scss';
import { Link } from 'react-router-dom';
import { TodoView } from '../TodoView/TodoView';
import { ITodo} from "../../models/data.ts";

export const TodoItem = (props: ITodo) => {
  const dispatch = useDispatch();
  const [openDescription, setOpenDescription] = useState(false);
  console.log(props)
  /**
   * for opening todo description
   */
  function handleOpenDescription() {
    setOpenDescription(!openDescription);
  }

  /**
   * for changing complete status
   */
  function completeTodo(id:string) {
    console.log(id)
    dispatch(toggleTodoComplete(id));
  }

  /**
   * for removing todo
   * @param {string} id
   */
  async function remove(id: string) {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });

      dispatch(removeTodo(id));
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
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
          onChange={() => completeTodo(props.id)}
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
        <button onClick={() => handleOpenDescription()}>Viewing</button>
        <Link to={`/update/${props.id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={() => remove(props.id)}>Remove</button>
      </div>
      {openDescription ? (
        <TodoView todos={props} handleOpen={handleOpenDescription} />
      ) : null}
    </div>
  );
};
