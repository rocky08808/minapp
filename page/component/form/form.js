
Page({
  data: {},
  onSubmit(e) {
    my.alert({
      content: `data：${JSON.stringify(e.detail.value)}`,
    });
  },
  onReset() {
    
  },
});
