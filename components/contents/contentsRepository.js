const models = require('../../models');

const Content = models.Content;

const commonOptions = {
  include: [
    {
      association: 'user'
    }
  ]
};

function getContents(params) {
  const modelParams = Object.assign({}, params, commonOptions);
  return Content.findAll(modelParams);
}

function getContentsByUserId(userId) {
  const modelParams = Object.assign({}, commonOptions);
  modelParams.include[0].where = { id: userId };
  return Content.findAll(modelParams);
}

function getContent(id) {
  const options = Object.assign({}, commonOptions);
  return Content.findById(id, options);
}

function saveContent(params) {
  const modelParams = Object.assign({}, params);
  return Content.create(modelParams);
}

function deleteAll() {
  return Content.destroy({ truncate: true });
}

module.exports = {
  getContents: getContents,
  getContentsByUserId: getContentsByUserId,
  getContent: getContent,
  saveContent: saveContent,
  deleteAll: deleteAll
};
