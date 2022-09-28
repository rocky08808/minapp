Page({

  backgroundColor() {

    my.setCanPullDown({
      canPullDown: true,
      complete: function (res) {
        // my.alert({ content: JSON.stringify(res) })
        my.setBackgroundColor({
          // backgroundColorTop: '#889912',
          // backgroundColorBottom: '#00BFFF',
          backgroundColor: '#FF0000', //red
          success: (result) => {
            my.alert({
              content: 'success: ' + JSON.stringify(result),
            });
          },
          fail: (error) => {
            my.alert({
              content: 'fail: ' + JSON.stringify(error),
            });
          },
          complete: (res) => {
            my.showToast({
              content:  'complete: ' + JSON.stringify(res),
            });
          },
        });

      }
    });

  },

});
