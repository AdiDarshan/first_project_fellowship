# React Todo App

A simple todo list app built with React, TypeScript, and Vite.

## Features

- Add, edit, and delete todos
- Mark todos as complete/incomplete
- Filter by All / Active / Completed
- Clear all completed todos at once
- Persists todos in `localStorage`

## Tech Stack

- React 19
- TypeScript
- Vite

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
  components/     # UI components (App, TodoForm, TodoList, TodoItem, FilterBar)
  hooks/          # useTodos — state management and localStorage sync
  models/         # TypeScript types (Todo, Filter)
```
