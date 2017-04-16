import chai from 'chai';
import assert from 'assert';

import Chatwork from '../index';

const cassert = chai.assert;

describe('Optionのテスト', () => {
  it('paramsが空のときformが存在しない', () => {
    const cw = new Chatwork('hoge');
    const actual = cw.option('/me', 'GET');

    cassert.isUndefined(actual.form);
  });

  it('Optionの値が想定した通りに生成されているか', () => {
    const cw = new Chatwork('fuga');
    const actual = cw.option('/room/123', 'POST', { body: 'foo' });
    const expected = {
      url: 'https://api.chatwork.com/v2/room/123',
      method: 'POST',
      headers: { 'X-ChatWorkToken': 'fuga' },
      json: true,
      form: { body: 'foo' },
    };

    assert(JSON.stringify(actual) === JSON.stringify(expected));
  });
});
