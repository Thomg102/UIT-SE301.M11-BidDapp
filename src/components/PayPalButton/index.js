import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

import _PayPalButton from 'react-paypal-button-v2';

// It doesn't work
/*
class PaypalButton extends React.Component {
  render() {
    const {
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
      amount,
      sourceEmail,
      destinationEmail,
      itemName
    } = this.props;
/*
    const order = (data, actions) =>{
        return actions.order.create({
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": currency,
                        "value": amount.toString(),
                    },
                    "payer":{
                        "email_address": sourceEmail,
                    },
                    "payee":{
                        "email_address": destinationEmail,
                    },
                    "description": "Mua bán " + itemName
                }
            ]
        });
    }

    const onAuthorize = (data, actions) =>
      actions.payment.execute()
        .then(() => {
          const payment = {
            paid: true,
            cancelled: false,
            payerID: data.payerID,
            paymentID: data.paymentID,
            paymentToken: data.paymentToken,
            returnUrl: data.returnUrl,
          };

          //onSuccess(payment);
        });

    return (
      <div>
        <_PayPalButton
        
        
          env={env}
          clientId={client}
          createOrder={order}
          onApprove={onAuthorize}
          onCancel={onCancel}
          onError={onError}
        />
      </div>
    );
  }
}

export default PaypalButton;
// */