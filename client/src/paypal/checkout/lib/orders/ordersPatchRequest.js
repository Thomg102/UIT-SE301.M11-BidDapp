'use strict';

 // eslint-disable-line no-unused-vars
/**
 Updates an order. You can update an order with `CREATED` or `APPROVED` status. You cannot update an order with `COMPLETED` status. The following attributes and objects are patchable:<ul><li><code>intent</code>. Supported operation is <code>replace</code>.</li><li><code>purchase_units</code>. Supported operations are <code>add</code> and <code>replace</code>.</li><li><code>purchase_units[].custom_id</code>. Supported operations are <code>add</code> and <code>replace</code> and <code>remove</code>.</li><li><code>purchase_units[].description</code>. Supported operations are <code>add</code> and <code>replace</code> and <code>remove</code>.</li><li><code>purchase_units[].payee.email</code>. Supported operations are <code>add</code> and <code>replace</code>.</li><li><code>purchase_units[].shipping_address</code>. Supported operations are <code>add</code> and <code>replace</code> and <code>remove</code>.</li><li><code>purchase_units[].soft_descriptor</code>. Supported operations are <code>add</code> and <code>replace</code> and <code>remove</code>.</li><li><code>purchase_units[].amount</code>. Supported operation is <code>replace</code>.</li></ul>
 **/

class OrdersPatchRequest {

  constructor(orderId) {
    this.path = '/v2/checkout/orders/{order_id}?';
    this.path = this.path.replace('{order_id}', encodeURIComponent(orderId));
    this.verb = 'PATCH';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  requestBody(patchRequest) {
    this.body = patchRequest;
    return this;
  }
}

module.exports = {OrdersPatchRequest: OrdersPatchRequest};
