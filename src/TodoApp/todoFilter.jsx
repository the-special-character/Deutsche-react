import clsx from "clsx";
import PropTypes from "prop-types";
import { memo } from "react";

const TodoFilter = ({ filter, filterTodo }) => {
  console.log("todo filter render");
  return (
    <footer className="flex w-full">
      <button
        type="submit"
        className={clsx(
          "flex-1 px-3 py-2 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-inset",
          {
            "hover:bg-indigo-500 focus-visible:outline-indigo-600 bg-indigo-600 text-white":
              filter === "all",
          }
        )}
        onClick={() => filterTodo("all")}
      >
        All
      </button>
      <button
        type="submit"
        className={clsx(
          "flex-1 px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-inset",
          {
            "hover:bg-indigo-500 focus-visible:outline-indigo-600 bg-indigo-600 text-white":
              filter === "pending",
          }
        )}
        onClick={() => filterTodo("pending")}
      >
        Pending
      </button>
      <button
        type="submit"
        className={clsx(
          "flex-1 px-3 py-2 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-inset",
          {
            "hover:bg-indigo-500 focus-visible:outline-indigo-600 bg-indigo-600 text-white":
              filter === "completed",
          }
        )}
        onClick={() => filterTodo("completed")}
      >
        Completed
      </button>
    </footer>
  );
};

TodoFilter.propTypes = {
  filter: PropTypes.oneOf(["all", "pending", "completed"]).isRequired,
  filterTodo: PropTypes.func.isRequired,
};

export default memo(TodoFilter);
