
const newitems = [
  {
    thumb: 'https://gw.alipayobjects.com/zos/rmsportal/KXDIRejMrRdKlSEcLseB.png',
    title: 'Fixed to the head',
    arrow: true,
    sticky: true,
  },
  {
    title: 'The title text is not long, long, long, long, long, long, long, long, long, long, long.',
    arrow: true,
  },
  {
    title: 'The title text is very long, long, long, long, long, long, long, long, long, long and long.',
    arrow: true,
    textMode: 'wrap',
  },
  {
    title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
    extra: 'No arrow',
    textMode: 'wrap',
  },
  {
    title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
    extra: 'Child elements are vertically aligned',
    textMode: 'wrap',
    align: 'top',
  },
  {
    title: 'The title text is very long, long, long, long, long, long, long, long, long, long and long.',
    arrow: true,
    textMode: 'wrap',
  },
  {
    title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
    extra: 'No arrow',
    textMode: 'wrap',
  },
  {
    title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
    extra: 'Child elements are vertically aligned',
    textMode: 'wrap',
    align: 'top',
  },
  {
    title: 'The title text is very long, long, long, long, long, long, long, long, long, long and long.',
    arrow: true,
    textMode: 'wrap',
  },
  {
    title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
    extra: 'No arrow',
    textMode: 'wrap',
  },
  {
    title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
    extra: 'Child elements are vertically aligned',
    textMode: 'wrap',
    align: 'top',
  },
  {
    title: 'The title text is very long, long, long, long, long, long, long, long, long, long and long.',
    arrow: true,
    textMode: 'wrap',
  },
  {
    title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
    extra: 'No arrow',
    textMode: 'wrap',
  },
  {
    title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
    extra: 'Child elements are vertically aligned',
    textMode: 'wrap',
    align: 'top',
  },
];
Page({
  data: {
    items: [
      {
        title: 'Single list',
        extra: 'The detailed information',
      },
    ],
    items2: [
      {
        title: 'Multi-line list 1',
        arrow: true,
      },
      {
        title: 'Multi-line list 2',
        arrow: 'up',
      },
      {
        title: 'Multi-line list 3',
        arrow: 'down',
      },
      {
        title: 'Multi-line list 4',
        arrow: 'empty',
      },
      {
        title: 'Multi-line list 5',
      },
    ],
    items3: [
      {
        title: 'Double row list',
        brief: 'Description information',
        arrow: true,
      },
    ],
    items4: [
      {
        title: 'Double row list 1',
        brief: 'Description information',
        arrow: true,
      },
      {
        title: 'Double row list 2',
        brief: 'Description information',
        arrow: true,
      },
      {
        title: 'Double row list 3',
        brief: 'Description information',
        arrow: true,
      },
    ],
    itemsThumb: [
      {
        thumb: 'https://tfsimg.alipay.com/images/partner/T12rhxXkxcXXXXXXXX',
        title: 'Title text 1',
        extra: 'Description text 2',
        arrow: true,
      },
      {
        thumb: 'https://tfsimg.alipay.com/images/partner/T12rhxXkxcXXXXXXXX',
        title: 'Title text 3',
        arrow: true,
      },
      {
        thumb: 'https://tfsimg.alipay.com/images/partner/T12rhxXkxcXXXXXXXX',
        title: 'Title text 4',
        arrow: true,
      },
    ],
    itemsThumbMultiple: [
      {
        thumb: 'https://tfsimg.alipay.com/images/partner/T12rhxXkxcXXXXXXXX',
        title: 'Title text 5',
        brief: 'Description information',
      },
      {
        thumb: 'https://tfsimg.alipay.com/images/partner/T12rhxXkxcXXXXXXXX',
        title: 'Title text 6',
      },
      {
        thumb: 'https://tfsimg.alipay.com/images/partner/T12rhxXkxcXXXXXXXX',
        title: 'Title text 7',
      },
    ],
    items5: [
      {
        thumb: 'https://gw.alipayobjects.com/zos/rmsportal/KXDIRejMrRdKlSEcLseB.png',
        title: 'Fixed to the head',
        brief: 'Description information',
        arrow: true,
        sticky: true,
      },
      {
        title: 'The title text is not long, long, long, long, long, long, long, long, long, long, long.',
        arrow: true,
        align: 'middle',
      },
      {
        title: 'The title text is very long, long, long, long, long, long, long, long, long, long and long.',
        arrow: true,
        align: 'top',
      },
      {
        title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
        extra: 'No arrow',
        align: 'bottom',
      },
      {
        title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
        extra: 'Child elements are vertically aligned',
        align: 'top',
      },
      {
        title: 'The title text is very long, long, long, long, long, long, long, long, long, long and long.',
        arrow: true,
      },
      {
        title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
        extra: 'No arrow',
      },
      {
        title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
        extra: 'Child elements are vertically aligned',
        align: 'top',
      },
      {
        title: 'The title text is very long, long, long, long, long, long, long, long, long, long and long.',
        arrow: true,
      },
      {
        title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
        extra: 'No arrow',
      },
      {
        title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
        extra: 'Child elements are vertically aligned',
        align: 'top',
      },
      {
        title: 'The title text is very long, long, long, long, long, long, long, long, long, long and long.',
        arrow: true,
      },
      {
        title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
        extra: 'No arrow',
      },
      {
        title: 'The title text is very long, long, long, long, long, long, long, long, long, long, long, long, long, long, long.',
        extra: 'Child elements are vertically aligned',
        align: 'middle',
      },
    ],
  },
  onItemClick(ev) {
    my.alert({
      content: `Clicked on line ${ev.index}`,
    });
  },
  onScrollToLower() {
    const { items5 } = this.data;
    const newItems = items5.concat(newitems);
    console.log(newItems.length);
    this.setData({
      items5: newItems,
    });
  },
});
