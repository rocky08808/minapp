Page({
  download() {
    my.downloadFile({
      url: 'https://gw.alipayobjects.com/mdn/rms_150082/afts/img/A*FmhcQZIeR7AAAAAAAAAAAABkARQnAQ',
      header: {
        'content-type': 'application/json',
        'test': 'ts'
      },
      success({ apFilePath }) {
        my.previewImage({
          urls: [apFilePath],
        });
        my.alert({
          content: 'success: ' + apFilePath,
        });
      },
      fail(res) {
        my.alert({
          content: res.errorMessage || res.error,
        });
      },
    });
  },
  download_file() {
    my.downloadFile({
      url: 'https://cdn.tngdigital.com.my/app-resource/bindcard/bindcard_1.0.0_69065dc.amr',
      header: {
        'content-type': 'application/json',
        'test': 'ts'
      },

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

    });
  },
})
