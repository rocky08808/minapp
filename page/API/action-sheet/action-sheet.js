Page({
  showActionSheet() {
    my.showActionSheet({
      title: 'ActionSheet',
      items: ['Menu one', 'Menu two', 'Menu three'],
      cancelButtonText: 'Canceled',
      success: (res) => {
        const btn = res.index === -1 ? 'Cancel' : 'the ' + res.index;
        my.alert({
          title: `You clicked ${btn} button`
        });
      },
    });
  },
});
