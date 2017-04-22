import MockAdapter from 'axios-mock-adapter';
import assert from 'assert';
import Chai from 'chai';
import Chatwork from '../index';

const chai = Chai.assert;

describe('GET系APIのテスト', () => {
  it('/meのテスト', () => {
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
      assert(res.data === mockRes);
    })
    .catch(err => {
      chai.fail(0, 1, err.message);
    });
  });

  it('/my/statusのテスト', () => {
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

    return cw.myStatus()
    .then(res => {
      assert(res.data === mockRes);
    })
    .catch(err => {
      chai.fail(0, 1, err.message);
    });
  });
});
