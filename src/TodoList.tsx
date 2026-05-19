import { useState } from "react";
import type { Todo } from "./models/Todo";


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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");

  if (todos.length === 0) {
  return <p>No todos yet. Add your first one!</p>;
}

  return (
    <ul>
      {todos.map((todo) => {
        const isEditing = editingId === todo.id;

        if (isEditing) {
          return (
            <li key={todo.id}>
              <input
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onEditTodo(todo.id, editingTitle.trim());
                    setEditingId(null);
                  }
                }}
              />
              <button
                onClick={() => {
                  onEditTodo(todo.id, editingTitle.trim());
                  setEditingId(null);
                }}
              >
                Save
              </button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </li>
          );
        }

        

        return (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleTodo(todo.id)}
              />
              {todo.title}
            </label>
            <button
              onClick={() => {
                setEditingId(todo.id);
                setEditingTitle(todo.title);
              }}
            >
              Edit
            </button>
            <button onClick={() => onDeleteTodo(todo.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}
