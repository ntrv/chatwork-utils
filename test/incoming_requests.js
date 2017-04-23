import MockAdapter from 'axios-mock-adapter';
import assert from 'assert';
import Chai from 'chai';
import Chatwork from '../index';

const chai = Chai.assert;

describe('/incoming_requestsのテスト', () => {
  it('GET /incoming_requests', () => {
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

    return cw.incomingRequests()
    .then(res => {
      assert(
        JSON.stringify(res.data) === JSON.stringify(mockRes),
      );
    })
    .catch(err => {
      chai.fail(0, 1, err.message);
    });
  });
});
