import lifecycle from '/util/lifecycle';

Page({
  ...lifecycle,
  data: {
    pageName: 'stability/stability',
    pageInfo: {
      pageId: 0,
    },
    curIndex: 0,
    arr: {
      onItemTap: 'onGridItemTap',
      list: [{
        icon: '/image/icon_component.png',
        activeIcon: "image/icon_component_HL.png",
        title: 'Basic component',
        entitle: 'Collapse',
        page: '/page/component/index'
      },{
        icon: '/image/icon_API.png',
        title: 'API',
        entitle: 'Tag',
        page: '/page/API/index/index'
      },{
        icon: '/image/icon_biz.png',
        title: 'Business component',
        entitle: 'Tag',
        page: '/page/biz/index'
      }]
    },
  },
  onGridItemTap(e) {
    const page = this.data.arr.list[e.target.dataset.index].page;
    my.navigateTo({ url: page })
  },
});
