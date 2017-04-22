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

}
