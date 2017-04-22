import chai from 'chai';
import _ from 'lodash';
import Chatwork from '../index';

const assert = chai.assert;

describe('Chatworkの基本的テスト', () => {
  it('正常にオブジェクトを作成可能か', () => {
    const cw = new Chatwork('hoge');
    assert.isTrue(_.isObject(cw.instance));
  });
  it('APIKeyがインスタンスに含まれているかどうか', () => {
    const apiKey = 'hoge';
    const cw = new Chatwork(apiKey);
    assert.equal(
      cw.instance.defaults.headers['X-ChatWorkToken'],
      apiKey,
    );
  });
});
