Page({
  openDocument() {
    if (my.canIUse('openDocument')) {
      my.showLoading();
      my.downloadFile({
        url: 'https://gw.alipayobjects.com/os/basement_prod/0155bfea-000c-4e5b-a306-d90ef272dd46.pdf', // 下载文件地址
        success: ({ apFilePath }) => {
          my.hideLoading();
          my.openDocument({
            filePath: apFilePath,
            fileType: 'pdf',
            success: (res) => {
              my.alert({
                content: 'open pdf success'
              });
            }
          })
        },
      });
    } else {
      my.alert({ content: "API is not available" })
    }
  }
})
