import React, { Component } from 'react';
import { Button as ButtonStyled } from './Button.styled';
export class Button extends Component {
  render() {
    const { onLoadMoreClick } = this.props;
    return (
      <ButtonStyled type="button" onClick={onLoadMoreClick}>
        Load more
      </ButtonStyled>
    );
  }
}
