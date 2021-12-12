'use strict';

 // eslint-disable-line no-unused-vars
/**
 Shows details for a refund, by ID.
 **/

class RefundsGetRequest {

  constructor(refundId) {
    this.path = '/v2/payments/refunds/{refund_id}?';
    this.path = this.path.replace('{refund_id}', encodeURIComponent(refundId));
    this.verb = 'GET';
    this.body = null;
    this.headers = {
      'Content-Type' : 'application/json'
    };
  }
}

export {RefundsGetRequest as RefundsGetRequest};
