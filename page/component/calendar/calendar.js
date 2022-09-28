Page({
  data: {
    tagData: [
      { date: '2018-05-14', tag: 'Returning mortgage', tagColor: 5 },
      { date: '2018-05-28', tag: 'Provident fund', tagColor: 2 },
    ],
  },
  handleSelect() {},
  onMonthChange() {},
  onSelectHasDisableDate (dates) {
      console.warn('onSelectHasDisableDate', dates)
    },
});