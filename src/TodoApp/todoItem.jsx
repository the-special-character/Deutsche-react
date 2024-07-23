import { createRef, PureComponent } from "react";
import PropTypes from "prop-types";

export default class TodoItem extends PureComponent {
  state = {
    update: null,
  };

  updateTodoRef = createRef();

  updateItem = (event) => {
    event.preventDefault();
    const { update } = this.state;
    const { updateTodo } = this.props;
    updateTodo({ ...update, text: this.updateTodoRef.current.value });
    this.setState({ update: null });
  };

  componentDidUpdate() {
    const { update } = this.state;
    if (this.updateTodoRef?.current && update) {
      this.updateTodoRef.current.value = update.text;
    }
  }

  render() {
    const { item, updateTodo, deleteTodo } = this.props;
    const { update } = this.state;
    const isUpdating = item.id === update?.id;
    console.log("todo item");
    return (
      <li key={item.id} className="flex items-center m-4 gap-4">
        <input
          id={`idDone-${item.id}`}
          name="isDone"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          checked={item.isDone}
          onChange={() => updateTodo({ ...item, isDone: !item.isDone })}
        />
        {isUpdating ? (
          <form
            onSubmit={this.updateItem}
            className="flex-1 flex gap-4 items-center"
          >
            <input type="text" className="flex-1" ref={this.updateTodoRef} />
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </form>
        ) : (
          <>
            <label htmlFor={`idDone-${item.id}`} className="flex-1">
              {item.text}
            </label>
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                this.setState({ update: item });
              }}
            >
              Update
            </button>
          </>
        )}
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => deleteTodo(item)}
        >
          Delete
        </button>
      </li>
    );
  }
}

TodoItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
  }).isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
