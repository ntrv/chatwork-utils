import _ from 'lodash';

export default class baseChatwork {
  constructor(apikey) {
    this.apikey = apikey;
  }

  static url(endpoint) {
    return `https://api.chatwork.com/v2${endpoint}`;
  }

  option(endpoint, method, params = {}) {
    const options = {
      url: this.constructor.url(endpoint),
      method,
      headers: {
        'X-ChatWorkToken': this.apikey,
      },
      json: true,
    };

    if (!_.isEmpty(params)) {
      options.form = params;
    }
    return options;
  }

}
