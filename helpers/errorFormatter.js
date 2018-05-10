const ErrorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${param}: ${msg}`;
};

module.exports = ErrorFormatter;
