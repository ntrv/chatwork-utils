import baseChatwork from './baseChatwork';

/**
 * @access public
 * @desc For use Chatwork Readonly services
 * @see http://developer.chatwork.com/ja/endpoints.html
 */
export default class chatworkRo extends baseChatwork {
  /**
   * @return {Promise} Return response or error message.
   * @desc 自分自身の情報を取得
   * @example
   * const cw = new Chatwork(apiKey);
   * cw.me()
   *   .then(res => {
   *     console.log(res.data);
   *     console.log(res.status);
   *     console.log(res.statusText);
   *     console.log(res.headers);
   *     console.log(res.config);
   *   })
   *   .catch(err => {
   *     if(err.response) {
   *       console.log(err.response.data);
   *       console.log(err.response.status);
   *       console.log(err.response.headers);
   *     } else if(err.request) {
   *       console.log(err.request);
   *     } else {
   *       console.log('Error', err.message);
   *     }
   *     console.log(err.config);
   *   });
   * @see http://developer.chatwork.com/ja/endpoint_me.html#GET-me
   */
  me() {
    return this.instance.get('/me');
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc 自分の未読数、未読To数、未完了タスク数を返す
   * @see http://developer.chatwork.com/ja/endpoint_my.html#GET-my-status
   */
  getMyStatus() {
    return this.instance.get('/my/status');
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc 自分のタスク一覧を取得する。(100件まで取得可能)
   * @param {number} assignedByAccountId - タスクの依頼者のアカウントID
   * @param {string} [status = 'open'] - タスクのステータス 'open' or 'done'
   * @see http://developer.chatwork.com/ja/endpoint_my.html#GET-my-tasks
   */
  listMyTasks(assignedByAccountId, status = 'open') {
    return this.instance.get('/my/tasks', {
      params: {
        assigned_by_account_id: assignedByAccountId,
        status,
      },
    });
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc 自分のコンタクト一覧を取得
   * @see http://developer.chatwork.com/ja/endpoint_contacts.html#GET-contacts
   */
  listMyContacts() {
    return this.instance.get('/contacts');
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc 自分に対するコンタクト承認依頼一覧を取得する(100件まで取得可能)
   * @see http://developer.chatwork.com/ja/endpoint_incoming_requests.html#GET-incoming_requests
   */
  listIncomingRequests() {
    return this.instance.get('/incoming_requests');
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc 自分のチャット一覧の取得
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms
   */
  listMyMessages() {
    return this.instance.get('/rooms');
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc チャットの名前、アイコン、種類(my/direct/group)を取得
   * @param {number} roomId - チャットルームのID
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id
   */
  getRoomInfo(roomId) {
    return this.instance.get(`/rooms/${roomId}`);
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc チャットのメンバー一覧を取得
   * @param {number} roomId - チャットルームのID
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-members
   */
  listRoomMembers(roomId) {
    return this.instance.get(`/rooms/${roomId}/members`);
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc チャットのメッセージ一覧を取得。パラメータ未指定だと前回取得分からの差分のみを返します。(最大100件まで取得)
   * @param {number} roomId - チャットルームのID
   * @param {number} [isForce = 0] - 1を指定すると未取得にかかわらず最新の100件を取得します
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-messages
   */
  listRoomMessages(roomId, isForce = 0) {
    return this.instance.get(`/rooms/${roomId}/messages`, {
      params: {
        force: isForce,
      },
    });
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc メッセージ情報を取得
   * @param {number} roomId - チャットルームのID
   * @param {string} messageId - 参照するメッセージのID
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-messages-message_id
   */
  getMessageInfo(roomId, messageId) {
    return this.instance.get(`/rooms/${roomId}/messages/${messageId}`);
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc チャットのタスク一覧を取得 (100件まで取得可能)
   * @param {number} roomId - チャットルームのID
   * @param {number} accountId - タスクの担当者のアカウントID
   * @param {number} assignedByAccountId - タスクの依頼者のアカウントID
   * @param {string} [status = 'open'] - タスクのステータス 'open' or 'done'
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-tasks
   */
  listRoomTasks(roomId, accountId, assignedByAccountId, status = 'open') {
    return this.instance.get(`/rooms/${roomId}/tasks`, {
      params: {
        account_id: accountId,
        assigned_by_account_id: assignedByAccountId,
        status,
      },
    });
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc タスク情報を取得
   * @param {number} roomId - チャットルームのID
   * @param {number} taskId - 参照するタスクのID
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-tasks-task_id
   */
  getTaskInfo(roomId, taskId) {
    return this.instance.get(`/rooms/${roomId}/tasks/${taskId}`);
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc チャットのファイル一覧を取得 (100件まで取得可能)
   * @param {number} roomId - チャットルームのID
   * @param {number} accountId - アップロードしたユーザーのアカウントID
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-files
   */
  listRoomFiles(roomId, accountId) {
    return this.instance.get(`/rooms/${roomId}/files`, {
      params: {
        account_id: accountId,
      },
    });
  }

  /**
   * @return {Promise} Return response or error message.
   * @desc ファイル情報を取得
   * @param {number} roomId - チャットルームのID
   * @param {number} fileId - 参照するファイルのID
   * @param {number} [isUrl = 0] - 1のときダウンロードする為のURLを生成する
   * @see http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-files-file_id
   */
  getFileInfo(roomId, fileId, isUrl = 0) {
    return this.instance.get(`/rooms/${roomId}/files/${fileId}`, {
      params: {
        create_download_url: isUrl,
      },
    });
  }
}
