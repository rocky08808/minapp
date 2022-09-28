Page({
  data: {
    switch1: true,
  },
  switch1Change(e) {
    console.log('switch1 occur change event，Carry value', e.detail.value);
    this.setData({
      switch1: e.detail.value,
    });
  },
  switch2Change(e){
    console.log('switch2 occur change event，Carry value ', e.detail.value);
  },
});
