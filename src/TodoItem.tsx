import { useState } from "react";
import type { Todo } from "./models/types";

// props for the TodoItem component
type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newTitle: string) => void;
};

// component to render a todo item
export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {

    // states to manage the editing of a todo
    const [isEditing, setIsEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(todo.title);


    // handle the save of a todo
    const handleSave = () => {
        const trimmed = editingTitle.trim();
        if (!trimmed) return;
        onEdit(todo.id, trimmed);
        setIsEditing(false);
    };

    // render the todo item
    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />

                {/* if the todo is being edited, render the input field, otherwise render the title */}
                {isEditing ? (
                    <input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                            if (e.key === "Escape") setIsEditing(false);
                        }}
                    />
                ) : (
                    <span>{todo.title}</span>
                )}
            </label>

            {/* if the todo is being edited, render the save and cancel buttons, otherwise render the edit button */}
            {isEditing ? (
                <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <button
                    onClick={() => {
                        setIsEditing(true);
                        setEditingTitle(todo.title);
                    }}
                >
                    Edit
                </button>
            )}

            <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
    );
}