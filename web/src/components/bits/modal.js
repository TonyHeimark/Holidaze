import React from "react";

const Modal = ({ setModalContentComponent, setModalShow, modalContentComponent }) => {
  return (
    <div className="modal">
      <div className="modal__box">
        <button
          className="modal__close-button"
          onClick={() => {
            setModalShow(false);
            setModalContentComponent(null);
          }}
        >
          X
        </button>
        <div className="modal__content">{modalContentComponent}</div>
      </div>
    </div>
  );
};

export default Modal;
