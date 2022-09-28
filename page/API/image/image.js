let imageData;
Page({
  chooseImage() {
    my.chooseImage({
      success: (res) => {
        console.log(res);
        my.alert({
          content: JSON.stringify(res),
        });
      },
      fail: () => {
        my.showToast({
          content: 'fail', // 文字内容
        });
      },
      complete: () => {
        my.showToast({
          content: 'complete'
        })
      }
    })
  },
  chooseImage_camera() {
    my.chooseImage({
      sourceType: ['camera'],
      count: 2,
      success: (res) => {
        my.alert({
          content: JSON.stringify(res),

        });
      },
      fail: () => {
        my.showToast({
          content: 'fail', // 文字内容
        });
      }
    })
  },

  chooseImage_album() {
    my.chooseImage({
      sourceType: ['album'],
      count: 2,
      success: (res) => {
        my.alert({
          content: JSON.stringify(res),

        });
      },
      fail: () => {
        my.showToast({
          content: 'fail', // 文字内容
        });
      }
    })
  },
  previewImage() {
    my.previewImage({
      current: 2,
      urls: [
        'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
        'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg',
        'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg'
      ],

      success: (res) => {
        my.alert({
          content: 'success: ' + JSON.stringify(res),

        });
      },
      fail: (res) => {
        my.alert({
          content: 'fail: ' + JSON.stringify(res),

        });
      },
      complete: (res) => {
        my.showToast({
          content: 'complete: ' + JSON.stringify(res),
        });
      }

    });
  },


  previewImage_apfilePath() {
    my.chooseImage({
      sourceType: ['camera', 'album'],
      success: (res) => {
        my.previewImage({
          urls: [
            res.apFilePaths[0]
          ],
          success: (res) => {
           my.showToast({
          content: 'previewImage success: ' +  JSON.stringify(res),
        });
          },
        });

      },
      fail: (res) => {
        my.showToast({
          content: 'chooseImage fail' + JSON.stringify(res),
        });
      }
    })
  },

  saveImage() {
    my.saveImage({
      url: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
      showActionSheet: true,
      success: (res) => {
        my.alert({
          content: 'Successfully saved: ' + JSON.stringify(res),
        });
      },
    });
  },
  saveImage_showActionSheet_false() {
    my.saveImage({
      url: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
      showActionSheet: false,
      success: (res) => {
        my.alert({
          content: 'Successfully saved: ' + JSON.stringify(res),
        });
      },
    });
  },
});