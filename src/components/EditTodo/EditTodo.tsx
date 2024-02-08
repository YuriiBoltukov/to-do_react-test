import React, { useState } from 'react';
import style                        from './editTodo.module.scss';
import { editTodo }          from '../../store/reducers/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ITodo }          from '../../models/data';
import { useParams }                from 'react-router-dom';

export default function EditTodo() {
  /**
   * for getting id from params
   */
  const { id } = useParams();

  // Get todo from Redux store
  const dispatch = useDispatch();

  const todo = useSelector((state) => {
      const { todos } = state.todos.todos
      return todos.find((todo: ITodo) => todo?.id === id)
    }
  );
  /**
   *	for editing todo
   * @param {React.SyntheticEvent} e
   */
  const editTask = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/todos/${form.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      if (response.ok) {
        dispatch(editTodo(form));
        window.history.back();
      }
    } catch(error) {
      console.error('Ошибка при редактировании задачи:', error)
    }
  };

  /**
   * form data
   */
  const [form, setForm] = useState<ITodo>({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    date: todo.date,
    complete: todo.complete,
  });

  /**
   *	for setting todos to state
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * @param {string} key
   */
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    event.preventDefault();
    setForm({ ...form, [key]: event.target.value });
  };
  return (
    <form className={style.form}>
      <label>
        <p className={style.form_text}>Title</p>
        <input
          type='text'
          className={style.form_input}
          value={form.title}
          onChange={e => handleChange(e, 'title')}
        />
      </label>
      <label>
        <p className={style.form_text}>Description</p>
        <input
          type='text'
          id='title'
          className={style.form_input}
          value={form.description}
          onChange={e => handleChange(e, 'description')}
        />
      </label>
      <label>
        <p className={style.form_text}>Date</p>
        <input
          type='date'
          className={style.form_input}
          value={form.date}
          onChange={e => handleChange(e, 'date')}
        />
      </label>
      <div className={style.form_wrapper}>
        <button className={style.form_add} onClick={e => editTask(e)}>
          Edit
        </button>
      </div>
    </form>
  );
}
