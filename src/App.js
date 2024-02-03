import { useState, useRef } from "react";
import TodoList from "./TodoList"
import {v4 as uuidv4} from "uuid";

function App() {
  const [todos, setTodos] = useState([
    {id: 1, name:"Todo1", completed: false},
  ]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    //タスクを追加する
    const name = todoNameRef.current.value;
    if(name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name:name, completed:false }]
    })
    todoNameRef.current.value = null 
  };
  
  const toggleTodo = (id) =>{
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };
  
  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos)
  }
  
  return (
    <div>
      <p class="text-6xl text-center block " >Todo List</p>
      <input type="text" ref = {todoNameRef} class="text-center border border-solid block "/> 
      <button className="px-6 py-2 bg-green-300" onClick={handleAddTodo}>タスクを追加</button>
      <button className="px-6 py-2 bg-green-300" onClick = {handleClear}>完了したタスクの削除</button>
      <TodoList todos = {todos} toggleTodo={toggleTodo} />
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </div>
  )

}

export default App;
