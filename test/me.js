import MockAdapter from 'axios-mock-adapter';
import assert from 'assert';
import Chai from 'chai';
import Chatwork from '../index';

const chai = Chai.assert;

describe('/meのテスト', () => {
  it('GET /meのテスト', () => {
    const cw = new Chatwork('apiKey');
    const mock = new MockAdapter(cw.instance);

    const mockRes = {
      account_id: 123,
      room_id: 322,
      name: 'John Smith',
      chatwork_id: 'tarochatworkid',
      organization_id: 101,
      organization_name: 'Hello Company',
      department: 'Marketing',
      title: 'CMO',
      url: 'http://mycompany.com',
      introduction: 'Self Introduction',
      mail: 'taro@example.com',
      tel_organization: 'XXX-XXXX-XXXX',
      tel_extension: 'YYY-YYYY-YYYY',
      tel_mobile: 'ZZZ-ZZZZ-ZZZZ',
      skype: 'myskype_id',
      facebook: 'myfacebook_id',
      twitter: 'mytwitter_id',
      avatar_image_url: 'https://example.com/abc.png',
    };

    mock.onGet('/me').reply(200, mockRes);

    return cw.me()
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
