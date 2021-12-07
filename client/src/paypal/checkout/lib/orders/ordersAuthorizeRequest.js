'use strict';

 // eslint-disable-line no-unused-vars
/**
 Authorizes payment for an order. The response shows authorization details.
 **/

class OrdersAuthorizeRequest {

  constructor(orderId) {
    this.path = '/v2/checkout/orders/{order_id}/authorize?';
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

module.exports = {OrdersAuthorizeRequest: OrdersAuthorizeRequest};
