 // eslint-disable-line no-unused-vars
/**
 Refunds a captured payment, by ID. For a full refund, include an empty payload in the JSON request body. For a partial refund, include an <code>amount</code> object in the JSON request body.
 **/

class CapturesRefundRequest {

  constructor(captureId) {
    this.path = '/v2/payments/captures/{capture_id}/refund?';
    this.path = this.path.replace('{capture_id}', encodeURIComponent(captureId));
    this.verb = 'POST';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  payPalRequestId(payPalRequestId) {
    this.headers['PayPal-Request-Id'] = payPalRequestId;
    return this;
  }

  prefer(prefer) {
    this.headers['Prefer'] = prefer;
    return this;
  }

  requestBody(refundRequest) {
    this.body = refundRequest;
    return this;
  }
}

module.exports = {CapturesRefundRequest: CapturesRefundRequest};
