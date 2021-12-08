 // eslint-disable-line no-unused-vars
/**
 Shows details for a captured payment, by ID.
 **/

class CapturesGetRequest {

  constructor(captureId) {
    this.path = '/v2/payments/captures/{capture_id}?';
    this.path = this.path.replace('{capture_id}', encodeURIComponent(captureId));
    this.verb = 'GET';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }
}

module.exports = {CapturesGetRequest: CapturesGetRequest};
