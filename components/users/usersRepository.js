const models = require('../../models');

const User = models.User;

function getUsers(params) {
  const modelParams = Object.assign({}, params);
  return User.findAll(modelParams);
}

function getUser(id) {
  return User.findById(id);
}

function saveUser(params) {
  const modelParams = Object.assign({}, params);
  return User.create(modelParams);
}

function deleteAll() {
  return User.destroy({ truncate: true, });
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  saveUser: saveUser,
  deleteAll: deleteAll
};
