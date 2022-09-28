Page({
  showAuthGuide() {
    my.showAuthGuide({ 
        bizType:'AppletPG',
        authType:'LBS',
        success:(res)=>{
            //shown为true时表示会显示权限引导弹窗，为false时表示用户已经授权
            my.alert({content: 'Successful call：'+JSON.stringify(res), });
        },
        fail:(error)=>{
            my.alert({content: 'Call failed：'+JSON.stringify(error), });
        },
    });
  },
});
