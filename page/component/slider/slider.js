const pageData = {};

for (let i = 1; i < 5; ++i) {
  (function (index) {
    pageData['slider' + index + 'change'] = function (e) {
      console.log('slider' + index + 'occurs a change event, carrying a value of', e.detail.value);
    };
  })(i);
}
Page(pageData);
