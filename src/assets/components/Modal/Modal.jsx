import React from "react";
import "../../css/modal.css";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <button className="close_button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
