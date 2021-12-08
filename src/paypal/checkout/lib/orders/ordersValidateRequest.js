'use strict';

 // eslint-disable-line no-unused-vars
/**
 Validates a payment method and checks it for contingencies.
 **/

class OrdersValidateRequest {

  constructor(orderId) {
    this.path = '/v2/checkout/orders/{order_id}/validate-payment-method?';
    this.path = this.path.replace('{order_id}', encodeURIComponent(orderId));
    this.verb = 'POST';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  payPalClientMetadataId(payPalClientMetadataId) {
    this.headers['PayPal-Client-Metadata-Id'] = payPalClientMetadataId;
    return this;
  }

  requestBody(orderActionRequest) {
    this.body = orderActionRequest;
    return this;
  }
}

module.exports = {OrdersValidateRequest: OrdersValidateRequest};
