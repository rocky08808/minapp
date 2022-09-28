Page({
  watchShake() {
    my.watchShake({
      success: function() {
        console.log('Moved up')
        my.alert({ title:'Move the o.o'});
      }
    });
  },
});
