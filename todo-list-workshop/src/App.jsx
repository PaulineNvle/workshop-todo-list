import Header from "./components/Header.jsx";
import AddTodo from "./components/AddTodo.jsx";
import ListTodos from "./components/ListTodos.jsx";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

const LSKEY = "MyTodoApp";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const changeTodoStatus = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      if (todo.id === id) return false;
      return true;
    });

    setTodos(newTodos);
  }

  const addNewTodo = (newTodoName) => {
    const newTodo = {
      id: uuidv4(),
      name: newTodoName,
      done: false
    };
    const newTodos = [...todos];
    newTodos.push(newTodo);
    setTodos(newTodos);
  }

  useEffect(() => {
    const initialTodos = JSON.parse(window.localStorage.getItem(LSKEY + '.todos'))
      setTodos(initialTodos ?? []);
  }, []);

  useEffect(() => {
    if (!firstLoad) {
      window.localStorage.setItem(LSKEY + ".todos", JSON.stringify(todos));
    } else {
      setFirstLoad(false);
    }
  }, [todos, firstLoad]);

  return (
    <main className="container">
      <Header />

      <AddTodo addNewTodo={addNewTodo}/>

      <ListTodos todos={todos} changeTodoStatus={changeTodoStatus} deleteTodo={deleteTodo}/>
    </main>
  )
}