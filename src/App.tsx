import { useState } from "react";
import { TodoList } from './TodoList';
import { TodoForm } from './TodoForm';
import { FilterBar } from './FilterBar';
import { useTodos } from './hooks/useTodos';
import type { Filter } from './models/types';

function App() {
  // states and hooks
  const { todos, toggleTodo, deleteTodo, addTodo, editTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<Filter>("all");
  
  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  // filtered todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all"
  });

  // render 
  return (
    <div>
      <h1>My Todo List</h1> 
      <p>{itemsLeft} items left</p>
      <FilterBar filter={filter} onChangeFilter={setFilter} />
      <TodoList todos={filteredTodos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo} onEditTodo={editTodo} />
      <TodoForm onAddTodo={addTodo}></TodoForm>
      <button onClick={clearCompleted}> clear completed</button>
    </div>
  );
}

export default App;