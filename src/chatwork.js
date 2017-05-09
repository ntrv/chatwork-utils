import chatworkRo from './chatworkRo';

/**
 * @access public
 * @desc For use Chatwork services
 */
export default class chatwork extends chatworkRo {

  /**
   * @return {Promise} Return response or error message.
   * @desc 自分に対するコンタクト承認依頼を承認する
   * @param {number} requestId - リクエストID
   */
  approveIncomingRequest(requestId) {
    return this.instance.put(`/incoming_requests/${requestId}`);
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc 自分に対するコンタクト承認依頼をキャンセルする
   * @param {number} requestId - リクエストID
   */
  rejectIncomingRequest(requestId) {
    return this.instance.delete(`/incoming_requests/${requestId}`);
  }
}
