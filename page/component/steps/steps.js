Page({
  data: {
    activeIndex: 1,
    failIndex: 0,
    items: [{
      title: 'Step 1',
    }, {
      title: 'Step 2',
    }, {
      title: 'Step 3',
    }],
    items2: [{
      title: 'Step 1',
      description: 'This is the description document in step 1. When there is enough text, it will wrap.',
      size:"100px",
      icon:"https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png",
      activeIcon:"https://gw.alipayobjects.com/mdn/rms_0cc295/afts/img/A*d3ftQZEjumIAAAAAAAAAAABjARQnAQ"
    }, {
      title: 'Step 2 also breaks the line if the title is long enough',
      description: 'This is step 2',
      size:"100px",
      icon:"https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png",
      activeIcon:"https://gw.alipayobjects.com/mdn/rms_0cc295/afts/img/A*d3ftQZEjumIAAAAAAAAAAABjARQnAQ"
    }, {
      title: 'Step 3',
      description: 'This is step 3',
      size:"100px",
      icon:"https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png",
      activeIcon:"https://gw.alipayobjects.com/mdn/rms_0cc295/afts/img/A*d3ftQZEjumIAAAAAAAAAAABjARQnAQ"
    }, {
      title: 'Step 4',
      description: 'No more than six words',
      size:"100px",
      icon:"https://gw.alipayobjects.com/zos/rmsportal/VBqNBOiGYkCjqocXjdUj.png",
      activeIcon:"https://gw.alipayobjects.com/mdn/rms_0cc295/afts/img/A*d3ftQZEjumIAAAAAAAAAAABjARQnAQ"
    }],
  },
  nextStep() {
    this.setData({
      activeIndex: this.data.activeIndex + 1,
    });
  },
  preStep() {
    this.setData({
      activeIndex: this.data.activeIndex - 1,
    });
  },
  setFailIndex() {
    this.setData({
      failIndex: 3,
    });
  },
  cancelFailIndex() {
    this.setData({
      failIndex: 0,
    });
  },
});