import { Component, createRef } from "react";
import clsx from "clsx";

export default class Todo extends Component {
  // temp variable
  state = {
    todoList: [],
    update: null,
    filter: "all",
  };

  todoTextRef = createRef();

  updateTodoRef = createRef();

  onTextChange = (event) => {
    this.setState({ todoText: event.target.value });
  };

  addTodo = (event) => {
    event.preventDefault();
    const todoText = this.todoTextRef.current;
    this.setState(
      (state) => {
        return {
          todoList: [
            {
              id: new Date().valueOf(),
              text: todoText.value,
              isDone: false,
            },
            ...state.todoList,
          ],
          todoText: "",
        };
      },
      () => {
        todoText.value = "";
      }
    );
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
        update: null,
      };
    });
  };

  updateItem = (event) => {
    event.preventDefault();
    const { update } = this.state;
    this.updateTodo({ ...update, text: this.updateTodoRef.current.value });
  };

  componentDidUpdate() {
    const { update } = this.state;
    if (this.updateTodoRef?.current && update) {
      this.updateTodoRef.current.value = update.text;
    }
  }

  // whenever we change state or props that time it rerender
  render() {
    const { todoList, update, filter } = this.state;

    return (
      <div className="flex flex-col items-center h-screen">
        <h1 className="font-semibold text-5xl my-6">Todo App</h1>
        <form className="flex" onSubmit={this.addTodo}>
          <div>
            <label htmlFor="todoText" className="sr-only">
              Todo Text
            </label>
            <input
              ref={this.todoTextRef}
              type="text"
              id="todoText"
              className="rounded-l-md"
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
          {todoList
            .filter((item) => {
              switch (filter) {
                case "completed":
                  return item.isDone === true;
                case "pending":
                  return item.isDone === false;
                default:
                  return true;
              }
            })
            .map((item) => {
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
                    <form
                      onSubmit={this.updateItem}
                      className="flex-1 flex gap-4 items-center"
                    >
                      <input
                        type="text"
                        className="flex-1"
                        ref={this.updateTodoRef}
                      />
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
            className={clsx(
              "flex-1 px-3 py-2 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ring-1 ring-inset",
              {
                "hover:bg-indigo-500 focus-visible:outline-indigo-600 bg-indigo-600 text-white":
                  filter === "all",
              }
            )}
            onClick={() => this.setState({ filter: "all" })}
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
            onClick={() => this.setState({ filter: "pending" })}
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
            onClick={() => this.setState({ filter: "completed" })}
          >
            Completed
          </button>
        </footer>
      </div>
    );
  }
}
