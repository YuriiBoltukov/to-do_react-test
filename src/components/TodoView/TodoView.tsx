import { Link } from 'react-router-dom';
import style from './todoView.module.scss';
import {  ITodo } from '../../models/data.ts';
interface TodoViewProps {
  todos: ITodo
  handleOpen: ()=>void
}
export const TodoView = (props: TodoViewProps) => {
  const { title, date, description,id } = props.todos;

  return (
    <div className={style.drop_shadow} onClick={props.handleOpen}>
      <div className={style.file}>
        <div>{date}</div>
        <div>
          <h4>{title}</h4>
        </div>
        <div>
          <p>{description}</p>
        </div>
        <div>
          <Link to={ `/update/${id}` }>
            <button>Edit</button>
          </Link>
          <button onClick={props.handleOpen}>Close</button>
        </div>
      </div>
    </div>
  );
};
