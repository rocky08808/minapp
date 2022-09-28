Page({
  data: {
    title: 'Get open user info',
    desc: 'get open user info includes avatar, nickname, country and etc',
    result: ''
  },
  onLoad() { 
    console.log('开始加载页面:', this.data.title);
  },
  /**
   * 授权成功事件
   */
  onGetAuthorize() {
    my.getOpenUserInfo({
      failed: (res) => {
        console.log('get open user info failed: ', res)
        this.setData({ result: 'getOpenUserInfo#fail: \n' + this.jsonFormat(JSON.stringify(res)) });
      },
      success: (res) => {
        console.log('get open user info success: ', res)
        this.setData({ result: 'getOpenUserInfo#success: \n' + this.jsonFormat(JSON.stringify(res)) });
      }
    });
  },
  /**
   * 授权失败事件
   * @param {*} e 
   */
  onAuthError(e) {
    this.setData({ result: 'onAuthError: \n' + this.jsonFormat(JSON.stringify(e)) });
  },
  jsonFormat(val) {
    let res = '';
    if (val === '') {
      return false;
    } else {
      for (let i = 0, j = 0, k = 0, ii, ele; i < val.length; i += 1) {
        // k:缩进，j:''个数
        ele = val.charAt(i);
        if (j % 2 === 0 && ele === '}') {
          k--;
          for (ii = 0; ii < k; ii += 1) ele = '    ' + ele;
          ele = '\n' + ele;
        } else if (j % 2 === 0 && ele === '{') {
          ele += '\n';
          k += 1;
          for (ii = 0; ii < k; ii += 1) ele += '    ';
        } else if (j % 2 === 0 && ele === ',') {
          ele += '\n';
          for (ii = 0; ii < k; ii += 1) ele += '    ';
        } else if (ele === '\'') j += 1;
        res += ele;
      }
    }
    return res;
  }
});
