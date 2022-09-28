Page({
  onLoad() { },
  data: {},
  canIUse: () => {
    my.alert({
      content: my.canIUse("saveImage"),
    });
    // if (my.canIUse("saveImage")) {
    //   my.alert({
    //     content: "Yes",
    //   });
    // }
    // else {
    //   my.alert({
    //     content: "No",
    //   });
    // }
  },

  canIUse_property: () => {
    var result = my.canIUse('getStorage.object.key');
    my.alert({
      content: result,
    });
  },

  aaa() {
    my.call('aaa', {
      success: (res) => {

        my.alert({
          content: 'success： ' + JSON.stringify(res)
        });
      },
      fail: (error) => {

        my.alert({
          content: 'error: ' + JSON.stringify(error),
        });

        my.alert({
          content: error.errorMessage || error.error,
        });
      }
    });

  },

  jsapiTest() {
    my.call('jsapiTest', {
      success: (res) => {
        my.alert({
          content: 'success: ' + JSON.stringify(res)
        });

      },
      fail: (error) => {

        my.alert({
          content: 'error: ' + JSON.stringify(error),
        });

        my.alert({
          content: error.errorMessage || error.error,
        });
      }
    });

  },

});

