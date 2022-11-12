import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import { SearchFormStyled, FormBtn, InputSearch } from 'components';
import { BtnEdit } from './EditForm.styled';
import { useState } from 'react';

export const EditForm = ({ editingTask, onSubmit, onCancel, onChange }) => {
  const [inputValue, setInputValue] = useState(editingTask.text);

  const onInputChange = e => {
    const value = e.target.value;
    setInputValue(value);
    onChange(value);
  };

  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <SearchFormStyled onSubmit={onFormSubmit}>
      <BtnEdit type="button" onClick={onCancel}>
        <MdOutlineCancel size="16px" color="red" />
      </BtnEdit>

      <FormBtn type="submit">
        <RiSaveLine size="16px" color="green" />
      </FormBtn>

      <InputSearch
        placeholder="EDIT TODO"
        name="edit"
        required
        autoFocus
        value={inputValue}
        onChange={onInputChange}
      />
    </SearchFormStyled>
  );
};
