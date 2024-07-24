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

  //
  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const res = await fetch("http://localhost:3000/todoList");
      const json = await res.json();
      this.setState({ todoList: json });
    } catch (error) {}
  };

  addTodo = async (event) => {
    try {
      event.preventDefault();

      const todoText = this.todoTextRef.current;

      const res = await fetch("http://localhost:3000/todoList", {
        method: "POST",
        body: JSON.stringify({
          text: todoText.value,
          isDone: false,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();

      this.setState(
        (state) => {
          return {
            todoList: [...state.todoList, json],
            todoText: "",
          };
        },
        () => {
          todoText.value = "";
        }
      );
    } catch (error) {}
  };

  deleteTodo = (item) => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex((x) => x.id === item.id);
      return {
        todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
      };
    });
  };

  updateTodo = async (item) => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await res.json();

      this.setState(({ todoList }) => {
        const index = todoList.findIndex((x) => x.id === item.id);
        return {
          todoList: [
            ...todoList.slice(0, index),
            json,
            ...todoList.slice(index + 1),
          ],
        };
      });
    } catch (error) {}
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
