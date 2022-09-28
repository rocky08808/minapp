Page({
  onLoad() {
    this.callback = (res) => {
        consolel.log('x: '+res.x+', y: '+res.y+', z: '+res.z)
    };
    this.isApiAvailable = my.canIUse('onGyroscopeChange');
  },
  onGyroscopeChange() {
    if (this.isApiAvailable) {
      my.onGyroscopeChange(this.callback);
    } else {
      my.alert({
        title: 'API not available',
        content: 'my.onGyroscopeChange() is not available'
      });
    }
  },
  offGyroscopeChange(){
    if (my.canIUse('offGyroscopeChange')){
      my.offGyroscopeChange(this.callback);
    } else {
      my.alert({
        title: 'API not available',
        content: 'my.offGyroscopeChange() is not available'
      });
    }
  },
  onUnload() {
    if (this.isApiAvailable) {
      my.offGyroscopeChange(this.callback); 
    }
  }
});
