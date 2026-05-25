import { useState, type SubmitEvent } from "react";

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};


export function TodoForm({ onAddTodo }: TodoFormProps) {
  
  const [title, setTitle] = useState<string>("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed){
      return; // if the title is empty, return
    } 

    onAddTodo(trimmed);
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
