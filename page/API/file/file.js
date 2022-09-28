Page({
  data: {
    tempFilePath: '',
    savedFilePath: '',
    amrFilePath: ''
  },
  onLoad() {
    my.getStorage({
      key: 'savedFilePath', // 缓存数据的 key
      success: (res) => {
        this.setData({
          savedFilePath: res.data ? res.data : '',
        });
      },
    });
  },
  chooseImage() {
    my.chooseImage({
      count: 1,
      success: (res) => {
        console.log('chooseImage', res);
        this.setData({
          tempFilePath: res.apFilePaths[0],
        });
      },
    });
  },
  saveFile() {
    if (this.data.tempFilePath.length > 0) {
      const that = this;
      my.saveFile({
        apFilePath: this.data.tempFilePath,
        success(res) {
          console.log('saveFile', res);
          that.setData({
            savedFilePath: res.apFilePath,
          });
          my.setStorage({ key: 'savedFilePath', data: res.apFilePath });
          my.alert({
            title: 'Successfully saved', // alert 框的标题
            content: `This file will still be available the next time you enter the app:${JSON.stringify(res)}`,
          });
        },
      });
    }


  },
  saveFile_amr() {
    if (this.data.amrFilePath.length > 0) {
      const that = this;
      my.saveFile({
        apFilePath: this.data.amrFilePath,
        success(res) {
          console.log('saveFile: ', res);
          that.setData({
            savedFilePath: res.apFilePath,
          });
          my.setStorage({ key: 'savedFilePath', data: res.apFilePath });
          my.alert({
            title: 'Successfully saved', // alert 框的标题
            content: `This file will still be available the next time you enter the app:${JSON.stringify(res)}`,
          });
        },
        fail: (res) => {
          my.alert({
            content: 'saveFile fail：' + JSON.stringify(res),
          });
        },

      });
    } else {
      my.downloadFile({
        url: 'https://cdn.tngdigital.com.my/app-resource/bindcard/bindcard_1.0.0_69065dc.amr',
        header: {
          'content-type': 'application/json',
          'test': 'ts'
        },

        success: (res) => {
          this.setData({
            amrFilePath: res.apFilePath,
          });
          console.log('downloadFile: ', res);
          const that = this;
          my.saveFile({
            apFilePath: this.data.amrFilePath,
            success(res) {
              console.log('saveFile: ', res);
              that.setData({
                savedFilePath: res.apFilePath,
              });
              my.setStorage({ key: 'savedFilePath', data: res.apFilePath });
              my.alert({
                title: 'Successfully saved', // alert 框的标题
                content: `This file will still be available the next time you enter the app:${JSON.stringify(res)}`,
              });
            },
            fail: (res) => {
              my.alert({
                content: 'saveFile fail：' + JSON.stringify(res),
              });
            },

          });
        },
        fail: (res) => {
          my.alert({
            content: 'downloadFile fail：' + JSON.stringify(res),
          });
        },

      });
    };


  },
  getFileInfo() {
    my.getFileInfo({
      apFilePath: this.data.tempFilePath,
      digestAlgorithm: 'sha1',
      success: (res) => {
        my.alert({
          title: 'File information',
          content: JSON.stringify(res),
        });
        console.log(JSON.stringify(res))
      }
    })
  },
  getFileInfo_md5() {
    my.getFileInfo({
      apFilePath: this.data.tempFilePath,
      digestAlgorithm: 'md5',
      success: (res) => {
        my.alert({
          title: 'File information',
          content: JSON.stringify(res),
        });
        console.log(JSON.stringify(res))
      }
    })
  },
  getSavedFileInfo() {
    my.getSavedFileInfo({
      apFilePath: this.data.savedFilePath,
      success: (res) => {
        my.alert({
          title: 'File information',
          content: JSON.stringify(res),
        });
        console.log(JSON.stringify(res))
      }
    })
  },
  getSavedFileList() {
    my.getSavedFileList({
      success: (res) => {
        my.alert({
          title: 'Saved file list',
          content: JSON.stringify(res),
        });
        console.log(JSON.stringify(res))
      }
    });
  },
  removeSavedFile() {
    my.getSavedFileList({
      success: (res) => {
        my.removeSavedFile({
          apFilePath: res.fileList[0].apFilePath,
          success: (res) => {
            my.alert({
              title: 'Successfully removed the file',
              content: JSON.stringify(res),
            });
            console.log('remove success')
          }
        })
      }
    });
  },
  clear() {
    my.setStorage({ key: 'savedFilePath', data: '' })
    this.setData({
      tempFilePath: '',
      savedFilePath: '',
    });
  },
});
