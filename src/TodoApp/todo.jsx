import { Component } from "react";

export default class Todo extends Component {
  render() {
    return (
      <div>
        <h1 className="text-red-500 text-5xl">Todo App</h1>
        <form>
          <div>
            <label htmlFor="todoText">Todo Text</label>
            <input type="text" id="todoText" />
          </div>
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
}
