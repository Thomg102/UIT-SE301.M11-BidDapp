'use strict';

 // eslint-disable-line no-unused-vars
/**
 Shows details for an order, by ID.
 **/

class OrdersGetRequest {

  constructor(orderId) {
    this.path = '/v2/checkout/orders/{order_id}?';
    this.path = this.path.replace('{order_id}', encodeURIComponent(orderId));
    this.verb = 'GET';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }
}

module.exports = {OrdersGetRequest: OrdersGetRequest};
