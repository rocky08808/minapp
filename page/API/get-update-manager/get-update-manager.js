Page({
  data: {},
  onLoad() { },
  applyUpdate() {
    const updateManager = my.getUpdateManager();
    updateManager.applyUpdate({
      success: () => {
        my.alert({
          content: "success"
        })
      }
    });
  },
  onCheckForUpdate() {
    const updateManager = my.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      my.alert({ content: "success" })
    })
  },
  onUpdateReady() {
    const updateManager = my.getUpdateManager();
    updateManager.onUpdateReady(function () {
      my.alert({
        content: "success"
      })
    });
  },
  onUpdateFailed() {
    const updateManager = my.getUpdateManager();
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      my.alert({
        content: "success"
      })
    });
  },
});
