Page({
  data: {
    title: 'Push notification',
    desc: 'please input the content you want to push',
    result: '',
    env: 3, // SIT / TEST1 / TEST2 / PROD
    envList: ['SIT', 'TEST1', 'TEST2', 'TEST4', 'PROD', 'SANDBOX'],
    pushUrl: 'http://13.244.227.218/v2/miniprogram/message/send',
    authUrl: 'https://vodapay-finmock.vfs.africa/mock/api/v2/authorizations/StandardMobileWalletApplyToken.htm',
    applyTokenUrl: 'http://13.244.227.218/v2/authorizations/applyToken',
    requestId: "6440088a16023553423166782182",
    accessToken: "000000000220210819KD1kdUuJSI74cu00080563",
    authClientId: "2021043002944344845773", 
    MyappId:"3460010085600739",
    //redirectUrl:"mini://platformapi/startapp?_ariver_appid=3460010085600739&query=param1%3Dvalue1%26param2%3Dvalue2",
    redirectUrl:"vodapaywallet://deeplink.htm?action=miniapp&miniappId=3460010085600739&query=name%3Dxxxx%26age%3D22",
    templates: [
        {
            "language": "EN",
            "templateParameters": {
                "title": "TestTestTest", 
                "content": "TestTestTestTestTestTestTestTestTestTestTestTest",
                "merchantName": "TestTestTestTestTest",
                "scheme": "vodapay.deeplink"
            }
        }
    ]
},
  onLoad() { 
    console.log('start to load page:', this.data.title);
  },
  onTitleInput(e) {
    let templates = this.data.templates
    templates[0].templateParameters.title = e.detail.value
    this.setData({
      templates : templates
    });
  },

   onContentInput(e) {
   let templates = this.data.templates
    templates[0].templateParameters.content = e.detail.value
    this.setData({
      templates : templates
    });
  },
  
  /**
   * 推送成功事件
   */
  onPush() {
    
    //申请notification权限
      my.getAuthCode({
      scopes: ['NOTIFICATION_PUSH'],
      success: ({ authCode }) => {
        // 1. get Authcode
        console.log('auth code: ', authCode);
        my.request({
          url: this.data.authUrl,
          method: 'POST',
          headers: {
            "env": this.data.envList[this.data.env]
          },
          data: {
            "grantType": "AUTHORIZATION_CODE",
            "authCode": authCode
          },
          timeout: 30000,
          dataType: 'json',
          success: (result) => {
            console.log('result: ', result);
            this.setData({accessToken: result.data.accessToken});
            //2.get accessToken
            this.sendMessage();
          },
          fail: (error) => {
            // my.hideLoading();
            this.setData({ loading: false });
            my.alert({ content: 'Apply token fail: ' + JSON.stringify(error) });
          }
        })
      },
      fail: (error) => {
        // my.hideLoading();
        this.setData({ loading: false });
        my.alert({ content: 'push notification fail:' + JSON.stringify(error) });
       },
    });
  },
    sendMessage() {
      my.alert({ content: 'sending , please wait a moment' });
      my.request({
      url: this.data.pushUrl,
          method: 'POST',
          headers: {
             "Client-Id": this.data.authClientId,
             "Request-Time": "2021-08-13T11:23:26.913+08:00",
             "Content-Type": "application/json; charset=UTF-8",            
             "Signature": "algorithm=RSA256, keyVersion=2, signature=testing_signatur"
          },
          data: {
            "requestId": this.randomName(28),
            "accessToken": this.data.accessToken,
            "authClientId": this.data.authClientId,
            "timeout": 0,
            "appId": this.data.MyappId,
            "templateCode": "SEND_INBOX_PUSH",
            "redirectUrl": this.data.redirectUrl,
            "templates": this.data.templates
          },
        
          timeout: 30000,
          dataType: 'json',
          success: (result) => {
            my.alert({content: 'push notification success!'});
          },
          fail: (error) => {
            // my.hideLoading();
            this.setData({ loading: false });
            my.alert({ content: 'push notification fail: ' + JSON.stringify(error) });
          }
  })

},
   randomName(len) {
    len = len || 28;
    let chars = 'abcdefghijkmnopqrstuvwxyz0123456789';
    let maxPos = chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
}
});
