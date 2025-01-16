import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children, toggleModal }) => {
  const el = document.createElement('div');
  useEffect (() => {
    modalRoot.appendChild(el);

    return () => {modalRoot.removeChild(el)}
  }, [toggleModal])

  return createPortal (
    <div className="modal-content">
      {children}
    </div>,
    el    
  )  
}

export default Modal