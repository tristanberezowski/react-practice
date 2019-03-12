import React, { Component } from "react";
import { generateRandomId } from "./utils";
import tasks from "./tasks.json";

class Loading extends Component {
  render() {
    return (
      <tr>
        <td colspan="2">Loading Tasks...</td>
      </tr>
    );
  }
}

class TodoListItem extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.task.taskName}</td>
        <td>
          <input
            type="checkbox"
            checked={this.props.task.finished}
            onClick={() => {
              this.props.toggleFinished("A12345678Z");
            }}
            id={this.props.task.id}
          />
        </td>
      </tr>
    );
  }
}

class NewTaskForm extends Component {
  render() {
    const onSubmit = event => {
      event.preventDefault();
      const taskName = event.target.elements.taskName.value;
      const taskId = generateRandomId();
      const newTask = {
        taskName: taskName,
        finished: false,
        id: taskId
      };
      this.props.addNewTask(newTask);
    };

    return (
      <form onSubmit={onSubmit}>
        <input type="text" name="taskName" />
        <button type="submit">Add</button>
      </form>
    );
  }
}
export default class TodoList extends Component {
  constructor(props) {
    super();
    this.state = { tasks: tasks };
    this.addNewTask = this.addNewTask.bind(this);
    this.toggleFinished = this.toggleFinished.bind(this);
  }

  addNewTask(newTask) {
    this.setState({ tasks: this.state.tasks.concat(newTask) });
  }

  toggleFinished(index) {
    let { tasks } = this.state;
    tasks[index].finished = !tasks[index].finished;
    this.setState({ tasks });
  }

  render() {
    const taskItems = this.state.tasks.map((task, index) => (
      <TodoListItem
        key={task.id}
        task={task}
        toggleFinished={() => this.toggleFinished(index)}
      />
    ));

    return (
      <div className="container">
        <h1>
          Get It Done! <br />
          <small>For the truly industrious</small>
        </h1>

        <table>
          <thead>
            <tr>
              <td>Task</td>
              <td>Done?</td>
            </tr>
          </thead>
          <tbody>{taskItems}</tbody>
        </table>

        <hr />
        <NewTaskForm addNewTask={this.addNewTask} />
      </div>
    );
  }
}
