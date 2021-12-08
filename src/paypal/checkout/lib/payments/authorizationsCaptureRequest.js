
'use strict';

 // eslint-disable-line no-unused-vars
/**
 Captures an authorized payment, by ID.
 **/

class AuthorizationsCaptureRequest {

  constructor(authorizationId) {
    this.path = '/v2/payments/authorizations/{authorization_id}/capture?';
    this.path = this.path.replace('{authorization_id}', encodeURIComponent(authorizationId));
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

  requestBody(capture) {
    this.body = capture;
    return this;
  }
}

module.exports = {AuthorizationsCaptureRequest: AuthorizationsCaptureRequest};
