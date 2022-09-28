Page({
  data: {
    swipeIndex: null,
    right1: [{ type: 'delete', text: 'delete' }],
    right2: [{ type: 'edit', text: 'Cancel collection' }, { type: 'delete', text: 'delete' }],
  },
  onRightItemClick(e) {
    my.confirm({
      title: 'Warm prompt',
      content: `${e.index}-${e.extra}-${JSON.stringify(e.detail)}`,
      confirmButtonText: 'confirm',
      cancelButtonText: 'cancel',
      success: (result) => {
        if (result.confirm) {
          my.showToast({
            content: 'OK => Perform a sliding delete restore',
          });
          e.done();
        } else {
          my.showToast({
            content: 'Cancel => Slide delete status remains unchanged',
          });
        }
      },
    });
  },
  onItemClick(e) {
    my.alert({
      content: `dada${e.index}`,
    });
  },
  onSwipeStart(e) {
    this.setData({
      swipeIndex: e.index || null,
    });
  },
});