// 获取应用实例
const app = getApp();

Page({
  data: {
    appid: 'aaaaaaaa',
    websocketServer: 'The developer server interface address must be a wss protocol, and the domain name must be a legal domain name configured in the background.',
    sendMessageAbility: false,
    toSendMessage: 'test',
    closeLinkAbility: false,
    log: '',
  },

  onLoad() {
    // 注意： 回调方法的注册在整个小程序启动阶段只要做一次，调多次会有多次回调
    my.onSocketClose((res) => {
      my.alert({content: 'Connection is closed！'});
      this.setData({
        sendMessageAbility: false,
        closeLinkAbility: false,
      });
    });
    // 注意： 回调方法的注册在整个小程序启动阶段只要做一次，调多次会有多次回调
    my.onSocketOpen((res) => {
      my.alert({content: 'Connection is open！'});
      this.setData({
        sendMessageAbility: true,
        closeLinkAbility: true,
      });
    });

    my.onSocketError(function(res){
      my.alert('WebSocket Connection failed to open, please check!' + res);
    });

    // 注意： 回调方法的注册在整个小程序启动阶段只要做一次，调多次会有多次回调
    my.onSocketMessage((res) => {
      my.alert({content: 'Received data' + JSON.stringify(res)});
    });
  },

  onServerAddressComplete(e) {
    this.setData({
      websocketServer:e.detail.value,
    });
  },

  onSendMessageReady(e) {
    this.setData({
      toSendMessage:e.detail.value,
    });
  },

  connect_start() {
    my.connectSocket({
      url: this.data.websocketServer, // 开发者服务器接口地址，必须是 wss protocol，且域名必须是后台配置的合法域名
      success: (res) => {
        my.showToast({
          content: 'success', // 文字内容
        });
        my.alert('connectSocket return: ' + res)
      },
      fail:()=>{
        my.showToast({
          content: 'fail', // 文字内容
        });
      }
    });
  },


  send_start() {
    my.sendSocketMessage({
      data: this.data.toSendMessage, // 需要发送的内容
      success: (res) => {
        my.alert({content: 'Data transmission' + this.data.toSendMessage});
      },
    });
  },

  close_start() {
    my.closeSocket();
  },
});
