Page({
  showLoading() {
    my.showLoading({
      content: 'Loading...',
      delay: '500',
    });
  },
  showLoading1() {
    my.showLoading({
      content: 'Loading...',
      delay: '500',
    });
    setTimeout(() => {
      my.hideLoading();
    }, 5000);
  },
  showLoading2() {
    my.showLoading({
      content: 'Loading...',
      delay: '2000',
    });
    setTimeout(() => {
      my.hideLoading();
    }, 1000);
  },

});
