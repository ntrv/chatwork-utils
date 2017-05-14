import _ from 'lodash';

export default class utils {

  static isArrays(arrays) {
    return _.map(arrays, element => _.isArray(element));
  }

  static isAllTrue(array) {
    return _.reduce(array, (result, bool) => {
      result = result && bool;
      return result;
    });
  }

  static isAllArrays(arrays) {
    return this.isAllTrue(
      this.isArrays(arrays),
    );
  }

}
