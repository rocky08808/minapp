Page({
  showToastSuccess() {

    setTimeout(() => {
      //5秒后隐藏返回首页按钮
      my.showToast({
        type: 'success',
        content: 'Successful operation',
        duration: 3000,
        success: () => {
          my.alert({
            title: 'toast disappeared',
          });
        },
      });

    }, 8000);
    // my.showToast({
    //   type: 'success',
    //   content: 'Successful operation',
    //   duration: 3000,
    //   success: () => {
    //     my.alert({
    //       title: 'toast disappeared',
    //     });
    //   },
    // });
  },
  showToastFail() {
    my.showToast({
      type: 'fail',
      content: 'operation failed',
      duration: 3000,
      success: () => {
        my.alert({
          title: 'toast disappeared',
        });
      },
    });
  },
  showToastException() {
    my.showToast({
      type: 'exception',
      content: 'network anomaly',
      duration: 3000,
      success: () => {
        my.alert({
          title: 'toast disappeared',
        });
      },
    });
  },
  showToastNone() {
    my.showToast({
      type: 'none',
      content: 'remind',
      duration: 3000,
      success: () => {
        my.alert({
          title: 'toast disappeared',
        });
      },
    });
  },
  hideToast() {
    my.hideToast()
  },
})
