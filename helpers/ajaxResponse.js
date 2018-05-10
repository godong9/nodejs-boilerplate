const _ = require('lodash');

module.exports = {
  success: data => {
    const responseData = !_.isUndefined(data) ? data : {};
    return {
      status: 'SUCCESS',
      errors: null,
      data: responseData
    };
  },
  error: err => {
    const errors = _.isArray(err) ? err : [err];
    return {
      status: 'ERROR',
      errors: errors,
      data: null
    };
  }
};
