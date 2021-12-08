import React, { useState } from "react";
import { Alert } from '@material-ui/lab'

import PaypalSend from '../../assets/js/connect-paypal';

import AlertComp from '../AlertComp';
import { error, warning, info, success } from '../../constant/alertBg'

const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        {
          props.isETH?(
            <div>
              <span className="close-icon fw-bold" onClick={props.handleClose}>x</span>
              <p>Are you sure to buy the item with ETH?</p>
              <div className="d-flex justify-content-around mt-5">
                <button className="btn-secondary popup__btn" onClick={props.handleClose} >Cancel</button>
                <button className="btn-success popup__btn" onClick={() => {
                    props.enableAlert('Pay by ETH', 'info');
                    props.handleClose();
                    props.onBuy();}} >Buy</button>
              </div>
            </div>
          ):(
            <div>
              <span className="close-icon fw-bold" onClick={props.handleClose}>x</span>
            Are you sure to buy the item with USD?
        <div className="d-flex justify-content-around mt-5">
            <button className="btn-secondary popup__btn" onClick={props.handleClose} >Cancel</button>
            <button className="btn-success popup__btn" onClick={() => {
                props.enableAlert('Pay by USD', 'info');
                props.handleClose();
                props.onBuy();}} >Buy</button>
        </div>
        </div>
          )
        }
      </div>
    </div>
  );
};
 
export default Popup;