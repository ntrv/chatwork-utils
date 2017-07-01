import qs from 'qs';
import _ from 'lodash';
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

  /**
   * @return {Promise} Return response or error message.
   * @desc グループチャットを新規作成
   * @param {number} requestId - リクエストID
   */
  createChatroom(options) {
    return this.instance.post('/rooms',
      qs.stringify({
        description: options.description,
        members_admin_ids: _.join(options.membersAdminIds),
        members_member_ids: _.join(options.membersMemberIds),
        members_readonly_ids: _.join(options.membersReadonlyIds),
        icon_preset: options.iconPreset,
        name: options.name,
      }),
    );
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc チャットの名前、アイコンをアップデート
   * @param {number} roomId - チャットルームID
   * @param {Object} options - オプション引数
   * @param {string} options.description - グループチャットの概要説明テキスト
   * @param {string} options.iconPreset - グループチャットのアイコン種類
   * @param {string} options.name - グループチャットのチャット名
   */
  updateChatroom(roomId, options) {
    return this.instance.put(`/rooms/${roomId}`,
      qs.stringify({
        description: options.description,
        icon_preset: options.iconPreset,
        name: options.name,
      }),
    );
  }
}
