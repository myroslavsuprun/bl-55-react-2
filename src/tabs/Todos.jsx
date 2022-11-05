import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    isEditing: false,
    currentTodo: {},
  };

  componentDidUpdate(_, prevState) {
    if (prevState.todos === this.state.todos) return;

    localStorage.setItem('todos', JSON.stringify(this.state.todos) || []);
  }

  onSearchFormSubmit = text => {
    const newTodo = { text, id: nanoid() };
    this.setState(prevState => ({ todos: [...prevState.todos, newTodo] }));
  };

  onTodoDeleteClick = id => {
    const todos = this.state.todos.filter(({ id: stateId }) => {
      if (stateId === id) {
        return false;
      }

      return true;
    });

    this.setState({
      todos,
    });
  };

  onTodoEditClick = id => {
    const currentTodo = this.state.todos.find(({ id: stateId }) => {
      if (stateId === id) {
        return true;
      }
      return false;
    });

    this.setState({
      currentTodo,
    });

    this.toggleEditForm();
  };

  toggleEditForm = () => {
    this.setState(prevState => ({ isEditing: !prevState.isEditing }));
  };

  onEditFormCancel = () => {
    this.toggleEditForm();
    this.setState({
      currentTodo: {},
    });
  };

  onEditFormChange = text => {
    this.setState(prevState => ({
      currentTodo: { text, id: prevState.currentTodo.id },
    }));
  };

  onEditFormSubmit = () => {
    const todos = this.state.todos.filter(todo => {
      if (this.state.currentTodo.id === todo.id) return false;

      return true;
    });

    this.setState(prevState => ({
      todos: [...todos, prevState.currentTodo],
    }));
    this.toggleEditForm();
  };

  render() {
    const { todos, isEditing, currentTodo } = this.state;

    const renderTodo = () => {
      if (todos.length <= 0) {
        return (
          <Text textAlign="center">Nothing has been added here yet 😟</Text>
        );
      }

      return (
        <Grid>
          {todos.map(({ text, id }, index) => (
            <GridItem key={id}>
              <Todo
                text={text}
                id={id}
                number={index + 1}
                onDelete={this.onTodoDeleteClick}
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
            currentTodo={currentTodo}
            onSubmit={this.onEditFormSubmit}
            onCancel={this.onEditFormCancel}
            onChange={this.onEditFormChange}
          />
        ) : (
          <SearchForm onSubmit={this.onSearchFormSubmit} />
        )}
        {renderTodo()}
      </>
    );
  }
}
