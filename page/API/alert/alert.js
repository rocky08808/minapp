Page({
  alert() {
    my.alert({
      title: 'Dear',
      content: 'Your bill for this month has been released',
      buttonText: 'I know',
      success: () => {
        my.alert({
          title: 'The user clicked "I know"',
        });
      }
    });
  },

  onReady() {
  	my.createIntersectionObserver().relativeToViewport({top: 100, bottom: 100}).observe('.logo', (res) => {
      // my.alert({content: 'res.intersectionRatio' + res.intersectionRatio});
      // my.alert({content: 'res.intersectionRect' + res.intersectionRect});
      // my.alert({content: 'res.relativeRect' + res.relativeRect});
      // my.alert({content: 'res.boundingClientRect' + res.boundingClientRect});
      // my.alert({content: 'res.time' + res.time});
      // my.alert({content: 'res.id' + res.id});
    });
  }

})
