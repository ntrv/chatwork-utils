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
        .then((res) => {
          assert(
            JSON.stringify(res.data) ===
            JSON.stringify(mockRes),
          );
        })
        .catch((err) => {
          chai.fail(0, 1, err.message);
        });
    });

    it('/rooms/{{roomId}}/messages', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);
      const roomId = 12345;
      const mockRes = {
        message_id: '1234',
      };

      mock.onPost(`/rooms/${roomId}/messages`)
        .reply(200, mockRes);

      const message = `[To: 12345] 湯川秀樹さん
        [info][title]ぞうの卵の殻[/title]ぞうの卵はおいしいぞう
        ぞうの卵はおいしいぞう[/info]`;

      return cw.postMessage(roomId, message).then((res) => {
        assert(
          JSON.stringify(res.data) ===
          JSON.stringify(mockRes),
        );
      }).catch((err) => {
        chai.fail(0, 1, err.message);
      });
    });
  });

  describe('PUT', () => {
    it('/rooms/{{roomId}}', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);
      const roomId = 789;

      const mockRes = {
        room_id: roomId,
      };

      mock.onPut(`/rooms/${roomId}`)
        .reply(200, mockRes);

      return cw.updateChatroom(roomId, {
        name: 'MyGroupChat',
        iconPreset: 'star',
        description: 'Here is my group chatroom.',
      }).then((res) => {
        assert(
          JSON.stringify(res.data) ===
          JSON.stringify(mockRes),
        );
      }).catch((err) => {
        chai.fail(0, 1, err.message);
      });
    });

    it('/rooms/{{roomId}}/members', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);
      const roomId = 12345;

      const config = {
        admin_ids: [123, 542, 1001],
        member_ids: [10, 103],
        readonly_ids: [6, 11],
      };

      const mockRes = cfg => [200,
        [
          {
            admin: cfg.admin_ids,
            member: cfg.member_ids,
            readonly: cfg.readonly_ids,
          },
        ],
      ];

      mock.onPut(`/rooms/${roomId}/members`)
        .reply(mockRes);

      return cw.modifyChatroomMembers(roomId, {
        membersAdminIds: config.admin_ids,
        membersMemberIds: config.member_ids,
        membersReadonlyIds: config.readonly_ids,
      }).then((res) => {
        assert(
          JSON.stringify(res.data) ===
          JSON.stringify(mockRes),
        );
      }).catch((err) => {
        chai.fail(0, 1, err.message);
      });
    });
  });

  describe('DELETE', () => {
    it('/rooms/{{roomId}}?action_type=leave', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);
      const roomId = 789;
      const mockRes = {};

      mock.onDelete(`/rooms/${roomId}`)
        .reply(200, mockRes);

      return cw.leaveChatroom(roomId).then((res) => {
        assert(
          JSON.stringify(res.data) ===
          JSON.stringify(mockRes),
        );
      }).catch((err) => {
        chai.fail(0, 1, err.message);
      });
    });

    it('/rooms/{{roomId}}?action_type=delete', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);
      const roomId = 789;
      const mockRes = {};

      mock.onDelete(`/rooms/${roomId}`)
        .reply(200, mockRes);

      return cw.deleteChatroom(roomId).then((res) => {
        assert(
          JSON.stringify(res.data) ===
          JSON.stringify(mockRes),
        );
      }).catch((err) => {
        chai.fail(0, 1, err.message);
      });
    });
  });
});
