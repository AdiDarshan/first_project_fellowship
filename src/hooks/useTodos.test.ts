import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useTodos } from "./useTodos";

describe("useTodos", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("initialization", () => {
    it("starts with an empty list when localStorage is empty", () => {
      const { result } = renderHook(() => useTodos());
      expect(result.current.todos).toEqual([]);
    });

    it("loads existing todos from localStorage and revives createdAt as a Date", () => {
      const stored = [
        {
          id: "abc",
          title: "buy milk",
          completed: false,
          createdAt: "2026-01-01T00:00:00.000Z",
        },
        {
          id: "def",
          title: "walk dog",
          completed: true,
          createdAt: "2026-01-02T12:30:00.000Z",
        },
      ];
      localStorage.setItem("todos", JSON.stringify(stored));

      const { result } = renderHook(() => useTodos());

      expect(result.current.todos).toHaveLength(2);
      expect(result.current.todos[0]).toMatchObject({
        id: "abc",
        title: "buy milk",
        completed: false,
      });
      expect(result.current.todos[0].createdAt).toBeInstanceOf(Date);
      expect(result.current.todos[0].createdAt.toISOString()).toBe(
        "2026-01-01T00:00:00.000Z",
      );
      expect(result.current.todos[1].completed).toBe(true);
    });

    it("falls back to an empty list when localStorage contains invalid JSON", () => {
      localStorage.setItem("todos", "not json");
      const { result } = renderHook(() => useTodos());
      expect(result.current.todos).toEqual([]);
    });
  });

  describe("addTodo", () => {
    it("appends a new active todo with a generated id and Date createdAt", () => {
      const { result } = renderHook(() => useTodos());

      act(() => {
        result.current.addTodo("write tests");
      });

      expect(result.current.todos).toHaveLength(1);
      const [todo] = result.current.todos;
      expect(todo.title).toBe("write tests");
      expect(todo.completed).toBe(false);
      expect(todo.id).toEqual(expect.any(String));
      expect(todo.id.length).toBeGreaterThan(0);
      expect(todo.createdAt).toBeInstanceOf(Date);
    });

    it("preserves insertion order across multiple adds", () => {
      const { result } = renderHook(() => useTodos());

      act(() => {
        result.current.addTodo("first");
      });
      act(() => {
        result.current.addTodo("second");
      });
      act(() => {
        result.current.addTodo("third");
      });

      expect(result.current.todos.map((todo) => todo.title)).toEqual([
        "first",
        "second",
        "third",
      ]);
    });

    it("assigns a unique id to each todo", () => {
      const { result } = renderHook(() => useTodos());

      act(() => {
        result.current.addTodo("a");
      });
      act(() => {
        result.current.addTodo("b");
      });

      const [a, b] = result.current.todos;
      expect(a.id).not.toBe(b.id);
    });
  });

  describe("toggleTodo", () => {
    it("flips the completed flag of the matching todo", () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo("learn vitest");
      });
      const id = result.current.todos[0].id;

      act(() => {
        result.current.toggleTodo(id);
      });
      expect(result.current.todos[0].completed).toBe(true);

      act(() => {
        result.current.toggleTodo(id);
      });
      expect(result.current.todos[0].completed).toBe(false);
    });

    it("leaves other todos untouched", () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo("a");
      });
      act(() => {
        result.current.addTodo("b");
      });
      const idA = result.current.todos[0].id;

      act(() => {
        result.current.toggleTodo(idA);
      });

      expect(result.current.todos[0].completed).toBe(true);
      expect(result.current.todos[1].completed).toBe(false);
    });

    it("is a no-op for an unknown id", () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo("a");
      });
      const before = result.current.todos;

      act(() => {
        result.current.toggleTodo("does-not-exist");
      });

      expect(result.current.todos).toEqual(before);
    });
  });

  describe("deleteTodo", () => {
    it("removes the matching todo and preserves the rest", () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo("a");
      });
      act(() => {
        result.current.addTodo("b");
      });
      act(() => {
        result.current.addTodo("c");
      });
      const idB = result.current.todos[1].id;

      act(() => {
        result.current.deleteTodo(idB);
      });

      expect(result.current.todos.map((todo) => todo.title)).toEqual(["a", "c"]);
    });

    it("is a no-op for an unknown id", () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo("a");
      });

      act(() => {
        result.current.deleteTodo("does-not-exist");
      });

      expect(result.current.todos).toHaveLength(1);
    });
  });

  describe("editTodo", () => {
    it("updates the title of the matching todo", () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo("old title");
      });
      const id = result.current.todos[0].id;

      act(() => {
        result.current.editTodo(id, "new title");
      });

      expect(result.current.todos[0].title).toBe("new title");
    });

    it("does not change other fields on the edited todo", () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo("old");
      });
      const original = result.current.todos[0];
      act(() => {
        result.current.toggleTodo(original.id);
      });

      act(() => {
        result.current.editTodo(original.id, "renamed");
      });

      const edited = result.current.todos[0];
      expect(edited.id).toBe(original.id);
      expect(edited.completed).toBe(true);
      expect(edited.createdAt).toEqual(original.createdAt);
    });
  });

  describe("clearCompleted", () => {
    it("removes only the completed todos", () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo("keep");
      });
      act(() => {
        result.current.addTodo("drop");
      });
      act(() => {
        result.current.addTodo("also keep");
      });
      const dropId = result.current.todos[1].id;
      act(() => {
        result.current.toggleTodo(dropId);
      });

      act(() => {
        result.current.clearCompleted();
      });

      expect(result.current.todos.map((todo) => todo.title)).toEqual([
        "keep",
        "also keep",
      ]);
    });

    it("is a no-op when nothing is completed", () => {
      const { result } = renderHook(() => useTodos());
      act(() => {
        result.current.addTodo("a");
      });
      act(() => {
        result.current.addTodo("b");
      });
      const before = result.current.todos;

      act(() => {
        result.current.clearCompleted();
      });

      expect(result.current.todos).toEqual(before);
    });
  });

  describe("persistence", () => {
    it("writes todos to localStorage after a mutation", () => {
      const { result } = renderHook(() => useTodos());

      act(() => {
        result.current.addTodo("persisted");
      });

      const raw = localStorage.getItem("todos");
      expect(raw).not.toBeNull();
      const stored = JSON.parse(raw as string) as Array<{
        title: string;
        completed: boolean;
        createdAt: string;
      }>;
      expect(stored).toHaveLength(1);
      expect(stored[0].title).toBe("persisted");
      expect(stored[0].completed).toBe(false);
      expect(typeof stored[0].createdAt).toBe("string");
      expect(() => new Date(stored[0].createdAt).toISOString()).not.toThrow();
    });

    it("survives a remount via localStorage", () => {
      const first = renderHook(() => useTodos());
      act(() => {
        first.result.current.addTodo("survives");
      });
      first.unmount();

      const second = renderHook(() => useTodos());
      expect(second.result.current.todos).toHaveLength(1);
      expect(second.result.current.todos[0].title).toBe("survives");
      expect(second.result.current.todos[0].createdAt).toBeInstanceOf(Date);
    });
  });
});
