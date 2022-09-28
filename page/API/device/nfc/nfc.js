Page({
  onLoad() {
    this.callback = (res) => {
      if (res.messageType === 1) {
        my.sendHCEMessage({data: '6F16840B506369'})
      }
    };
  },
  getHCEState() {
    if (my.canIUse('getHCEState')) {
      my.getHCEState({
        complete: function(res) {
          my.alert({ content: JSON.stringify(res) })
        }
      });
    } else {
      my.alert({
        content: 'API is not available'
      });
    }
  },
  startHCE() {
    if (my.canIUse('startHCE')) {
      my.startHCE({
        aidList: ['F222222222'], complete: function(res) {
          my.alert({ content: JSON.stringify(res) })
        }
      });
    } else {
      my.alert({ content: 'API is not available' });
    }
  },
  stopHCE() {
    if (my.canIUse('stopHCE')) {
      my.stopHCE({
        complete: function(res) {
          my.alert({ content: JSON.stringify(res) })
        }
      });
    } else {
      my.alert({ content: 'API is not available' });
    }
  },
  sendHCEMessage() {
    if (my.canIUse('sendHCEMessage')) {
      my.sendHCEMessage({
        data: '6F16840B506369', complete: function(res) {
          my.alert({ content: JSON.stringify(res) })
        }
      })
    } else {
      my.alert({ content: 'API is not available' });
    }
  },
  onHCEMessage(){
    if (my.canIUse('onHCEMessage')){
      my.onHCEMessage(this.callback);
    } else {
      my.alert({ content: 'API is not available' });
    }
  },
  onUnload() {
    if (canIUse('stopHCE')) {
      my.stopHCE();
    }
  }
});
