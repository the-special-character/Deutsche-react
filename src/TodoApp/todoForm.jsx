import { forwardRef, memo } from "react";
import PropTypes from "prop-types";

const TodoForm = forwardRef(({ addTodo }, ref) => {
  console.log("todo form render");
  return (
    <form className="flex" onSubmit={addTodo}>
      <div>
        <label htmlFor="todoText" className="sr-only">
          Todo Text
        </label>
        <input ref={ref} type="text" id="todoText" className="rounded-l-md" />
      </div>
      <button
        type="submit"
        className="rounded-r-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add Todo
      </button>
    </form>
  );
});

TodoForm.displayName = "TodoForm";

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default memo(TodoForm);
