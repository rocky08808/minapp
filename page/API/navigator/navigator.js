Page({
  navigateTo() {
    my.navigateTo({ url: '../get-user-info/get-user-info' })
  },
  navigateBack() {
    my.navigateBack()
  },
  redirectTo() {
    my.redirectTo({ url: '../get-user-info/get-user-info' })
  },
  redirectTo_mainPage() {
    my.redirectTo({ url: '/page/component/index' })
  },
  redirectTo_currentPage() {
    my.redirectTo({ url: '/page/API/navigator/navigator' })
  },
  switchTab() {
    my.switchTab({
        url: '/page/component/index',
        success: () => {
          my.showToast({
            content: 'success',
            type: 'success',
            duration: 4000
          });
        },
        fail:()=>{
          my.showToast({
            content: 'fail', 
          });
        }
      }
    );
  },
})
