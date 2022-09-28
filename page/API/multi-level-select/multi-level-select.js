Page({
  openMultiLevelSelect() {
    my.multiLevelSelect({
        title: 'Multi-cascade selector',//级联选择标题
        list: [
        {
            name: "Hangzhou",//条目名称
            subList: [
                {
                    name: "West Lake District",
                    subList: [
                        {
                            name: "Gu Cui Street"
                        },
                        {
                            name: "Wenxin Street"
                        }
                    ]
                },
                {
                    name: "Shagncheng area",
                    subList: [
                        {
                            name: "Yan'an Street"
                        },
                        {
                            name: "Longxiangqiao Street"
                        }
                    ]
                }
            ]//级联子数据列表
        }],//级联数据列表
        success:(res)=>{
            my.alert({title:JSON.stringify(res)})
        }
    });
  }
})
