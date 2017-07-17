import MockAdapter from 'axios-mock-adapter';
import _ from 'lodash';
import assert from 'assert';
import Chai from 'chai';
import Chatwork from '../../index';

const chai = Chai.assert;

const cw = new Chatwork('apiKey');
const mock = new MockAdapter(cw.instance);

describe('/roomsのテスト', () => {
  describe('GET', () => {
    it('/rooms', () => {
      const mockRes = [
        {
          room_id: 123,
          name: 'Group Chat Name',
          type: 'group',
          role: 'admin',
          sticky: false,
          unread_num: 10,
          mention_num: 1,
          mytask_num: 0,
          message_num: 122,
          file_num: 10,
          task_num: 17,
          icon_path: 'https://example.com/ico_group.png',
          last_update_time: 1298905200,
        },
      ];

      mock.onGet('/rooms').reply(200, mockRes);

      return cw.listMyMessages()
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

    it('/rooms/{{roomId}}', () => {
      const roomId = 456;
      const mockRes = {
        room_id: roomId,
        name: 'Group Chat Name',
        type: 'group',
        role: 'admin',
        sticky: false,
        unread_num: 10,
        mention_num: 1,
        mytask_num: 0,
        message_num: 122,
        file_num: 10,
        task_num: 17,
        icon_path: 'https://example.com/ico_group.png',
        last_update_time: 1298905200,
        description: 'room description text',
      };

      mock.onGet(`/rooms/${roomId}`)
        .reply(200, mockRes);

      return cw.getRoomInfo(roomId)
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

    it('/rooms/{{roomId}}/members', () => {
      const roomId = 123;
      const mockRes = [
        {
          account_id: 123,
          role: 'member',
          name: 'John Smith',
          chatwork_id: 'tarochatworkid',
          organization_id: 101,
          organization_name: 'Hello Company',
          department: 'Marketing',
          avatar_image_url: 'https://example.com/abc.png',
        },
      ];

      mock.onGet(`/rooms/${roomId}/members`)
        .reply(200, mockRes);

      return cw.listRoomMembers(roomId)
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
      const roomId = '456';
      const mockRes = [
        {
          message_id: '5',
          account: {
            account_id: 123,
            name: 'Bob',
            avatar_image_url: 'https://example.com/ico_avatar.png',
          },
          body: 'Hello Chatwork!',
          send_time: 1384242850,
          update_time: 0,
        },
      ];

      mock.onGet(`/rooms/${roomId}/messages`)
        .reply(200, mockRes);

      return cw.listRoomMessages(roomId)
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

    it('/rooms/{{roomId}}/messages/{{messageId}}', () => {
      const roomId = 456;
      const messageId = '5';
      const mockRes = {
        message_id: messageId,
        account: {
          account_id: 123,
          name: 'Bob',
          avatar_image_url: 'https://example.com/ico_avatar.png',
        },
        body: 'Hello Chatwork!',
        send_time: 1384242850,
        update_time: 0,
      };

      mock.onGet(`/rooms/${roomId}/messages/${messageId}`)
        .reply(200, mockRes);

      return cw.getMessageInfo(roomId, messageId)
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
      const roomId = 567;
      const config = {
        params: {
          account_id: 123,
          assigned_by_account_id: 456,
          status: 'open',
        },
      };

      const accountId = config.params.account_id;
      const assignedByAccountId = config.params.assigned_by_account_id;
      const status = config.params.status;

      const mockRes = cfg => [200,
        [
          {
            task_id: 3,
            account: {
              account_id: cfg.params.account_id,
              name: 'Bob',
              avatar_image_url: 'https://example.com/abc.png',
            },
            assigned_by_account: {
              account_id: cfg.params.assigned_by_account_id,
              name: 'Anna',
              avatar_image_url: 'https://example.com/def.png',
            },
            message_id: '13',
            body: 'buy milk',
            limit_time: 1384354799,
            status: cfg.params.status,
          },
        ],
      ];

      mock.onGet(`/rooms/${roomId}/tasks`).reply(mockRes);

      return cw.listRoomTasks(roomId, accountId, assignedByAccountId, status)
        .then((res) => {
          assert(
            JSON.stringify(res.data) ===
            JSON.stringify(mockRes(config)[1]),
          );
        })
        .catch((err) => {
          chai.fail(0, 1, err.message);
        });
    });

    it('/rooms/{{roomId}}/tasks/{{taskId}}', () => {
      const roomId = 123;
      const taskId = 3;
      const mockRes = {
        task_id: taskId,
        account: {
          account_id: 123,
          name: 'Bob',
          avatar_image_url: 'https://example.com/abc.png',
        },
        assigned_by_account: {
          account_id: 456,
          name: 'Anna',
          avatar_image_url: 'https://example.com/def.png',
        },
        message_id: '13',
        body: 'buy milk',
        limit_time: 1384354799,
        status: 'open',
      };

      mock.onGet(`/rooms/${roomId}/tasks/${taskId}`)
        .reply(200, mockRes);

      return cw.getTaskInfo(roomId, taskId)
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

    it('/rooms/{{roomId}}/files', () => {
      const roomId = 135;
      const config = {
        params: {
          account_id: 123,
        },
      };
      const accountId = config.params.account_id;

      const mockRes = cfg => [200,
        [
          {
            file_id: 3,
            account: {
              account_id: cfg.params.account_id,
              name: 'Bob',
              avatar_image_url: 'https://example.com/ico_avatar.png',
            },
            message_id: '22',
            filename: 'README.md',
            filesize: 2232,
            upload_time: 1384414750,
          },
        ],
      ];

      mock.onGet(`/rooms/${roomId}/files`).reply(mockRes);

      return cw.listRoomFiles(roomId, accountId)
        .then((res) => {
          assert(
            JSON.stringify(res.data) ===
            JSON.stringify(mockRes(config)[1]),
          );
        })
        .catch((err) => {
          chai.fail(0, 1, err.message);
        });
    });

    it('/rooms/{{roomId}}/files/{{fileId}}', () => {
      const roomId = 456;
      const fileId = 3;

      const downloadUrl = 'https://sky-ct-wk-appdata.s3-ap-northeast-1.amazonaws.com/uploadfile/123/456/abc.dat?response-content-disposition=attachment%3Bfilename%2A%3DUTF-8%27%27foobar.txt&x-amz-security-token=XXX&AWSAccessKeyId=YYY&Expires=ZZZ&Signature=AAA';

      const mockRes = {
        file_id: 3,
        account: {
          account_id: 123,
          name: 'Bob',
          avatar_image_url: 'https://example.com/ico_avatar.png',
        },
        message_id: '22',
        filename: 'README.md',
        filesize: 2232,
        upload_time: 1384414750,
      };

      const mockResUrl = _.extend(mockRes, { download_url: downloadUrl });

      mock.onGet(`/rooms/${roomId}/files/${fileId}`, {
        params: {
          create_download_url: 0,
        },
      })
        .reply(200, mockRes);

      mock.onGet(`/rooms/${roomId}/files/${fileId}`, {
        params: {
          create_download_url: 1,
        },
      })
        .reply(200, mockResUrl);

      return Promise.all([
        cw.getFileInfo(roomId, fileId, 0),
        cw.getFileInfo(roomId, fileId, 1),
      ]).then((resps) => {
        assert(
          JSON.stringify(resps[0].data) ===
          JSON.stringify(mockRes),
        );
        assert(
          JSON.stringify(resps[1].data) ===
          JSON.stringify(mockResUrl),
        );
      })
        .catch((reason) => {
          chai.fail(0, 1, reason);
        });
    });
  });
});
