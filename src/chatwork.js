import baseChatwork from './baseChatwork';

export default class chatwork extends baseChatwork {

  me() {
    return this.instance.get('/me');
  }

  myStatus() {
    return this.instance.get('/my/status');
  }
}
