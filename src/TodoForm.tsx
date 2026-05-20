import { useState, type SubmitEvent } from "react";

// props for the TodoForm component
type TodoFormProps = {
  onAddTodo: (title: string) => void;
};


// component to add a todo
export function TodoForm({ onAddTodo }: TodoFormProps) {
  
  // state to manage the title of the new todo
  const [title, setTitle] = useState<string>("");

  // handle the form submission
  function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!title.trim()) return; // if the title is empty, return

    onAddTodo(title.trim());
    setTitle("");
  }

  // render the form
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