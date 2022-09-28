Page({
  uploadFile() {
    my.chooseImage({
      chooseImage: 1,
      success: res => {
        const path = res.apFilePaths[0];
        console.log(path);
        my.uploadFile({
          url: 'http://httpbin.org/post',
          fileType: 'image',
          fileName: 'file',
          filePath: path,
          success: res => {
            // my.alert({ title: 'Upload success' });
            my.alert({ content: 'Upload success: ' + JSON.stringify(res) });
          },
          fail: function (res) {
            my.alert({ content: 'upload failed: ' + JSON.stringify(res) });
          },
          complete: res => {
            my.alert({ title: 'Upload complete' });
          },
        });
      },
    });
  },
  uploadFile_https() {
    my.chooseImage({
      chooseImage: 1,
      success: res => {
        const path = res.apFilePaths[0];
        console.log(path);
        my.uploadFile({
          url: 'https://httpbin.org/post',
          fileType: 'image',
          fileName: 'file',
          filePath: path,
          success: res => {
            // my.alert({ title: 'Upload success' });
            console.log('Upload success:', JSON.stringify(res));
            my.alert({ content: 'Upload success: ' + JSON.stringify(res) });
          },
          fail: function (res) {
            console.log('Upload success:', JSON.stringify(res));
            my.alert({ content: 'upload failed: ' + JSON.stringify(res) });
          },
          complete: res => {
            console.log('Upload complete:', JSON.stringify(res));
            // my.alert({ title: 'Upload complete' });
          },
        });
      },
    });
  },

  uploadFile_formData() {
    my.chooseImage({
      chooseImage: 1,
      success: res => {
        const path = res.apFilePaths[0];
        console.log(path);
        const formData = {
          userId: 'testUse001', //this.$state.merchant.userId
        }
        const filePath = path
        my.uploadFile({
          url: 'https://dev04httpd.tngdigital.com.my/api/oss/1.0/adminportal/generic/miniprogram',
          fileType: 'image',
          fileName: 'file',
          filePath: filePath,
          formData: formData,
          success: (res) => {
            my.alert({ title: 'my.uploadFile success:' + JSON.stringify(res) })
            console.log('success', JSON.stringify(res))
          },
          fail: function (res) {
            my.alert({ title: 'my.uploadFile fail:' + JSON.stringify(res) })
            console.log('fail', JSON.stringify(res))
          },
        })
      },
    });
  },
});
