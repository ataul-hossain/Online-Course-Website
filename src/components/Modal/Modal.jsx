import React from "react";

import "./Modal.css";
import CheckPhone from "../CheckPhone/CheckPhone";

const Modal = ({ closeModal, user, videoId }) => {
  return (
    <>
      <div onClick={() => closeModal(false)} className="overlay"></div>
      <div className="modalContainer">
        <h2>ফ্রি ভিডিও দেখা শুরু করতে লগইন করুন</h2>
        <CheckPhone />
      </div>
    </>
  );
};

export default Modal;
