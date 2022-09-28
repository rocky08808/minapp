Page({
  onLoad() {
    this.callback = (res) => {
        var levelString = 'iOS device, no level.';
        switch (res.level) {
          case 10:
            levelString = 'Android device, level = TRIM_MEMORY_RUNNING_LOW';
            break;
          case 15:
            levelString = 'Android device, level = TRIM_MEMORY_RUNNING_CRITICAL';
            break;
        }
        my.alert({
          title: 'receive low memory warning',
          content: levelString
        });
    };
    this.isApiAvailable = my.canIUse('onMemoryWarning');
  },
  onMemoryWarning() {
    if (this.isApiAvailable) {
      my.onMemoryWarning(this.callback);
    } else {
      my.alert({
        content: 'my.onMemoryWarning() is not available'
      });
    }
  },
  offMemoryWarning(){
      if (my.canIUse('offMemoryWarning')){
        my.offMemoryWarning(this.callback);
      } else {
        my.alert({
        content: 'my.offMemoryWarning() is not available'
      });
      }
  },
  onUnload() {
    if (this.isApiAvailable) {
      my.offMemoryWarning(this.callback); 
    }
  }
});
