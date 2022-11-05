import React, { Component } from 'react';
import { CardItem } from './ImageCard.styled';

export class ImageCard extends Component {
  render() {
    const { src, alt, onModalOpenClick } = this.props;
    return (
      <CardItem>
        <img
          style={{ cursor: 'zoom-in' }}
          src={src}
          alt={alt}
          onClick={() => {
            onModalOpenClick({ alt, src });
          }}
        />
      </CardItem>
    );
  }
}
