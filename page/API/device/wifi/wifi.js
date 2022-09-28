Page({
  data: {
    connect_ssid: "ssid",
    connect_bssid: "bssid",
    connect_password: "password",
    connect_isWEP: false,
    register_ssid: "ssid",
    unregister_ssid: "ssid",
    wifilist: []
  },
  onLoad() {
    this.callback = (res) => {
      if (res.wifilist.length > 0) {
        this.setData({
          wifilist: res.wifilist
        })
      }
      console.log(res);
      my.alert({
        content: JSON.stringify(res)
      })
    };
    this.connectedCallback = (res) => {
      my.alert({
        content: JSON.stringify(res)
      });
    }
  },
  switch1Change(e) {
    this.setData({
      connect_isWEP: e.detail.value,
    });
  },
  startWifi() {
    if (my.canIUse('startWifi')) {
      my.startWifi({
        complete: function(res) {
          my.alert({ content: JSON.stringify(res) })
        }
      });
    } else {
      my.alert({
        title: 'API not available',
        content: 'my.startWifi() is not available'
      });
    }
  },
  stopWifi() {
    if (my.canIUse('stopWifi')) {
      my.stopWifi({
        complete: function(res) {
          my.alert({ content: JSON.stringify(res) })
        }
      });
    } else {
      my.alert({
        title: 'API not available',
        content: 'my.stopWifi() is not available'
      });
    }
  },
  connectWifi() {
    if (my.canIUse('connectWifi')) {
      my.connectWifi({
        SSID: this.data.connect_ssid,
        BSSID: this.data.connect_bssid,
        password: this.data.connect_password,
        isWEP: this.data.connect_isWEP,
        complete: function(res) {
          my.alert({ content: JSON.stringify(res) })
        }
      })
    } else {
      my.alert({ content: "API is not available" })
    }
  },
  getWifiList() {
    if (my.canIUse('getWifiList')) {
      my.getWifiList();
    } else {
      my.alert({ content: "API is not available" })
    }
  },
  onGetWifiList() {
    if (my.canIUse('onGetWifiList')) {
      my.onGetWifiList(this.callback);
    } else {
      my.alert({ content: "API is not available" })
    }
  },
  setWifiList() {
    if (my.canIUse('setWifiList')) {
      if (this.wifilist.length > 0) {
        my.setWifiList({
          wifilist: [{
            SSID: this.data.wifiList[0].SSID,
            BSSID: this.data.wifiList[0].BSSID,
            password: '123456'
          }],
          complete: function(res) {
            my.alert({
              content: JSON.stringify(res)
            });
          }
        })
      } else {
        my.setWifiList({
          wifilist: [],
          complete: function(res) {
            my.alert({
              content: JSON.stringify(res)
            });
          }
        })
      }
    } else {
      my.alert({ content: "API is not available" })
    }
  },
  onWifiConnected() {
    if (my.canIUse('onWifiConnected')) {
      my.onWifiConnected(this.connectedCallback);
    } else {
      my.alert({ content: "API is not available" })
    }
  },
  getConnectedWifi() {
    if (my.canIUse('getConnectedWifi')) {
      my.getConnectedWifi({
        complete: function(res) {
          my.alert({ content: JSON.stringify(res) })
        }
      })
    } else {
      my.alert({ content: "API is not available" })
    }
  },
  registerSSID() {
    if (my.canIUse('registerSSID')) {
      my.registerSSID({
        ssid: this.data.register_ssid, complete: function(res) {
          my.alert({
            content: JSON.stringify(res)
          });
        }
      })
    } else {
      my.alert({ content: "API is not available" })
    }
  },
  unregisterSSID() {
    if (my.canIUse('unregisterSSID')) {
      my.unregisterSSID({
        ssid: this.data.unregister_ssid, complete: function(res) {
          my.alert({
            content: JSON.stringify(res)
          });
        }
      })
    } else {
      my.alert({ content: "API is not available" })
    }
  }
});
