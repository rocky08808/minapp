Page({
  onLoad() {
    this.callback = (res) => {
        console.log('x: '+res.x+', y: '+res.y+', z: '+res.z)
    };
    this.isApiAvailable = my.canIUse('onCompassChange');
  },
  onCompassChange() {
    if (this.isApiAvailable) {
      my.onCompassChange(this.callback);
    } else {
      my.alert({
        title: 'API not available',
        content: 'my.onCompassChange() is not available'
      });
    }
  },
  offCompassChange(){
    if (my.canIUse('onCompassChange')){
      my.offCompassChange(this.callback);
    } else {
      my.alert({
        title: 'API not available',
        content: 'my.offCompassChange() is not available'
      });
    }
  },
  onUnload() {
    if (this.isApiAvailable) {
      my.offCompassChange(this.callback); 
    }
  }
});
