import React from "react";
import ReactDOM from "react-dom";

const ModalWrapper = ({ close, children }) => {
  const modalPortal = document.getElementById("modal-root");
  return ReactDOM.createPortal(
    <div className="modal-wrapper">{children}</div>,

    modalPortal
  );
};

export default ModalWrapper;
