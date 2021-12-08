import React from "react";

const InfoPopup = props => {
  return (
    <div className="info-popup-box">
      <div className="info-box">
        <span className="info-close-icon" onClick={props.handleClose}>x</span>
        <div class = "content-info">
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default InfoPopup;