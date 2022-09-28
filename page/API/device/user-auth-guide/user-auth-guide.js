Page({
  showAuthGuide() {
    my.showAuthGuide({
      bizType: 'AppletPG',
      authType: 'LBS',
      success: (res) => {
        //shown为true时表示会显示权限引导弹窗，为false时表示用户已经授权
        // my.alert({content: 'success：'+JSON.stringify(res), });
        // my.alert({ content: 'success：' });

        my.showToast({
          content: 'success：' + JSON.stringify(res), // 文字内容
        });

      },
      fail: (error) => {
        my.alert({ content: 'failed：' + JSON.stringify(error), });
      },
    });
  },

  showAuthGuide_LBSSERVICE() {
    my.showAuthGuide({
      authType: 'LBSSERVICE',
      success: (res) => {
        //shown为true时表示会显示权限引导弹窗，为false时表示用户已经授权
        my.showToast({
          content: 'success：' + JSON.stringify(res), // 文字内容
        });
      },
      fail: (error) => {
        my.alert({ content: 'failed：' + JSON.stringify(error) });
      },
    });
  },

  showAuthGuide_MICROPHONE() {
    my.showAuthGuide({
      authType: 'MICROPHONE',
      success: (res) => {
        //shown为true时表示会显示权限引导弹窗，为false时表示用户已经授权
        my.showToast({
          content: 'success：' + JSON.stringify(res), // 文字内容
        });
      },
      fail: (error) => {
        my.alert({ content: 'failed：' + JSON.stringify(error), });
      },
    });
  },

  showAuthGuide_ADDRESSBOOK() {
    my.showAuthGuide({
      authType: 'ADDRESSBOOK',
      success: (res) => {
        //shown为true时表示会显示权限引导弹窗，为false时表示用户已经授权
        my.showToast({
          content: 'success：' + JSON.stringify(res), // 文字内容
        });
      },
      fail: (error) => {
        my.alert({ content: 'failed：' + JSON.stringify(error), });
      },
    });
  },

  showAuthGuide_CAMERA() {
    my.showAuthGuide({
      authType: 'CAMERA',
      success: (res) => {
        //shown为true时表示会显示权限引导弹窗，为false时表示用户已经授权
        my.showToast({
          content: 'success：' + JSON.stringify(res), // 文字内容
        });
      },
      fail: (error) => {
        my.alert({ content: 'failed：' + JSON.stringify(error), });
      },
    });
  },


  showAuthGuide_PHOTO() {
    my.showAuthGuide({
      authType: 'PHOTO',
      success: (res) => {
        //shown为true时表示会显示权限引导弹窗，为false时表示用户已经授权
        my.showToast({
          content: 'success：' + JSON.stringify(res), // 文字内容
        });
      },
      fail: (error) => {
        my.alert({ content: 'failed：' + JSON.stringify(error), });
      },
    });
  },
});
