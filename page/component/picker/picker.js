Page({
  data: {
    array: [' China ', 'USA ',' Brazil ', 'Japan '],
    objectArray: [
      {
        id: 0,
        name: 'United States',
      },
      {
        id: 1,
        name: 'China',
      },
      {
        id: 2,
        name: 'Brazil',
      },
      {
        id: 3,
        name: 'Japan',
      },
    ],
    arrIndex: 0,
    index: 0
  },
  bindPickerChange(e) {
    console.log('Picker sends a selection change, carrying value ', e.detail.value);
    this.setData({
      index: e.detail.value,
    });
  },
  bindObjPickerChange(e) {
    console.log('Picker sends a selection change, carrying value ', e.detail.value);
    this.setData({
      arrIndex: e.detail.value,
    });
  },
});

