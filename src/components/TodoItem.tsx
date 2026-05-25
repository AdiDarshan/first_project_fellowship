import { useState } from "react";
import type { Todo } from "../models/types";

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newTitle: string) => void;
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(todo.title);


    const handleSave = () => {
        const trimmed = editingTitle.trim();
        if (!trimmed) {
            return;
        }
        onEdit(todo.id, trimmed);
        setIsEditing(false);
    };

    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />

                {isEditing ? (
                    <input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter"){
                                handleSave();
                            } 
                            if (e.key === "Escape") {
                                setIsEditing(false);
                            }
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
