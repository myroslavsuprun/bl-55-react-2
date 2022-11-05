import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    searchQuery: '',
  };

  onQueryInputChange = e => {
    const searchQuery = e.target.value;
    this.setState({
      searchQuery,
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.setState({
      searchQuery: '',
    });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <SearchFormStyled onSubmit={this.onFormSubmit}>
        <InputSearch value={searchQuery} onChange={this.onQueryInputChange} />
        <FormBtn>
          <FiSearch />
        </FormBtn>
      </SearchFormStyled>
    );
  }
}
