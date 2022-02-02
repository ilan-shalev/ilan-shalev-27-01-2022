import React from "react";
import reactDom from "react-dom";
import Styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={Styles.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={Styles.modal}>
      <div className={Styles.content}>{props.children}</div>
    </div>
  );
};

const portalElementLocation = document.getElementById("overlays");

export default function Modal(props) {
  return (
    <>
      {reactDom.createPortal(<Backdrop onClick={props.onClose}/>, portalElementLocation)}
      {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElementLocation)}
    </>
  );
}
