import chatwork from '../index';
import _ from 'lodash';
import chai from 'chai';

const assert = chai.assert;

describe('Optionのテスト', () => {
  it('paramsが空のときformが存在しない', () => {
    const Cw = new chatwork('hoge');
    const actual = Cw.option('/me', 'GET');
    
    assert.isUndefined(actual.form);
  });

});
