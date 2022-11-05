import React, { Component } from 'react';
import { Button as ButtonStyled } from './Button.styled';
export default class Button extends Component {
  render() {
    const { onLoadMore } = this.props;
    return <ButtonStyled onClick={onLoadMore}>Load more</ButtonStyled>;
  }
}
