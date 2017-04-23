import baseChatwork from './baseChatwork';

export default class chatwork extends baseChatwork {

  me() {
    return this.instance.get('/me');
  }

  myStatus() {
    return this.instance.get('/my/status');
  }

  myTasks(assignedByAccountId, status) {
    return this.instance.get('/my/tasks', {
      params: {
        assigned_by_account_id: assignedByAccountId,
        status,
      },
    });
  }

  contacts() {
    return this.instance.get('/contacts');
  }

  incomingRequests() {
    return this.instance.get('/incoming_requests');
  }

  listMyMessages() {
    return this.instance.get('/rooms');
  }

  getRoomInfo(roomId) {
    return this.instance.get(`/rooms/${roomId}`);
  }

  listRoomMembers(roomId) {
    return this.instance.get(`/rooms/${roomId}/members`);
  }

  listRoomMessages(roomId, isForce = 0) {
    return this.instance.get(`/rooms/${roomId}/messages`, {
      params: {
        force: isForce,
      },
    });
  }

  getMessageInfo(roomId, messageId) {
    return this.instance.get(`/rooms/${roomId}/messages/${messageId}`);
  }

  listRoomTasks(roomId, accountId, assignedByAccountId, status = 'open') {
    return this.instance.get(`/rooms/${roomId}/tasks`, {
      params: {
        account_id: accountId,
        assigned_by_account_id: assignedByAccountId,
        status,
      },
    });
  }

  getTaskInfo(roomId, taskId) {
    return this.instance.get(`/rooms/${roomId}/tasks/${taskId}`);
  }

  listRoomFiles(roomId, accountId) {
    return this.instance.get(`/rooms/${roomId}/files`, {
      params: {
        account_id: accountId,
      },
    });
  }

  getFileInfo(roomId, fileId, isUrl = 0) {
    return this.instance.get(`/rooms/${roomId}/files/${fileId}`, {
      params: {
        create_download_url: isUrl,
      },
    });
  }

}
