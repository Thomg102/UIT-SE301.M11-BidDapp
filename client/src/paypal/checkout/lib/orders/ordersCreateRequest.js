'use strict';

 // eslint-disable-line no-unused-vars
/**
 Creates an order.
 **/

class OrdersCreateRequest {

  constructor() {
    this.path = '/v2/checkout/orders?';
    this.verb = 'POST';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }



  payPalPartnerAttributionId(payPalPartnerAttributionId) {
    this.headers['PayPal-Partner-Attribution-Id'] = payPalPartnerAttributionId;
    return this;
  }

  prefer(prefer) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(order) {
    this.body = order;
    return this;
  }
}

module.exports = {OrdersCreateRequest: OrdersCreateRequest};
