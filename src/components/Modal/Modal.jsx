import React from "react";

import "./Modal.css";
import CheckPhone from "../CheckPhone/CheckPhone";

const Modal = ({ closeModal, user, videoId }) => {
  return (
    <>
      <div onClick={() => closeModal(false)} className="overlay"></div>
      <div className="modalContainer">
        <CheckPhone />
      </div>
    </>
  );
};

export default Modal;
