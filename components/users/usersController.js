const express = require('express');
const { check, param, query, validationResult } = require('express-validator/check');

const logger = require('../../helpers/logger');
const ErrorFormatter = require('../../helpers/errorFormatter');
const AjaxResponse = require('../../helpers/ajaxResponse');

const UserService = require('./usersService');

const router = express.Router();

/**
 * @api {get} /users Get users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {Object[]} users 유저 객체 배열
 * @apiSuccess {Number} users.id 유저 id
 * @apiSuccess {String} users.email 유저 이메일
 * @apiSuccess {String} users.nickname 유저 닉네임
 */
router.get('/', (req, res, next) => {
  UserService.getUsers().then(users => {
    res.send(AjaxResponse.success({ users: users }));
  }).catch(err => next(err));
});

/**
 * @api {get} /users/:id Get user
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiSuccess {Object} user 유저 객체
 * @apiSuccess {Number} user.id 유저 id
 * @apiSuccess {String} user.email 유저 이메일
 * @apiSuccess {String} user.nickname 유저 닉네임
 */
router.get('/:id', [
  param('id').isInt()
], (req, res, next) => {
  const errors = validationResult(req).formatWith(ErrorFormatter);
  if (!errors.isEmpty()) {
    logger.debug(errors.mapped());
    res.send(AjaxResponse.error(errors.array()));
    return;
  }

  UserService.getUser(req.params.id).then(user => {
    res.send(AjaxResponse.success({ user: user }));
  }).catch(err => next(err));
});

module.exports = router;
