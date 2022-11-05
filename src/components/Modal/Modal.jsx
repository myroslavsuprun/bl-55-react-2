import React, { Component } from 'react';

import { createPortal } from 'react-dom';

import { Overlay, ModalWrapper } from './Modal.Styled';

export class Modal extends Component {
  modalRoot = document.getElementById('modal-root');

  componentDidMount() {
    window.addEventListener('keydown', this.onWindowKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onWindowKeydown);
  }

  onWindowKeydown = e => {
    const buttonPressed = e.code;

    if (buttonPressed === 'Escape') {
      this.props.onModalClose();
    }
  };

  render() {
    const { modalImg, onModalClose } = this.props;
    const { src, alt } = modalImg;
    const markupToRender = (
      <Overlay onClick={onModalClose}>
        <ModalWrapper>
          <img src={src} alt={alt} />
        </ModalWrapper>
      </Overlay>
    );

    return createPortal(markupToRender, this.modalRoot);
  }
}
