import './App.css';
import { useState } from "react";
import { TodoList } from './TodoList';
import { TodoForm } from './TodoForm';
import { FilterBar } from './FilterBar';
import { useTodos } from './hooks/useTodos';


function App() {
    const { todos, toggleTodo, deleteTodo, addTodo, editTodo, clearCompleted} = useTodos();
    const itemsLeft = todos.filter((todo) => !todo.completed).length;

type Filter = "all" | "active" | "completed";
const [filter, setFilter] = useState<Filter>("all");

const filteredTodos = todos.filter((todo) => {
  if (filter === "active") return !todo.completed;
  if (filter === "completed") return todo.completed;
  return true; // "all"
});

  return (
    <div>
      <p>{itemsLeft} items left</p>

      {/* <Navbar /> */}
      <FilterBar filter={filter} onChangeFilter={setFilter} />
      <button onClick={clearCompleted}> clear completed</button>
      <TodoList todos={filteredTodos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo} onEditTodo={editTodo}/>
      <TodoForm onAddTodo={addTodo}></TodoForm>
      
    </div>
  );
}

export default App;