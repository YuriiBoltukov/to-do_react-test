import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { TodoItem }                 from '../TodoItem/TodoItem';
import { ITodoRes, ITodoState } from '../../models/data.ts';
import { setTodos }                   from '../../store/reducers/todoSlice.ts';

const TodoList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  /**
   * for getting todos selector from state
   */
  const { todos }: ITodoState = useSelector(
    (state: { todos: ITodoState }) => state.todos
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/todos');
        const data = await response.json();
        dispatch(setTodos(data));
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='item-wrapper'>
      {todos?.map((todo: ITodoRes) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export { TodoList };
