const UserRepository = require('./usersRepository');

function getUsers(params) {
  return UserRepository.getUsers(params);
}

function getUser(id) {
  return UserRepository.getUser(id);
}

function saveUser(params) {
  return UserRepository.saveUser(params);
}

function deleteAll() {
  return UserRepository.deleteAll();
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  saveUser: saveUser,
  deleteAll: deleteAll
};
