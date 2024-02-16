import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/reducers/todoSlice';
import style from './createTodo.module.scss';
import { nanoid } from 'nanoid';

// Interface for form state
interface FormState {
  id: string;
  title: string;
  description: string;
  date: string;
  complete: boolean;
}

// Component for creating todo
export const CreateTodo: React.FC = () => {
  const dispatch = useDispatch();

  const inputRef = useRef<HTMLFormElement>(null);

  // Initialize initial form state
  const initialFormState = (): FormState => ({
    id: nanoid(),
    title: '',
    description: '',
    date: '',
    complete: false,
  });

  // Form state
  const [form, setForm] = useState<FormState>(initialFormState);

  // Submit form handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data: FormState = await response.json();
      dispatch(addTodo(data));
    } catch (error) {
      console.error('Error adding todo:', error);
    }
    console.log(form);
    validateForm();
    setForm(initialFormState);
    window.history.back();
  };

  // Handle form field changes
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: keyof FormState
  ) => {
    event.preventDefault();
    setForm({ ...form, [key]: event.target.value });
  };

  // Form validation
  const validateForm = () => {
    const inputElements = Array.from(document.querySelectorAll('input'));
    inputElements.forEach((input: HTMLInputElement) => {
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
