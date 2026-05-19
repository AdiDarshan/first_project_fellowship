import { useState } from "react";

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};



export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState<string>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!title.trim()) return;

    onAddTodo(title.trim());
    setTitle("");
  }

  

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="New todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
}