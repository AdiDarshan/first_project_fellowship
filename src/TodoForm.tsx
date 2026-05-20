// import { useState } from "react";
import { useState, type SubmitEvent } from "react";

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};


export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState<string>("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!title.trim()) return; // if the title is empty, return

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