Page({
  data: {
    src: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
  },
  getImageInfo() {
    my.getImageInfo({
      src: this.data.src,
      success: (res) => {
        my.alert({
          content: JSON.stringify(res),
        });
      }
    })
  },

  getImageInfo_apFilePaths() {
    my.chooseImage({
      sourceType: ['camera', 'album'],
      count: 1,
      success: (res) => {
        // my.alert({
        //   content: JSON.stringify(res),

        // });

        my.getImageInfo({
          src: res.apFilePaths[0],
          success: (res) => {
            my.alert({
              content: 'success: ' + JSON.stringify(res),
            });
          },
          fail: (res) => {
            my.alert({
              content: 'fail：' + JSON.stringify(res),
            });
          },
        })
      },
      fail: () => {
        my.showToast({
          content: 'fail', // 文字内容
        });
      }
    })
  },

  getImageInfo_relativepath() {
    my.getImageInfo({
      src: 'image/ant.png',
      success: (res) => {
        my.alert({
          content: 'success: ' + JSON.stringify(res),
        });
      },
      fail: (res) => {
        my.alert({
          content: 'fail：' + JSON.stringify(res),
        });
      },
    })
  },
});