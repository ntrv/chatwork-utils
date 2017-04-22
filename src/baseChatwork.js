import axios from 'axios';

export default class baseChatwork {
  constructor(apikey) {
    this.instance = axios.create({
      baseURL: 'https://api.chatwork.com/v2/',
      timeout: 1000,
      headers: {
        'X-ChatWorkToken': apikey,
      },
      validateStatus: status => status >= 200 && status < 300,
      responseType: 'json',
    });
  }

}
