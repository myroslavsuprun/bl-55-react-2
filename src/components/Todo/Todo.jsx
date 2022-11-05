import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ text, id, number, onDelete, onEdit }) => {
  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{number}
      </Text>
      <Text>{text}</Text>
      <DeleteButton
        type="button"
        onClick={() => {
          onDelete(id);
        }}
      >
        <RiDeleteBinLine size={24} />
      </DeleteButton>
      <EditButton
        type="button"
        onClick={() => {
          onEdit(id);
        }}
      >
        <RiEdit2Line size={24} />
      </EditButton>
    </TodoWrapper>
  );
};
