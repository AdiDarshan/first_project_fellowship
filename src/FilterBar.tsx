import type { Filter } from "./models/Todo";
      
type FilterBarProps = {
  filter: Filter;
  onChangeFilter: (nextFilter: Filter) => void;
};

export function FilterBar({ filter, onChangeFilter }: FilterBarProps) {
  return (
    <div>
      <button
        onClick={() => onChangeFilter("all")}
        disabled={filter === "all"}
      >
        All
      </button>

      <button
        onClick={() => onChangeFilter("active")}
        disabled={filter === "active"}
      >
        Active
      </button>

      <button
        onClick={() => onChangeFilter("completed")}
        disabled={filter === "completed"}
      >
        Completed
      </button>
    </div>
  );
}