'use strict';
/* eslint-disable comma-dangle*/

 let OrdersAuthorizeRequest = require('./ordersAuthorizeRequest').OrdersAuthorizeRequest;
 let OrdersCaptureRequest = require('./ordersCaptureRequest').OrdersCaptureRequest;
 let OrdersCreateRequest = require('./ordersCreateRequest').OrdersCreateRequest;
 let OrdersGetRequest = require('./ordersGetRequest').OrdersGetRequest;
 let OrdersPatchRequest = require('./ordersPatchRequest').OrdersPatchRequest;
 let OrdersValidateRequest = require('./ordersValidateRequest').OrdersValidateRequest;

export {
  OrdersAuthorizeRequest as OrdersAuthorizeRequest,
  OrdersCaptureRequest as OrdersCaptureRequest,
  OrdersCreateRequest as OrdersCreateRequest,
  OrdersGetRequest as OrdersGetRequest,
  OrdersPatchRequest as OrdersPatchRequest,
  OrdersValidateRequest as OrdersValidateRequest,
};
