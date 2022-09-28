Page({
  data: {
    key: '',
    data: '',
    keySync: '',
    dataSync: '',
  },

  keyChange(e) {
    console.log(e);
    this.setData({
      key: e.detail.value,
    });
  },

  dataChange(e) {
    this.setData({
      data: e.detail.value,
    });
  },

  keyChangeSync(e) {
    console.log(e);
    this.setData({
      keySync: e.detail.value,
    });
  },

  dataChangeSync(e) {
    this.setData({
      dataSync: e.detail.value,
    });
  },

  getStorage() {
    var key = this.data.key;
    var data = this.data.data;
    console.log('data: ', this.data);
    if (key.length === 0) {
      this.setData({
        key: key,
        data: data,
      });

      my.alert({
        title: 'Failed to read data',
        content: 'key can not be empty',
      });
    } else {
      let that = this;
      my.getStorage({
        key,
        success(res) {
          my.alert({
            title: 'Read data successfully',
            content: "data: '" + JSON.stringify(res.data) + "'",
          });
        },
      });
      console.log('Read data successfully', my.getStorageSync({ key }).data);
    }
  },

  setStorage() {
    var key = this.data.key;
    var data = this.data.data;
    if (key.length === 0) {
      this.setData({
        key: key,
        data: data,
      });

      my.alert({
        title: 'Saving data failed',
        content: 'key can not be empty',
      });
    } else {
      let that = this;
      my.setStorage({
        key: key,
        data: data,
        success() {
          that.setData({
            key: key,
            data: data,
          });

          my.alert({
            title: 'Successfully storing data',
            content: `${key}: ${data}`,
          });
        },
      });
    }
  },

  removeStorage() {
    let that = this;
    my.removeStorage({
      key: that.data.key,
      success() {
        that.setData({
          key: '',
          data: '',
        });

        my.alert({
          title: 'Delete data successfully',
          content: '',
        });
      },
    });
  },
  clearStorage() {
    let that = this;
    my.clearStorage({
      key: that.data.key,
      success() {
        that.setData({
          key: '',
          data: '',
        });

        my.alert({
          title: 'Clear data successfully',
          content: '',
        });
      },
    });
  },
  getStorageInfo() {
    let that = this;
    my.getStorageInfo({
      success(res) {
        my.alert({
          content: JSON.stringify({
            keys: res.keys,
            currentSize: res.currentSize,
            limitSize: res.limitSize,
          }),
        });
      },
    });
  },

  getStorageSync() {
    var key = this.data.keySync;
    var data = this.data.dataSync;
    console.log('data: ', this.data);
    if (key.length === 0) {
      this.setData({
        keySync: key,
        dataSync: data,
      });

      my.alert({
        title: 'Failed to read data synchronously',
        content: 'key can not be empty',
      });
    } else {
      let res = my.getStorageSync({ key: key });
      if (!res.error) {
        my.alert({
          title: 'Successfully read data synchronously',
          content: "data: '" + JSON.stringify(res.data) + "'",
        });
      }
    }
  },

  setStorageSync() {
    var key = this.data.keySync;
    var data = this.data.dataSync;
    if (key.length === 0) {
      this.setData({
        keySync: key,
        dataSync: data,
      });

      my.alert({
        title: 'Failed to save data synchronously',
        content: 'key can not be empty',
      });
    } else {
      let res = my.setStorageSync({ key: key, data: data });
      if (!res.error) {
        this.setData({
          keySync: key,
          dataSync: data,
        });

        my.alert({
          title: 'Synchronous storage of data successfully',
          content: `${key}: ${data}`,
        });
      }
    }
  },

  removeStorageSync() {
    let res = my.removeStorageSync({ key: this.data.keySync });
    if (!res.error) {
      this.setData({
        keySync: '',
        dataSync: '',
      });

      my.alert({
        title: 'Synchronous deletion of data successfully',
        content: '',
      });
    }
  },
  clearStorageSync() {
    let res = my.clearStorageSync();
    if (!res.error) {
      this.setData({
        keySync: '',
        dataSync: '',
      });

      my.alert({
        title: 'Synchronous data clear success',
        content: '',
      });
    }
  },
  getStorageInfoSync() {
    let res = my.getStorageInfoSync();
    if (!res.error) {
      my.alert({
        content: JSON.stringify({
          keys: res.keys,
          currentSize: res.currentSize,
          limitSize: res.limitSize,
        }),
      });
    }
  },
});
