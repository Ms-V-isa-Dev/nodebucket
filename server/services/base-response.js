/**
 * Title: Nodebucket Capstone
 * Author: Verlee Washington
 * Date: 10/1/2020
 * Description: Base response
 */

class BaseResponse {
  constructor(httpCode, message, data) { // initializing data fields
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }

  toObject() {
    return { // return all fields in the base response
      'httpCode': this.httpCode,
      'message': this.message,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString() // return a time stamp of when call was made
    }
  }
}

module.exports = BaseResponse; // because we want to access this from another file
