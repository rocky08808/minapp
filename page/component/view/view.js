Page({
  data: {
    pageName: 'component/view',
  },
  onLoad() {
    this.setData({
      returnIndex: getCurrentPages().length === 1,
    })
  },
  returnIndex() {
    my.switchTab({ url: '/page/component/index' });
  },
  onTap1(e) {
    console.log('onTap', e);
    my.alert({
      content: `onTap`,
    });
  
  },
  onTouchStart1(e) {
    console.log('onTouchStart', e);
    my.alert({
      content: `onTouchStart`,
    });
    
  },

  onTouchMove1(e){
    console.log('onTouchMove', e);
    my.showToast({
      type: 'success',
      content: 'onTouchMove',
      duration: 2000
    });
  },
  onTouchEnd1(e){
    console.log('onTouchEnd', e);
    my.showToast({
      type: 'success',
      content: 'onTouchEnd',
      duration: 2000
    });
  },
  onTouchCancel1(e){
    console.log('onTouchCancel', e);
    my.showToast({
      type: 'success',
      content: 'onTouchCancel',
      duration: 2000
    });
  },

  onLongTap1(e){
    console.log('onLongTap', e);
    my.showToast({
      type: 'success',
      content: 'onLongTap',
      duration: 2000
    });
  },

  onAppear1(e){
    console.log('onAppear', e);
    my.showToast({
      type: 'success',
      content: 'onAppear',
      duration: 2000
    });
  },
  onDisappear1(e){
    console.log('onDisappear', e);
    my.showToast({
      type: 'success',
      content: 'onDisappear',
      duration: 2000
    });
  },
  onFirstAppear1(e){
    console.log('onFirstAppear', e);
    my.showToast({
      type: 'success',
      content: 'onFirstAppear',
      duration: 2000
    });
  },
});
