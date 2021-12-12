'use strict';

 // eslint-disable-line no-unused-vars
/**
 Voids, or cancels, an authorized payment, by ID. You cannot void an authorized payment that h as been fully captured.
 **/

class AuthorizationsVoidRequest {

  constructor(authorizationId) {
    this.path = '/v2/payments/authorizations/{authorization_id}/void?';
    this.path = this.path.replace('{authorization_id}', encodeURIComponent(authorizationId));
    this.verb = 'POST';
    this.body = null;
    this.headers = {
      'Content-Type' : 'application/json'
    };
  }
}

export {AuthorizationsVoidRequest as AuthorizationsVoidRequest};
