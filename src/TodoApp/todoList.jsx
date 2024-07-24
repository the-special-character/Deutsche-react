import { memo } from "react";
import PropTypes from "prop-types";
import TodoItem from "./todoItem";

const TodoList = ({ todoList, updateTodo, deleteTodo }) => {
  return (
    <ul className="w-full flex-1 overflow-auto">
      {todoList.map((item) => {
        return (
          <TodoItem
            key={item.id}
            item={item}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
    })
  ).isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default memo(TodoList);
