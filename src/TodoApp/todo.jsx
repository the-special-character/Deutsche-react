import { Component } from "react";

export default class Todo extends Component {
  // temp variable
  state = {
    todoText: "",
    todoList: [],
    update: null,
  };

  onTextChange = (event) => {
    this.setState({ todoText: event.target.value });
  };

  addTodo = (event) => {
    event.preventDefault();
    this.setState((state) => {
      return {
        todoList: [
          {
            id: new Date().valueOf(),
            text: state.todoText,
            isDone: false,
          },
          ...state.todoList,
        ],
        todoText: "",
      };
    });
  };

  deleteTodo = (item) => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex((x) => x.id === item.id);
      return {
        todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
      };
    });
  };

  updateTodo = (item) => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex((x) => x.id === item.id);
      return {
        todoList: [
          ...todoList.slice(0, index),
          item,
          ...todoList.slice(index + 1),
        ],
      };
    });
  };

  render() {
    const { todoText, todoList, update } = this.state;

    return (
      <div className="flex flex-col items-center h-screen">
        <h1 className="font-semibold text-5xl my-6">Todo App</h1>
        <form className="flex" onSubmit={this.addTodo}>
          <div>
            <label htmlFor="todoText" className="sr-only">
              Todo Text
            </label>
            <input
              type="text"
              id="todoText"
              className="rounded-l-md"
              value={todoText}
              onChange={this.onTextChange}
            />
          </div>
          <button
            type="submit"
            className="rounded-r-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Todo
          </button>
        </form>
        <ul className="w-full flex-1 overflow-auto">
          {todoList.map((item) => {
            const isUpdating = item.id === update?.id;
            return (
              <li key={item.id} className="flex items-center m-4 gap-4">
                <input
                  id={`idDone-${item.id}`}
                  name="isDone"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked={item.isDone}
                  onChange={() =>
                    this.updateTodo({ ...item, isDone: !item.isDone })
                  }
                />
                {isUpdating ? (
                  <input type="text" value={item.text} className="flex-1" />
                ) : (
                  <label htmlFor={`idDone-${item.id}`} className="flex-1">
                    {item.text}
                  </label>
                )}
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => this.setState({ update: item })}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => this.deleteTodo(item)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>

        <footer className="flex w-full">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            All
          </button>
          <button
            type="submit"
            className="flex-1 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 ring-1 ring-inset ring-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Pending
          </button>
          <button
            type="submit"
            className="flex-1 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 ring-1 ring-inset ring-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Completed
          </button>
        </footer>
      </div>
    );
  }
}
