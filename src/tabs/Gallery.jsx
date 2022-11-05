import { Component } from 'react';
import { getImages } from '../API';
import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
  };

  async componentDidUpdate(prevProps, PrevState) {
    if (PrevState.searchQuery === this.state.searchQuery) {
      return;
    }

    const images = await getImages(this.state.searchQuery, this.state.page);
    this.setState({ images });
  }

  onSearchFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
    });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSearchFormSubmit} />
        {this.state.images.length < 1 && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
      </>
    );
  }
}
