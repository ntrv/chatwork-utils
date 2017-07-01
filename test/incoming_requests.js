import MockAdapter from 'axios-mock-adapter';
import assert from 'assert';
import Chai from 'chai';
import Chatwork from '../index';

const chai = Chai.assert;

describe('/incoming_requestsのテスト', () => {
  describe('GET', () => {
    it('/incoming_requests', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);

      const mockRes = [
        {
          request_id: 123,
          account_id: 363,
          message: 'hogehoge',
          name: 'John Smith',
          chatwork_id: 'tarochatworkid',
          organization_id: 101,
          organization_name: 'Hello Company',
          department: 'Marketing',
          avatar_image_url: 'https://example.com/abc.png',
        },
      ];

      mock.onGet('/incoming_requests').reply(200, mockRes);

      return cw.listIncomingRequests()
        .then((res) => {
          assert(
            JSON.stringify(res.data) === JSON.stringify(mockRes),
          );
        })
        .catch((err) => {
          chai.fail(0, 1, err.message);
        });
    });
  });

  describe('PUT', () => {
    it('/incoming_requests/{{request_id}}', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);
      const requestId = 12;

      const mockRes = {
        account_id: 363,
        room_id: 1234,
        name: 'John Smith',
        chatwork_id: 'tarochatworkid',
        organization_id: 101,
        organization_name: 'Hello Company',
        department: 'Marketing',
        avatar_image_url: 'https://example.com/abc.png',
      };

      mock.onPut(`/incoming_requests/${requestId}`)
        .reply(200, mockRes);

      return cw.approveIncomingRequest(requestId)
        .then((res) => {
          assert(
            JSON.stringify(res.data) === JSON.stringify(mockRes),
          );
        })
        .catch((err) => {
          chai.fail(0, 1, err.message);
        });
    });
  });

  describe('DELETE', () => {
    it('/incoming_requests/{{request_id}}', () => {
      const cw = new Chatwork('apiKey');
      const mock = new MockAdapter(cw.instance);
      const requestId = 12;
      const expectedCode = 200;

      mock.onDelete(`/incoming_requests/${requestId}`)
        .reply(expectedCode, {});

      return cw.rejectIncomingRequest(requestId)
        .then((res) => {
          assert(
            res.status === expectedCode,
          );
        })
        .catch((err) => {
          chai.fail(0, 1, err.message);
        });
    });
  });
});
