'use strict';

 // eslint-disable-line no-unused-vars
/**
 Captures a payment for an order.
 **/

class OrdersCaptureRequest {

  constructor(orderId) {
    this.path = '/v2/checkout/orders/{order_id}/capture?';
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

  payPalRequestId(payPalRequestId) {
    this.headers['PayPal-Request-Id'] = payPalRequestId;
    return this;
  }

  prefer(prefer) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(orderActionRequest) {
    this.body = orderActionRequest;
    return this;
  }
}

module.exports = {OrdersCaptureRequest: OrdersCaptureRequest};
