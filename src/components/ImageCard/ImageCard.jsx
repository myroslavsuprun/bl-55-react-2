import React, { Component } from 'react';
import { CardItem } from './ImageCard.styled';

export default class ImageCard extends Component {
  render() {
    const { src, alt } = this.props;
    return (
      <CardItem>
        <img src={src} alt={alt} />
      </CardItem>
    );
  }
}
