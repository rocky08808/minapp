Page({
  data: {
    longitude: '120.126293',
    latitude: '30.274653',
    name: 'Huanglong Vanke Center...',
    address: '77 xueyuan road',
  },
  chooseLocation() {
    var that = this
    my.chooseLocation({
         success:(res)=>{
          console.log(JSON.stringify(res))
          that.setData({
            longitude:res.longitude,
            latitude:res.latitude,
            name:res.name,
            address:res.address
          })
        },
        fail:(error)=>{
          my.alert({content: 'Call failed：'+JSON.stringify(error), });
        },
    });
    },
})
