import React from "react";
import TodoDetail from "./TodoDetail";
import TodoUpdate from "./TodoUpdateForm";
class TodoItem extends React.Component {
  state = {
    update: true,
  };

  openForm = (id) => {
    console.log("Open form");
    this.props.getSelectedTodo(id);
    this.setState({ update: !this.state.update });
  };

  closeForm = () => {
    console.log("Closing form");
    this.setState({ update: !this.state.update });
  };

  render() {
    const component = this.state.update ? (
      <TodoDetail
        {...this.props}
        handleClick={this.openForm}
        closeForm={this.closeForm}
      />
    ) : (
      <TodoUpdate {...this.props} handleClick={this.closeForm} />
    );
    return component;
  }
}

export default TodoItem;
