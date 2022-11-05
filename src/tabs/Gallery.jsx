import { Component } from 'react';
import * as ImageService from 'service/image-service';
import {
  SearchForm,
  Grid,
  GridItem,
  Text,
  Modal,
  ImageCard,
  Button,
} from 'components';

const GALLERY_STATUS = {
  idle: 'idle',
  resolved: 'resolved',
  rejected: 'rejected',
};

export class Gallery extends Component {
  state = {
    images: null,
    searchQuery: null,
    page: null,
    galleryStatus: GALLERY_STATUS.idle,
    ifLoadMorePossible: false,
    modalImg: null,
  };

  async componentDidUpdate(_, PrevState) {
    if (PrevState.searchQuery === this.state.searchQuery) return;

    try {
      const images = await ImageService.getImages(
        this.state.searchQuery,
        this.state.page
      );

      this.setState({
        images: [...images.photos],
        galleryStatus: GALLERY_STATUS.resolved,
      });
      this.setIfLoadMorePossible(images.total_results);
    } catch {
      this.setState({
        galleryStatus: GALLERY_STATUS.rejected,
      });
    }
  }

  onSearchFormSubmit = searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
    });
  };

  onLoadMoreClick = async () => {
    try {
      const images = await ImageService.getImages(
        this.state.searchQuery,
        this.state.page + 1
      );

      this.setState(prevState => ({
        images: [...prevState.images, ...images.photos],
        page: prevState.page + 1,
        galleryStatus: GALLERY_STATUS.resolved,
      }));
      this.setIfLoadMorePossible(images.total_results);
    } catch {
      this.setState({
        galleryStatus: GALLERY_STATUS.rejected,
      });
    }
  };

  setIfLoadMorePossible = totalResults => {
    const totalPages = Math.ceil(totalResults / 15);

    let ifLoadMorePossible = null;

    if (this.state.page >= totalPages) {
      ifLoadMorePossible = false;
    } else {
      ifLoadMorePossible = true;
    }

    this.setState({
      ifLoadMorePossible,
    });
  };

  onModalOpenClick = modalImg => {
    this.setState({
      modalImg,
    });
  };

  onModalClose = () => {
    this.setState({
      modalImg: null,
    });
  };

  render() {
    const { images, galleryStatus, ifLoadMorePossible, modalImg } = this.state;

    const renderGalleryByStatus = () => {
      if (galleryStatus === GALLERY_STATUS.idle) {
        return (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        );
      }

      if (galleryStatus === GALLERY_STATUS.resolved) {
        return (
          <>
            <Grid>
              {images.map(({ alt, src, id }) => {
                return (
                  <GridItem key={id}>
                    <ImageCard
                      alt={alt}
                      src={src.large}
                      onModalOpenClick={this.onModalOpenClick}
                    />
                  </GridItem>
                );
              })}
            </Grid>
          </>
        );
      }

      if (galleryStatus === GALLERY_STATUS.rejected) {
        return <Text textAlign="center">Something went wrong... 😭</Text>;
      }
    };

    return (
      <>
        <SearchForm onSubmit={this.onSearchFormSubmit} />
        {renderGalleryByStatus()}
        {ifLoadMorePossible && (
          <Button onLoadMoreClick={this.onLoadMoreClick} />
        )}

        {modalImg && (
          <Modal modalImg={modalImg} onModalClose={this.onModalClose} />
        )}
      </>
    );
  }
}
