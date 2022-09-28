Page({
  onPullDownRefresh() {
    // this.startPullDownRefresh()
    console.log('onPullDownRefresh', new Date());
  },
  stopPullDownRefresh() {
    my.stopPullDownRefresh({
      complete(res) {
        console.log(res, new Date())
      }
    })
  },
  startPullDownRefresh(){
    my.startPullDownRefresh({
      complete(res){
        my.alert("start");
      }
    })
  }
});
