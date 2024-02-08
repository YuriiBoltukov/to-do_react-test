import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ITodo } from '../../models/data';
import { addTodo } from '../../store/reducers/todoSlice';
import style from './createTodo.module.scss';

export const CreateTodo = () => {
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState<ITodo>({
    id: '',
    title: '',
    description: '',
    date: '',
    complete: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      dispatch(addTodo(data))
    } catch(error) {
      console.error('Ошибка при добавлении задачи:', error)
    }
    validateForm();
    setForm({
      id: '',
      title: '',
      description: '',
      date: '',
      complete: false,
    });
    window.history.back();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    event.preventDefault();
    setForm({ ...form, [key]: event.target.value });
  };

  const validateForm = () => {
    const inputElements = Array.from(document.querySelectorAll('input'));
    inputElements.forEach((input) => {
      if (!input.checkValidity()) {
        input.setAttribute('aria-invalid', 'true');
      } else {
        input.removeAttribute('aria-invalid');
      }
    });
  };

  return (
    <form className={style.form} ref={inputRef} onSubmit={handleSubmit}>
      <label>
        <p className={style.form_text}>Title</p>
        <input
          type='text'
          className={style.form_input}
          value={form.title}
          onChange={(e) => handleChange(e, 'title')}
          required
        />
      </label>
      <label>
        <p className={style.form_text}>Description</p>
        <input
          type='text'
          id='title'
          className={style.form_input}
          value={form.description}
          onChange={(e) => handleChange(e, 'description')}
        />
      </label>
      <label>
        <p className={style.form_text}>Date</p>
        <input
          type='date'
          className={style.form_input}
          value={form.date}
          onChange={(e) => handleChange(e, 'date')}
        />
      </label>

      <div className={style.form_wrapper}>
        <button className={style.form_add} type='submit'>
          <span>Add</span>
        </button>
      </div>
    </form>
  );
};