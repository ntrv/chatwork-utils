import Chai from 'chai';
import Chatwork from '../../index';

const cw = new Chatwork(process.env.CW_APIKEY);

describe('Actual testing', () => {
  it('自分の未読数等を表示できる', () => cw.getMyStatus().catch((err) => {
    Chai.assert.fail(0, 1, err);
  }));
  it('自分の情報を表示できる', () => cw.me().catch((err) => {
    Chai.assert.fail(0, 1, err);
  }));
  it('自分へのリクエストを表示', () => cw.listIncomingRequests().catch((err) => {
    Chai.assert.fail(0, 1, err);
  }));
  it('自分のコンタクトを表示できる', () => cw.listMyContacts().catch((err) => {
    Chai.assert.fail(0, 1, err);
  }));
  it('自分の投稿を表示できる', () => cw.listMyMessages().catch((err) => {
    Chai.assert.fail(0, 1, err);
  }));
});
