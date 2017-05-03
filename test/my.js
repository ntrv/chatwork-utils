import MockAdapter from 'axios-mock-adapter';
import assert from 'assert';
import Chai from 'chai';
import Chatwork from '../index';

const chai = Chai.assert;

describe('/myのテスト', () => {
  describe('GET', () => {
    it('/my/status', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);

      const mockRes = {
        unread_room_num: 2,
        mention_room_num: 1,
        mytask_room_num: 3,
        unread_num: 12,
        mention_num: 1,
        mytask_num: 8,
      };

      mock.onGet('/my/status').reply(200, mockRes);

      return cw.getMyStatus()
      .then(res => {
        assert(
          JSON.stringify(res.data) === JSON.stringify(mockRes),
        );
      })
      .catch(err => {
        chai.fail(0, 1, err.message);
      });
    });

    it('/my/tasks', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);

      const mockRes = config => [200,
        [
          {
            task_id: 3,
            room: {
              room_id: 5,
              name: 'Group Chat Name',
              icon_path: 'https://example.com/ico_group.png',
            },
            assigned_by_account: {
              account_id: config.params.assigned_by_account_id,
              name: 'Anna',
              avatar_image_url: 'https://example.com/def.png',
            },
            message_id: '13',
            body: 'buy milk',
            limit_time: 1384354799,
            status: config.params.status,
          },
        ],
      ];

      mock.onGet('/my/tasks').reply(mockRes);

      const config = {
        params: {
          assigned_by_account_id: 456,
          status: 'open',
        },
      };

      return cw.listMyTasks(
        config.params.assigned_by_account_id,
        config.params.status,
      )
      .then(res => {
        assert(
          JSON.stringify(res.data) === JSON.stringify(mockRes(config)[1]),
        );
      })
      .catch(err => {
        chai.fail(0, 1, err.message);
      });
    });
  });
});
