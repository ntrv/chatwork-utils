import MockAdapter from 'axios-mock-adapter';
import assert from 'assert';
import Chai from 'chai';
import Chatwork from '../../index';

const chai = Chai.assert;

const cw = new Chatwork('apiKey');
const mock = new MockAdapter(cw.instance);

describe('/contactsのテスト', () => {
  describe('GET', () => {
    it('/contacts', () => {
      const mockRes = [
        {
          account_id: 123,
          room_id: 322,
          name: 'John Smith',
          chatwork_id: 'tarochatworkid',
          organization_id: 101,
          organization_name: 'Hello Company',
          department: 'Marketing',
          avatar_image_url: 'https://example.com/abc.png',
        },
      ];

      mock.onGet('/contacts').reply(200, mockRes);

      return cw.listMyContacts().then((res) => {
        assert(
          JSON.stringify(res.data) === JSON.stringify(mockRes),
        );
      })
        .catch((err) => {
          chai.fail(0, 1, err.message);
        });
    });
  });
});
