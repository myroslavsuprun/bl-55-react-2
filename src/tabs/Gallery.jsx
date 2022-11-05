import { Component } from 'react';
import { getImages } from '../API';
import * as ImageService from 'service/image-service';
import { SearchForm, Grid, GridItem, Text } from 'components';
import ImageCard from 'components/ImageCard/ImageCard';
import Button from 'components/Button/Button';

export class Gallery extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    totalPages: 0,
  };

  async componentDidUpdate(_, PrevState) {
    if (PrevState.searchQuery === this.state.searchQuery) {
      return;
    }

    const images = await getImages(this.state.searchQuery, this.state.page);

    this.setState({
      images: [...PrevState.images, ...images.photos],
      totalPages: images.total_results,
    });
  }

  onSearchFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
    });
  };

  onLoadMore = async () => {
    const images = await getImages(this.state.searchQuery, this.state.page + 1);

    this.setState(prevState => ({
      images: [...prevState.images, ...images.photos],
    }));

    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSearchFormSubmit} />
        {this.state.images.length < 1 ? (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        ) : (
          <>
            <Grid>
              {images.map(({ alt, src, id }) => {
                return (
                  <GridItem key={id}>
                    <ImageCard alt={alt} src={src.large} />
                  </GridItem>
                );
              })}
            </Grid>

            <Button onLoadMore={this.onLoadMore} />
          </>
        )}
      </>
    );
  }
}
