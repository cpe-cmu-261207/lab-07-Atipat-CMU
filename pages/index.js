import { useEffect, useState } from "react";
import Todo from "../components/Todo";

export default function Home() {
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [counterCompleted, setCounterCompleted] = useState(0);

  useEffect(() => {
    const newTodos = JSON.parse(localStorage.getItem("todos-list"));
    let nCompleted = 0;
    for (let todo of newTodos) {
      if (todo.completed === true) {
        nCompleted = nCompleted + 1;
      }
    }
    setCounterCompleted(nCompleted);
    setTodos(newTodos);
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    localStorage.setItem("todos-list", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoName) => {
    if (inputTodo === "") {
      alert("Todo cannot be empty");
    } else {
      const todo = { name: todoName, completed: false };
      setTodos([todo, ...todos]);
      setInputTodo("");
    }
  };

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    const newTodo = [...todos];
    setTodos(newTodo);
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed;
    if (todos[idx].completed === true) {
      setCounterCompleted(counterCompleted + 1);
    } else {
      setCounterCompleted(counterCompleted - 1);
    }
    setTodos([...todos]);
  };

  const moveUp = (idx) => {
    if (idx !== 0) {
      const targetTodo = todos[idx];
      const newTodos = [...todos];
      newTodos[idx] = newTodos[idx - 1];
      newTodos[idx - 1] = targetTodo;
      setTodos(newTodos);
    }
  };

  const moveDown = (idx) => {
    if (idx !== todos.length - 1) {
      const targetTodo = todos[idx];
      const newTodos = [...todos];
      newTodos[idx] = newTodos[idx + 1];
      newTodos[idx + 1] = targetTodo;
      setTodos(newTodos);
    }
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange={(e) => {
            setInputTodo(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              addTodo(inputTodo);
            }
          }}
          value={inputTodo}
        />
        {todos.map((todo, i) => {
          return (
            <Todo
              name={todo.name}
              completed={todo.completed}
              key={i}
              onDelete={() => deleteTodo(i)}
              onMark={() => markTodo(i)}
              onClickUp={() => moveUp(i)}
              onClickDown={() => moveDown(i)}
            ></Todo>
          );
        })}

        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">
            Pending ({todos.length - counterCompleted}){" "}
          </span>
          <span className="text-success">Completed ({counterCompleted})</span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Atipat Daowraeng 640610674
        </p>
      </div>
    </div>
  );
}
