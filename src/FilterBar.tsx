import type { Filter } from "./models/types";

// props for the FilterBar component
type FilterBarProps = {
  filter: Filter;
  onChangeFilter: (nextFilter: Filter) => void;
};

// component to render the filter bar
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