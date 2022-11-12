import { Component } from 'react';

import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export class Todo extends Component {
  render() {
    const { text, id, number, onDelete, onEdit } = this.props;

    const deleteButton = (
      <DeleteButton
        type="button"
        onClick={() => {
          onDelete(id);
        }}
      >
        <RiDeleteBinLine size={24} />
      </DeleteButton>
    );

    const editButton = (
      <EditButton
        type="button"
        onClick={() => {
          onEdit(id);
        }}
      >
        <RiEdit2Line size={24} />
      </EditButton>
    );

    return (
      <TodoWrapper>
        <Text textAlign="center" marginBottom="20px">
          TODO #{number}
        </Text>
        <Text>{text}</Text>
        {deleteButton}
        {editButton}
      </TodoWrapper>
    );
  }
}
