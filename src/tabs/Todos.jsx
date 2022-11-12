import { Component } from 'react';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

import { connect } from 'react-redux';
import { addTask, deleteTask, editTask } from 'redux/tasksSlice';

class Todos extends Component {
  state = {
    isEditing: false,
    editingTask: {},
  };

  onTaskDelete = id => {
    const { deleteTask } = this.props;
    const { isEditing } = this.state;

    if (isEditing) {
      this.toggleEditForm();
      this.clearEditingTask();
    }

    deleteTask(id);
  };

  onTodoEditClick = id => {
    const editingTask = this.props.tasks.find(({ id: stateId }) => {
      return stateId === id;
    });

    this.setState({
      editingTask,
    });

    this.toggleEditForm();
  };

  onEditFormSubmit = () => {
    const { editingTask } = this.state;
    const { editTask } = this.props;

    editTask(editingTask);
    this.toggleEditForm();
  };

  onEditFormCancel = () => {
    this.toggleEditForm();
    this.clearEditingTask();
  };

  onEditFormChange = text => {
    this.setState(prevState => ({
      editingTask: { text, id: prevState.editingTask.id },
    }));
  };

  toggleEditForm = () => {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  };

  clearEditingTask = () => {
    this.setState({
      editingTask: {},
    });
  };

  render() {
    const { isEditing, editingTask } = this.state;
    const { tasks, addTask } = this.props;

    const renderTodo = () => {
      if (tasks.length <= 0) {
        return (
          <Text textAlign="center">Nothing has been added here yet 😟</Text>
        );
      }

      return (
        <Grid>
          {tasks.map(({ text, id }, index) => (
            <GridItem key={id}>
              <Todo
                text={text}
                id={id}
                number={index + 1}
                onDelete={this.onTaskDelete}
                onEdit={this.onTodoEditClick}
              />
            </GridItem>
          ))}
        </Grid>
      );
    };

    return (
      <>
        {isEditing ? (
          <EditForm
            editingTask={editingTask}
            onSubmit={this.onEditFormSubmit}
            onCancel={this.onEditFormCancel}
            onChange={this.onEditFormChange}
          />
        ) : (
          <SearchForm onSubmit={addTask} />
        )}
        {renderTodo()}
      </>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
});

const TodosWrapped = connect(mapStateToProps, {
  addTask,
  deleteTask,
  editTask,
})(Todos);
export { TodosWrapped as Todos };
