import type { Todo } from "../models/types";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string, newTitle: string) => void;
};

export function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return <p>No todos yet. Add your first one!</p>;
  }

  return (
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
          onEdit={onEditTodo}
        />
      ))}
    </ul>
  );
}