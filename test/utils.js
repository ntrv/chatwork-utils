import assert from 'assert';
import Utils from '../lib/utils';

describe('utilsのテスト', () => {
  describe('isArrays', () => {
    it('Each test', () => {
      const source = [
        [0, 1],
        ['foo', 'bar'],
        [],
        'hoge',
        2,
        [1, { foo: 'bar' }],
      ];
      assert.deepStrictEqual(Utils.isArrays(source), [true, true, true, false, false, true]);
    });
  });

  describe('isAllTrue', () => {
    it('True test', () => {
      const source = [true, true, true];
      assert(Utils.isAllTrue(source) === true);
    });
    it('False test', () => {
      const source = [true, false, true];
      assert(Utils.isAllTrue(source) === false);
    });
  });

  describe('isAllArrays', () => {
    it('True test', () => {
      const source = [
        ['fuga', 1],
        ['foo', 'bar'],
        [],
        [1, { foo: 'bar' }],
      ];
      assert(Utils.isAllArrays(source) === true);
    });
    it('False test', () => {
      const source = [
        [0, 1],
        ['foo', 'bar'],
        [],
        'hoge',
        [1, { foo: 'bar' }],
      ];
      assert(Utils.isAllArrays(source) === false);
    });
  });
});
