Page({
  onLoad() {
    this.callback = (res) => {
        console.log('alpha: '+res.alpha+', beta: '+res.beta+', gamma: '+res.gamma)
    };
    this.isApiAvailable = my.canIUse('onDeviceMotionChange');
  },
  onDeviceMotionChange() {
    if (this.isApiAvailable) {
      my.onDeviceMotionChange(this.callback);
    } else {
      my.alert({
        title: 'API not available',
        content: 'my.onDeviceMotionChange() is not available'
      });
    }
  },
  offDeviceMotionChange(){
    if (my.canIUse('offDeviceMotionChange')){
      my.offDeviceMotionChange(this.callback);
    } else {
      my.alert({
        title: 'API not available',
        content: 'my.offDeviceMotionChange() is not available'
      });
    }
  },
  onUnload() {
    if (this.isApiAvailable) {
      my.offDeviceMotionChange(this.callback); 
    }
  }
});
