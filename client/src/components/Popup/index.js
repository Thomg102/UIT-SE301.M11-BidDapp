import React from "react";
import { useAlert } from 'react-alert'

const Popup = props => {
    const alert = useAlert()

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon fw-bold" onClick={props.handleClose}>x</span>
            Are you sure to buy the item?
        <div className="d-flex justify-content-around mt-5">
            <button className="btn-secondary popup__btn" onClick={props.handleClose} >Cancel</button>
            <button className="btn-success popup__btn" onClick={() => {
                alert.show(<div style={{ color: 'white' }}>Some Message</div>)
      }} >Buy</button>
        </div>
      </div>
    </div>
  );
};
 
export default Popup;