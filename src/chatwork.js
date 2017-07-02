import qs from 'qs';
import _ from 'lodash';
import chatworkRo from './chatworkRo';

/**
 * @access public
 * @desc For use Chatwork services
 * @see http://developer.chatwork.com/ja/endpoints.html
 */
export default class chatwork extends chatworkRo {
  /**
   * @return {Promise} Return response or error message.
   * @desc 自分に対するコンタクト承認依頼を承認する
   * @param {number} requestId - リクエストID
   * @see http://developer.chatwork.com/ja/endpoint_incoming_requests.html#PUT-incoming_requests-request_id
   */
  approveIncomingRequest(requestId) {
    return this.instance.put(`/incoming_requests/${requestId}`);
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc 自分に対するコンタクト承認依頼をキャンセルする
   * @param {number} requestId - リクエストID
   * @see http://developer.chatwork.com/ja/endpoint_incoming_requests.html#DELETE-incoming_requests-request_id
   */
  rejectIncomingRequest(requestId) {
    return this.instance.delete(`/incoming_requests/${requestId}`);
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc グループチャットを新規作成
   * @param {Object} options - オプション引数
   * @param {string} options.description - チャット概要
   * @param {number[]} options.membersAdminIds - 管理者権限のユーザー
   * @param {number[]} options.membersMemberIds - メンバー権限のユーザー
   * @param {number[]} options.membersReadonlyIds - 閲覧のみ権限のユーザー
   * @param {string} options.iconPreset - アイコン種類
   * @param {string} options.name - グループチャット名
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms
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
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#PUT-rooms-room_id
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

  /**
   * @return {Promise} Return response or error message.
   * @desc グループチャットを退席する
   * @param {number} roomId - チャットルームID
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#DELETE-rooms-room_id
   */
  leaveChatroom(roomId) {
    return this.instance.delete(`/rooms/${roomId}`,
      qs.stringify({
        action_type: 'leave',
      }),
    );
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc グループチャットを削除する
   * @param {number} roomId - チャットルームID
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#DELETE-rooms-room_id
   */
  deleteChatroom(roomId) {
    return this.instance.delete(`/rooms/${roomId}`,
      qs.stringify({
        action_type: 'delete',
      }),
    );
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc チャットのメンバーを一括変更
   * @param {Object} options - オプション引数
   * @param {number[]} options.membersAdminIds - 管理者権限のユーザー
   * @param {number[]} options.membersMemberIds - メンバー権限のユーザー
   * @param {number[]} options.membersReadonlyIds - 閲覧のみ権限のユーザー
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#PUT-rooms-room_id-members
   */
  modifyChatroomMembers(roomId, options) {
    return this.instance.put(`/rooms/${roomId}/members`,
      qs.stringify({
        members_admin_ids: _.join(options.membersAdminIds),
        members_member_ids: _.join(options.membersMemberIds),
        members_readonly_ids: _.join(options.membersReadonlyIds),
      }),
    );
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc チャットに新しいメッセージを追加
   * @param {number} roomId - チャットルームID
   * @param {string} body - メッセージ内容
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms-room_id-messages
   */
  postMessage(roomId, body) {
    return this.instance.post(`/rooms/${roomId}/messages`,
      qs.stringify({
        body,
      }),
    );
  }
}
