import style                   from './App.module.scss'
import { Link, Route, Routes } from 'react-router-dom';
import { CreateTodo }          from './components/CreateTodo/CreateTodo.tsx';
import EditTodo                from './components/EditTodo/EditTodo.tsx';
import { TodoList }            from './components/TodoList/TodoList.tsx';

function App() {

  return (
    <>
      <div className={style.container}>
        <header className={style.header}>
          <h1 className={style.header_title}>To Do List</h1>
          <nav>
            <ul className={style.header_nav}>
              <li className={style.header_nav_items}>
                <Link to={'/create'}>
                  <button className={`${style.btn} ${style.btn_ripple}`}>
                    Add To Do
                  </button>
                </Link>
              </li>
              <li className={style.header_nav}>
                <Link to={'/'}>
                  <button className={`${style.btn} ${style.btn_ripple}`}>
                    To Do List
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <section className={style.container}>
          <Routes>
            <Route path='/' element={<TodoList />} />
            <Route path='/create' element={<CreateTodo />} />
            <Route path='/update/:id' element={<EditTodo />} />
          </Routes>
        </section>
      </div>
    </>
  )
}

export default App
