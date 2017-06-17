import MockAdapter from 'axios-mock-adapter';
import assert from 'assert';
import Chai from 'chai';
import Chatwork from '../index';

const chai = Chai.assert;

describe('/roomsのテスト', () => {
  describe('POST', () => {
    it('/rooms', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);

      const mockRes = {
        room_id: 1234,
      };

      mock.onPost('/rooms').reply(200, mockRes);

      return cw.createChatroom({
        name: 'foo',
        description: 'Hello, world',
        iconPreset: 'group',
        membersAdminIds: [101, 150],
        membersMemberIds: [123],
        membersReadonlyIds: [],
      })
      .then(res => {
        assert(
          JSON.stringify(res.data) ===
          JSON.stringify(mockRes),
        );
      })
      .catch(err => {
        chai.fail(0, 1, err.message);
      });
    });
  });
});
