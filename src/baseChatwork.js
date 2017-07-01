import axios from 'axios';

/**
 * @external {axios.requestConfig} https://github.com/mzabriskie/axios#request-config
 */

/**
 * @access protected
 * @desc Base Chatwork class only constructor
 */
export default class baseChatwork {
  /**
   * @desc Create Chatwork instance
   * @param {string} apikey - Chatwork API Token
   */
  constructor(apikey) {
    /**
     * @desc Set config defaults when create the axios instance
     * <https://github.com/mzabriskie/axios#instance-methods>
     *
     * @type {Object}
     * @property {function(url: string, config: axios.requestConfig)} instance.get
     * @property {function(url: string, config: axios.requestConfig)} instance.post
     * @property {function(url: string, config: axios.requestConfig)} instance.put
     * @property {function(url: string, config: axios.requestConfig)} instance.delete
     */
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
