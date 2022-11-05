import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    searchQuery: '',
  };

  async componentDidUpdate() {}

  onSearchFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
    });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSearchFormSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
