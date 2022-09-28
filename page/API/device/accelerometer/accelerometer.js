Page({
  onLoad() {
    this.callback = (res) => {
        console.log('x: '+res.x+', y: '+res.y+', z: '+res.z)
    };
    this.isApiAvailable = my.canIUse('onAccelerometerChange');
  },
  onAccelerometerChange() {
    if (this.isApiAvailable) {
      my.onAccelerometerChange(this.callback);
    } else {
      my.alert({
        title: 'API not available',
        content: 'my.onAccelerometerChange() is not available'
      });
    }
  },
  offAccelerometerChange(){
    if (my.canIUse('offAccelerometerChange')){
      my.offAccelerometerChange(this.callback);
    } else {
      my.alert({
        title: 'API not available',
        content: 'my.offAccelerometerChange() is not available'
      });
    }
  },
  onUnload() {
    if (this.isApiAvailable) {
      my.offAccelerometerChange(this.callback); 
    }
  }
});
