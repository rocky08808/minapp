Page({
  data: {
    show: true,
    items: [
      { id: 1, value: 'clothes' },
      { id: 1, value: 'cupboard' },
      { id: 1, value: 'hangers' },
      { id: 3, value: 'digital product' },
      { id: 4, value: 'Security door' },
      { id: 5, value: 'chair' },
      { id: 7, value: 'monitor' },
      { id: 6, value: 'Some of the latest electronic products' },
      { id: 8, value: 'a certain certain TV game base' },
    ]
  },
  handleCallBack(data) {
    my.alert({
      content: data
    });
  },
  toggleFilter() {
    this.setData({
      show: !this.data.show,
    });
  }
});