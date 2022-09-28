import T from './util/i18n'
const systemInfo = my.getSystemInfoSync();
const language = systemInfo.language.includes('zh') ? 'zh_cn' : 'en_us';
if(language == "en_us")
  T.setLocaleByIndex(language);
my.T = T;
App({
  onLaunch(options) {
    const systemInfo = my.getSystemInfoSync();
    this.globalData.locale = systemInfo.language.includes('zh') ? 'zh_cn' : 'en_us';
    this.globalData.locale = 'en_us';

    const { terminalType } = options.query
    this.globalData.terminalType = terminalType

    console.log('App Launch', options);
    console.log('SDKVersion', my.SDKVersion);
    console.log(this.globalData.locale);
    console.log('Terminal type: ', terminalType);
    my.showToast({
      content: 'Terminal type: ' + terminalType,
    });
    
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  onError(msg) {
    console.log('App JSerror'+JSON.stringify(msg))
  },
  globalData: {
    hasLogin: false,
  },
  Q:{
    data:{
      tests:[],
      total:0,
      passed:0,
      failed:0,
    },
    funcs:{
      cblist:[]
    },
    update:function(current, last){
      // console.log(this.data);
      // console.log("current" + current);
      // console.log("last" + last);
      if(current){
        if(last == "untest"){
          this.data.passed += 1;
        }else if(last == "fail"){
          this.data.passed += 1;
          this.data.failed -= 1;
        }
      }else{
        if(last == "untest"){
          this.data.failed += 1;
        }else if(last == "pass"){
          this.data.passed -= 1;
          this.data.failed += 1;
        }
      }
    },
    resetDate:function(){
      this.data = {
      tests:[],
      total:0,
      passed:0,
      failed:0,
    };
      this.funcs = {
      cblist:[]
    };
    },
    idx:-1,
  },
});
