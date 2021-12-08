'use strict';

 // eslint-disable-line no-unused-vars
/**
 Shows details for an authorized payment, by ID.
 **/

class AuthorizationsGetRequest {

  constructor(authorizationId) {
    this.path = '/v2/payments/authorizations/{authorization_id}?';
    this.path = this.path.replace('{authorization_id}', encodeURIComponent(authorizationId));
    this.verb = 'GET';
    this.body = null;
    this.headers = {
      'Content-Type': 'application/json'
    };
  }
}

module.exports = {AuthorizationsGetRequest: AuthorizationsGetRequest};
