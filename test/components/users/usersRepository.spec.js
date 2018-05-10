const expect = require('chai').expect;

const UserRepository = require('../../../components/users/usersRepository');

describe('UserRepository', () => {
  describe('#getUsers', () => {
    before((done) => {
      // given
      UserRepository.deleteAll()
        .then(() => UserRepository.saveUser({ nickname: 'test1', email: 'test1@test.com' }))
        .then(() => UserRepository.saveUser({ nickname: 'test2', email: 'test2@test.com' }))
        .then(() => done());
    });

    it('should get all users', (done) => {
      // when
      const params = {
        order:
        [
          [
            'nickname', 'DESC'
          ]
        ]
      };
      UserRepository.getUsers(params)
        .then(users => {
          // then
          expect(users.length).to.equal(2);
          done();
        });
    });

    it('should get test1 user', (done) => {
      // when
      const params = { where: { nickname: 'test1' } };
      UserRepository.getUsers(params)
        .then(users => {
          // then
          expect(users.length).to.equal(1);
          expect(users[0].nickname).to.equal('test1');
          expect(users[0].email).to.equal('test1@test.com');
          done();
        });
    });

    it('should get all users order by nickname desc', (done) => {
      // when
      const params = {
        order:
          [
            [
              'nickname', 'DESC'
            ]
          ]
      };
      UserRepository.getUsers(params)
        .then(users => {
          // then
          expect(users.length).to.equal(2);
          expect(users[0].nickname).to.equal('test2');
          expect(users[0].email).to.equal('test2@test.com');
          expect(users[1].nickname).to.equal('test1');
          expect(users[1].email).to.equal('test1@test.com');
          done();
        });
    });
  });

  describe('#getUser', () => {
    let testUser = null;

    before((done) => {
      // given
      UserRepository.deleteAll()
        .then(() => UserRepository.saveUser({ nickname: 'test', email: 'test@test.com' }))
        .then(function (user) {
          testUser = user;
          done();
        });
    });

    it('should get user', (done) => {
      // when
      UserRepository.getUser(testUser.id)
        .then(user => {
          // then
          expect(user.nickname).to.equal('test');
          expect(user.email).to.equal('test@test.com');
          done();
        });
    });
  });
});

