Page({
  openOne() {
    my.optionsSelect({
      title: "Repayment date selection",
      optionsOne: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      selectedOneIndex: 2,
      success(res) {
        my.alert({
          content: JSON.stringify(res, null, 2),
        });
      }
    });
  },
  openTwo() {
    my.optionsSelect({
      title: "Birth year and month selection",
      optionsOne: ["2014", "2013", "2012", "2011", "2010", "2009", "2008"],
      optionsTwo: ["January", 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      selectedOneIndex: 3,
      selectedTwoIndex: 5,
      success(res) {
        my.alert({
          content: JSON.stringify(res, null, 2),
        });
      }
    });
  },
});
