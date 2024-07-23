import { Component, createRef } from "react";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
import TodoFilter from "./todoFilter";

export default class Todo extends Component {
  // temp variable
  state = {
    todoList: [],
    filter: "all",
  };

  todoTextRef = createRef();

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
      };
    });
  };

  filterTodo = (filterType) => {
    this.setState({ filter: filterType });
  };

  // whenever we change state or props that time it rerender
  render() {
    const { todoList, filter } = this.state;

    return (
      <div className="flex flex-col items-center h-screen">
        <h1 className="font-semibold text-5xl my-6">Todo App</h1>
        <TodoForm addTodo={this.addTodo} ref={this.todoTextRef} />
        <TodoList
          todoList={todoList}
          filter={filter}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
        />
        <TodoFilter filter={filter} filterTodo={this.filterTodo} />
      </div>
    );
  }
}
