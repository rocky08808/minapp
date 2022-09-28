Page({
  data: {
    activeTab: 2,
    tabs: [
      { title: 'Option two', anchor: 'a', badgeType: 'dot' },
      { title: 'Option', anchor: 'b', badgeType: 'text', badgeText: 'new' },

      { title: 'No more than five words', anchor: 'c' },
      { title: 'Option four', anchor: 'd' },
      { title: 'Option five', anchor: 'e' },
      { title: 'Option six', anchor: 'f' },
    ],
  },
  handleChange(index) {
    this.setData({
      activeTab: index,
    });
  },
  onChange(index) {
    this.setData({
      activeTab: index,
    });
  },
});
