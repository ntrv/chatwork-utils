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
      const roomId = 423;

      const mockRes = {
        message_id: '1234',
      };

      mock.onPost(`/rooms/${roomId}/messages`)
        .reply(200, mockRes);

      return cw.createMessageChatroom(roomId, `
        Hello ChatWork!
      `)
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

    it('/rooms/{{roomId}}/tasks', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);
      const roomId = 357;

      const mockRes = {
        task_ids: [
          123,
          456,
        ],
      };

      mock.onPost(`/rooms/${roomId}/tasks`)
        .reply(200, mockRes);

      return cw.createTaskChatroom(roomId, {
        body: 'Buy Milk',
        limit: 1385996399,
        to_ids: [1, 3, 6],
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
  });

  describe('DELETE', () => {
    it('/rooms/{{roomId}}?action_type=leave', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);
      const roomId = 1234;

      const mockRes = {};

      mock.onDelete(`/rooms/${roomId}`)
        .reply(200, mockRes);

      return cw.leaveChatroom(roomId)
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

    it('/rooms/{{roomId}}?action_type=delete', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);
      const roomId = 1234;

      const mockRes = {};

      mock.onDelete(`/rooms/${roomId}`)
        .reply(200, mockRes);

      return cw.deleteChatroom(roomId)
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
  });
});
