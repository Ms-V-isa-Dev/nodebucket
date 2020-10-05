/**
 * Title: Nodebucket Capstone
 * Author: Verlee Washington
 * Date: 10/1/2020
 * Description: error response
 */

class ErrorResponse {// we are differentiating between the two error
  constructor(httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  toObject() {
    return {
      'httpCode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}

module.exports = ErrorResponse; // because we want to access this from another file
