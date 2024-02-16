import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoItem }        from '../TodoItem/TodoItem';
import { setTodos } from '../../store/reducers/todoSlice';
import { ITodo }           from '../../models/data';

/**
 * Component for displaying a list of todos
 */
const TodoList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  // Get todos selector from state
  const  todos = useSelector((state: { todos: ITodo[] }) => state.todos);

  /**
   * Fetch data from the server
   */
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/todos');
      const data: ITodo[] = await response.json();
      dispatch(setTodos(data));
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='item-wrapper'>
      {
        todos.todos.map((todo: ITodo) => (
        <TodoItem key={todo.id} {...todo} />
        ))
      }
    </div>
  );
};

export { TodoList };
