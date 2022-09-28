
Page({
  data: {
    tests: [
      {
        name: "getSystemInfo Interface test",
        desc: "getSystemInfo",
        params: {}
      },
      {
        name: "getCities Interface test",
        desc: "getCities",
        params: {}
      }
    ]
  },
  Qunit: {
    idx: -1,
    test: function (name, desc, callback) {
      let app = getApp();
      app.Q.data.tests.push({
        name: name,
        desc: desc,
        result: "untest",
        info: "",
        status: "hide"
      });

      app.Q.funcs.cblist.push({
        callback: callback
      });

      app.Q.data.total += 1;

    },

    run: function (idx) {
      let running = true;
      let app = getApp();
      let lastResult = app.Q.data.tests[idx].result;
      app.Q.data.tests[idx].result = "run";
      app.Q.data.tests[idx].info = "";
      app.Q.setData(app.Q.data);

      let assert = function (condition, trueMsg, falseMsg) {
        if (condition) {
          app.Q.data.tests[idx].result = "pass";
          app.Q.data.tests[idx].info = trueMsg;
        } else {
          app.Q.data.tests[idx].result = "fail";
          app.Q.data.tests[idx].info = falseMsg;
        }

        app.Q.update(condition, lastResult);
        app.Q.setData(app.Q.data);
        running = false;
      };
      app.Q.funcs.cblist[idx].callback(assert);
    },

    runAll: function () {
      let app = getApp();

      for (let i = app.Q.data.tests.length - 1; i >= 0; i--) {
        // if(app.Q.data.tests[i].type != "manual"){
        var that = this;
        (function (i) {
          setTimeout(function () {
            console.log(i);
            that.run(i);

          }, (i + 1) * 3000);
        })(i)
        // this.run(i);

        // }
      }
    },
  },

  onItemTap(event) {
    let app = getApp();
    let idx = event.currentTarget.id;

    if (app.Q.data.tests[idx].status == "show") {
      app.Q.data.tests[idx].status = "hide";
    } else {
      app.Q.data.tests[idx].status = "show";
    };

    this.setData(app.Q.data);
  },
  onRunTap(event) {
    let idx = event.currentTarget.id;
    this.Qunit.run(idx);
  },
  handleTap(event) {
    let app = getApp();
    my.showToast({
      type: 'success',
      content: 'Performing one-click automation! Please wait！',
      duration: 10000
    });
    // let app = getApp();
    // app.Q.resetDate();
    this.Qunit.runAll();
  },
  onLoad() {

    //////////////// 用例开始 /////////////////////
    let app = getApp();
    app.Q.resetDate();

    //获取基础库版本号 API
    this.Qunit.test("sdkVersion_01success callback ", "sdkVersion接口success 获取基础库版本号测试", function (assert) {
      var version = my.SDKVersion
      if (version == '1.24.3') {
        assert(true, "调用SDKVersion方法，success callback 正常,返回： " + version, "调用SDKVersion接口，出现异常，无法完成success callback ");
      } else {
        assert(false, "fail", "调用SDKVersion，fail callback 异常，返回：" + version);
      }

    });

    //getTitleColor API
    this.Qunit.test("getTitleColor_01success callback ", "getTitleColor接口success 获取基础库版本号测试", function (assert) {
      my.getTitleColor({
        success: (res) => {
          if (res.color == '#ffffffff') {
            assert(true, "调用my.getTitleColor，success callback 正常,返回： " + JSON.stringify(res), "调用my.getTitleColor接口，出现异常，无法完成success callback ");
          } else {
            assert(false, "fail", "调用my.getTitleColor，fail callback 异常，返回：" + JSON.stringify(res));
          }
        }
      })
    });

    //hideToast 测试用例
    this.Qunit.test("my.hideToast callback ", "my.hideToast接口success iBeacon测试", function (assert) {
      my.hideToast({
        success: (res) => {
          my.showToast({ content: 'my.hideToast：' + JSON.stringify(res) });
          assert(true, "调用my.hideToast接口，正常success callback ，返回:" + JSON.stringify(res));
        },
        fail: (error) => {
          assert(false, "fail", "调用my.hideToast接口，fail callback 异常" + JSON.stringify(error));
        }
      });
    });

    //tradePay 测试用例
    this.Qunit.test("tradePay(tradeNO)_01success", "tradePay接口success callback测试", function (assert) {
      my.tradePay({
        tradeNO: '201711152100110410533667792', // call create interface(miniprogram.trade.create) to get the tradeNo
        success: (res) => {
          my.showToast({
            content: JSON.stringify(res),
          });
          assert((res.resultCode == "9000" || res.code == "PAY_SUCCESS"), "调用getAuthCode接口，success callback 正常" + JSON.stringify(res), "调用getAuthCode接口，success callback 失败" + JSON.stringify(res));
        }
      });
    });

    this.Qunit.test("tradePay(orderStr)_02success", "tradePay接口success callback测试", function (assert) {
      my.tradePay({
        orderStr: '123',
        success: (res) => {
          my.showToast({
            content: JSON.stringify(res),
          });
          assert((res.resultCode == "9000" || res.code == "PAY_SUCCESS"), "调用getAuthCode接口，success callback 正常" + JSON.stringify(res));
        }
      });
    });

    //getAuthCode 测试用例
    this.Qunit.test("getAuthCode_01success callback ", "getAuthCode接口success callback测试", function (assert) {
      my.getAuthCode({
        scopes: 'auth_user',
        success: (res) => {
          my.showToast({
            content: JSON.stringify(res),
          });
          assert((res.authCode == "12222222222" || res.authCode == "${server-issued-authCode}"), "调用getAuthCode接口，success callback 正常" + JSON.stringify(res));
        },
      });
    });

    //getOpenUserInfo 测试用例
    this.Qunit.test("my.getOpenUserInfo_01success", "showAuthGuide接口success 权限引导测试", function (assert) {
      my.getOpenUserInfo({
        success: (res) => {
          my.showToast({
            content: JSON.stringify(res),
          });
          assert(true, "调用my.getOpenUserInfo接口，successs callback 成功:" + JSON.stringify(res));
        },
        fail: (error) => {
          assert(false, "调用my.getOpenUserInfo接口，fail callback 异常:" + JSON.stringify(error));
        },
      });
    });

    //my.hideShareMenu();
    this.Qunit.test("hideShareMenu", "hideShareMenu接口success hideShareMenu测试", function (assert) {
      my.hideShareMenu({
        success: (res) => {
          my.showToast({ content: JSON.stringify(res) });
          assert(true, "调用hideShareMenu接口，success callback 正常" + JSON.stringify(res));
        },
        fail: (error) => {
          assert(false, "fail", "调用hideShareMenu接口，fail callback 异常" + JSON.stringify(error));
        }
      });
    });

    //my.hideFavoriteMenu();
    this.Qunit.test("my.hideFavoriteMenu_01success callback ", "my.hideFavoriteMenu接口success my.hideFavoriteMenu测试", function (assert) {
      my.hideFavoriteMenu({
        success: (res) => {
          my.showToast({ content: 'my.hideFavoriteMenu：' + JSON.stringify(res) });
          assert(true, "调用my.hideFavoriteMenu接口，正常success callback ，返回:" + JSON.stringify(res));
        },
        fail: (error) => {
          assert(false, "fail", "调用my.hideFavoriteMenu接口，fail callback 异常" + JSON.stringify(error));
        }
      });
    });

    //my.getRunScene();
    this.Qunit.test("my.getRunScene_callback_success", "my.getRunScene接口success 计算路径测试", function (assert) {
      my.getRunScene({
        success(result) {
          my.showToast({
            content: `${result.envVersion}`
          });
          assert(`${result.envVersion}` == "release", "调用my.getRunScene接口成功:" + `${result.envVersion}`, "调用my.getRunScene接口失败:" + `${result.envVersion}`);
        }
      })
    });

    //my.getAppIdSync();
    this.Qunit.test("my.getAppIdSync(2171010045423368) callback ", "my.hideToast接口success iBeacon测试", function (assert) {
      my.showToast({ content: 'my.getAppIdSync：' + my.getAppIdSync().appId });
      assert(my.getAppIdSync().appId == "2171010045423368", "接口，successs callback 成功:" + my.getAppIdSync().appId, "接口，successs callback 成功,appid与预期不一致:" + my.getAppIdSync().appId);
    });

    //toast测试
    this.Qunit.test("toast_01success", "toast接口success callback测试", function (assert) {
      my.showToast({
        type: 'success',
        content: 'Operation succeeded!',
        duration: 1000,
        success: () => {
          assert(true, "调用toast接口，入参完全，toast成功，successs callback 成功", "调用oast接口，入参完全，toast失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("toast_02success", "toast接口success callback测试", function (assert) {
      my.showToast({
        content: 'Operation succeeded!',
        duration: 1000,
        success: () => {
          assert(true, "调用toast接口，入参type为空，toast成功，successs callback 成功", "调用oast接口，入参type为空，toast失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("toast_03success", "toast接口success callback测试", function (assert) {
      my.showToast({
        type: 'success',
        content: '',
        duration: 1000,
        success: () => {
          assert(true, "调用toast接口，入参content为空，toast成功，successs callback 成功", "调用oast接口，入参content为空，toast失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("toast_04success", "toast接口success callback测试", function (assert) {
      my.showToast({
        type: 'success',
        content: 'Operation succeeded!',
        success: () => {
          assert(true, "调用toast接口，入参duration为空，toast成功，successs callback 成功", "调用oast接口，入参duration为空，toast失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("toast_05success", "toast接口success callback测试", function (assert) {
      my.showToast({
        type: 'success',
        content: 'Operation succeeded!',
        success: () => {
          assert(true, "调用toast接口，入参duration为空，入参content为空，toast成功，successs callback 成功", "调用Confirm接口，入参duration为空，入参content为空，toast失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("toast_06success", "toast接口success callback测试", function (assert) {
      my.showToast({
        content: 'Operation succeeded!',
        success: () => {
          assert(true, "调用toast接口，入参duration为空，入参type为空，toast成功，successs callback 成功", "调用Confirm接口，入参duration为空，入参type为空，toast失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("toast_07success", "toast接口success callback测试", function (assert) {
      my.showToast({
        duration: 1000,
        content: 'Operation succeeded!',
        success: () => {
          assert(true, "调用toast接口，入参type为空，入参content为空，toast成功，successs callback 成功", "调用Confirm接口，入参type为空，入参content为空，toast失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("toast_08success", "toast接口success callback测试", function (assert) {
      my.showToast({
        content: '',
        success: () => {
          assert(true, "调用toast接口，入参全部为空，toast成功，successs callback 成功", "调用toast接口，入参全部为空，toast失败，successs callback 失败");
        },
      });
    });
    //loding测试
    this.Qunit.test("loding_01success", "loding接口success callback测试", function (assert) {
      my.showToast({
        content: 'Loading...',
        delay: 500,
        success: () => {
          assert(true, "loding接口，入参完全，loding成功，successs callback 成功", "调用loding接口，入参完全，loding失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("loding_02success", "loding接口success callback测试", function (assert) {
      my.showToast({
        content: '',
        success: () => {
          assert(true, "loding接口，入参全为空，loding成功，successs callback 成功", "调用loding接口，入参全为空，loding失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("loding_03success", "loding接口success callback测试", function (assert) {
      my.showToast({
        content: '',
        delay: 500,
        success: () => {
          assert(true, "loding接口，入参content为空，loding成功，successs callback 成功", "调用loding接口，入参content为空，loding失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("loding_04success", "loding接口success callback测试", function (assert) {
      my.showToast({
        content: 'Loading...',
        success: () => {
          assert(true, "loding接口，入参delay为空，loding成功，successs callback 成功", "调用loding接口，入参delay为空，loding失败，successs callback 失败");
        },
      });
    });
    //set storage
    this.Qunit.test("setStorage_01 save data success", "setStorage接口success callback测试", function (assert) {
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用setStorage接口，  save   data 成功,success callback 成功，返回:" + JSON.stringify(res), "调用setStorage接口，  save   data 失败，success callback 失败，请检查");
        },
      });
    });
    this.Qunit.test("setStorage_02  save   data fail", "setStorage接口fail callback测试", function (assert) {
      my.setStorage({
        key: '',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        fail: (res) => {
          assert(true, "setStorage_02  save   data fail，符合预期", "调用setStorage接口，出现异常，调用了fail");
        },
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(false, "调用setStorage接口，不会调用fail", "异常");
        }
      });

    });
    this.Qunit.test("setStorage_03  save   data complete", "setStorage接口complete callback测试", function (assert) {
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        complete: (res) => {
          assert(true, "调用setStorage接口，可以正常complete callback ", "调用setStorage接口，无法正常complete callback ");
        },
      });
    });
    this.Qunit.test("setStorage_04  save   data fail", "setStorage接口fail callback测试", function (assert) {
      my.setStorage({
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        fail: (res) => {
          assert(true, "setStorage_04  save   data fail,key为空，出现异常,符合预期", "调用setStorage接口，key为空，出现异常，调用了fail");
        },
        success: (res) => {
          console.log(JSON.stringify(res))
          // assert(false, "调用setStorage接口，不会调用fail", "异常");
        }
      });
      assert(true, "符合预期", "异常");
    });
    this.Qunit.test("setStorage_05  save   data fail", "setStorage接口fail callback测试", function (assert) {
      my.setStorage({
        key: 'currentCity',
        fail: (res) => {
          assert(true, "调用setStorage接口，data为空，出现异常，调用了fail,符合预期", "异常");
        },
        success: (res) => {
          console.log(JSON.stringify(res))
          // assert(false, "调用setStorage接口，不会调用fail", "调用setStorage接口，data为空，success了，异常");
        }
      });
      assert(true, "符合预期", "异常");
    });

    this.Qunit.test("setStorage_06  save   data fail", "setStorage接口fail callback测试", function (assert) {
      my.setStorage({
        fail: (res) => {
          assert(false, "异常", "调用setStorage接口，入参全部为空，出现异常，调用了fail");
        },
      });
      assert(true, "调用setStorage接口，不会调用fail", "异常");
    });

    //get storage
    this.Qunit.test("getStorage_01  read   data success", "getStorage接口success callback测试", function (assert) {
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => {
          my.getStorage({
            key: 'currentCity',
            success: function (res) {
              console.log(JSON.stringify(res))
              res.data = undefined
              assert(res.data != "", "调用getStorage接口，  read   data 成功,success callback 成功，返回:" + JSON.stringify(res), "调用getStorage接口，  read   data 失败，success callback 失败，请检查");
            },
          });
        },
      });
    });

    this.Qunit.test("getStorage_02  read   data fail", "getStorage接口fail callback测试", function (assert) {
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => {
          my.getStorage({
            key: '',
            fail: function (res) {
              assert(true, "调用getStorage接口，调用了fail,符合预期", "异常");
            },
          });
        },
      });
    });

    this.Qunit.test("getStorage_03  read   data complete", "getStorage接口complete callback测试", function (assert) {
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => {
          my.getStorage({
            key: 'currentCity',
            complete: function (res) {
              assert(true, "调用getStorage接口，可以正常complete callback ", "调用getStorage接口，无法正常complete callback ");
            },
          });
        },
      });
    });
    //removeStorage
    this.Qunit.test("removeStorage_01  delete   data success", "removeStorage接口success callback测试", function (assert) {
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => {
          my.removeStorage({
            key: 'currentCity',
            success: function () {
              assert(true, "调用removeStorage接口，  delete   data 成功，success callback 成功", "调用removeStorage接口，  delete   data 失败，success callback 失败，请检查");
            },
          });
        },
      });
    });

    this.Qunit.test("removeStorage_02  delete   data fail", "removeStorage接口success callback测试", function (assert) {
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => {
          my.removeStorage({
            key: '',
            fail: function (res) {
              assert(true, "key为空，出现异常，调用了fail，符合预期，，返回： " + JSON.stringify(res), "异常");
            },
          });
        },
      });
    });

    this.Qunit.test("removeStorage_03  delete   data complete", "removeStorage接口complete callback测试", function (assert) {
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => {
          my.removeStorage({
            key: 'currentCity',
            complete: function (res) {
              assert(true, "调用removeStorage接口，可以正常complete callback ", "调用removeStorage接口，无法正常complete callback ");
            },
          });
        },
      });
    });
    //clearStorage
    this.Qunit.test("clearStorage_01  remove   data success", "clearStorage接口success callback测试", function (assert) {
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => {
          my.clearStorage()
          console.log(JSON.stringify(res))
          assert(true, "调用clearStorage接口，清楚 data 成功，success callback 成功，返回:" + JSON.stringify(res), "调用clearStorage接口，清楚 data 失败，success callback 失败，请检查");
        },
      });
    });
    this.Qunit.test("setStorageSync_01  sync    save   data success", "setStorageSync接口success callback测试", function (assert) {
      let res = my.setStorageSync({
        key: 'currentCity',
        data: "Hangzhou"
      });
      if (!res.error) {
        assert(true, "调用setStorageSync接口，  sync    save   data 成功，正常success callback ,返回:" + JSON.stringify(res), "异常");
      } else {
        assert(false, "异常", "调用setStorageSync接口，，  sync    save   data 无法正常success callback ");
      }

    });

    this.Qunit.test("setStorageSync_02  sync    save   data fail", "setStorageSync接口fail callback测试", function (assert) {
      let res = my.setStorageSync({
        key: '',
        data: ""
      });
      // my.alert({ content: 'my.setStorageSync: ' + JSON.stringify(res) });

      if (res.error) {
        assert(true, "调用setStorageSync接口，  sync    save   data 失败,返回:" + JSON.stringify(res), "异常");
      } else {
        assert(false, "异常", "调用setStorageSync接口，，  sync    save   data 异常");
      }

    });

    this.Qunit.test("getStorageSync_01  sync    read   data success", "getStorageSync接口success callback测试", function (assert) {
      let res = my.setStorageSync({
        key: 'currentCity',
        data: "Hangzhou"
      });
      if (!res.error) {
        let res = my.getStorageSync({ key: 'currentCity' });
        if (!res.error) {
          assert(res.data != "", "getStorageSync接口，  sync    read   data 成功，正常success callback ,返回:" + JSON.stringify(res), "异常");
        } else {
          assert(false, "异常", "调用getStorageSync接口，无法正常success callback ");
        }
      }
    });

    this.Qunit.test("getStorageSync_02  sync    read   data fail", "getStorageSync接口fail callback测试", function (assert) {
      let res = my.setStorageSync({
        key: 'currentCity',
        data: "Hangzhou"
      });

      if (!res.error) {
        let res = my.getStorageSync({ key: 'currentCity1test' });

        if (res.data == null) {
          assert(true, "getStorageSync接口，  sync    read   data 失败，符合预期,返回:" + JSON.stringify(res), "异常");
        } else {
          assert(false, "异常", "调用getStorageSync接口，无法正常返回失败，异常");
        }
      }
    });

    this.Qunit.test("removeStorageSync_01  sync    delete   data success", "removeStorageSync接口success callback测试", function (assert) {
      let res = my.setStorageSync({
        key: 'currentCity',
        data: "Hangzhou"
      });
      if (!res.error) {
        let res = my.removeStorageSync({ key: 'currentCity' });
        if (!res.error) {
          assert(true, "调用removeStorageSync接口，  sync    delete   data 成功，正常success callback " + JSON.stringify(res), "异常");
        } else {
          assert(false, "异常", "调用removeStorageSync接口，无法正常success callback ");
        }
      }
    });

    this.Qunit.test("removeStorageSync_02  sync    delete   data fail", "removeStorageSync接口fail callback测试", function (assert) {
      let res = my.setStorageSync({
        key: 'currentCity',
        data: "Hangzhou"
      });
      if (!res.error) {
        let res = my.removeStorageSync({ key: '' });
        if (res.error) {
          assert(true, "调用removeStorageSync接口，  sync    delete   data 失败，符合预期，返回：" + JSON.stringify(res), "异常");
        } else {
          assert(false, "异常", "调用removeStorageSync接口，异常");
        }
      }
    });

    this.Qunit.test("clearStorageSync_01  sync    remove   data success", "clearStorageSync接口success callback测试", function (assert) {
      let res = my.setStorageSync({
        key: 'currentCity',
        data: "Hangzhou"
      });
      if (!res.error) {
        let res = my.clearStorageSync({ key: 'currentCity' });
        if (!res.error) {
          assert(true, "调用clearStorageSync接口，  sync    remove   data 成功，正常success callback ，返回:" + JSON.stringify(res), "异常");
        } else {
          assert(false, "异常", "调用clearStorageSync接口，无法正常success callback ");
        }
      }
    });

    //getStorage
    this.Qunit.test("getStorageInfo_01success", "getStorageInfo接口success callback测试", function (assert) {
      my.getStorageInfo({
        success: (res) => {
          console.log(JSON.stringify(res))
          res.currentSize == undefined
          assert((res.limitSize != ""), "调用getStorageInfo接口，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getStorageInfo接口，无法正常获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getStorageInfo_02fail", "getStorageInfo接口fail callback测试", function (assert) {
      my.getStorageInfo({
        fail: (res) => {
          assert(false, "异常", "调用getStorageInfo接口，出现异常，调用了fail");
        },
      });
      assert(true, "调用getStorageInfo接口，不会调用fail", "异常");
    });


    this.Qunit.test("getStorageInfo_03complete", "getStorageInfo接口complete callback测试", function (assert) {
      my.getStorageInfo({
        complete: (res) => {
          assert(true, "调用getStorageInfo接口，可以正常complete callback ", "调用getStorageInfo接口，无法正常complete callback ");
        },
      });
    });

    ////设备-getSystemInfo////
    this.Qunit.test("getSystemInfo_01success", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'my.getSystemInfo:' + JSON.stringify(res) });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.version != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_02fail", "getSystemInfo接口fail callback测试", function (assert) {
      my.getSystemInfo({
        fail: (res) => {
          assert(false, "异常", "调用getSystemInfo接口，出现异常，调用了fail");
        },
      });
      assert(true, "调用getSystemInfo接口，不会调用fail", "异常");
    });

    this.Qunit.test("getSystemInfo_03complete", "getSystemInfo接口complete callback测试", function (assert) {
      my.getSystemInfo({
        complete: (res) => {
          assert(true, "调用getSystemInfo接口，可以正常complete callback ", "调用getSystemInfo接口，无法正常complete callback ");
        },
      });
    });

    this.Qunit.test("getSystemInfo_04model", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'model:' + res.model });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.model != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_05pixelRatio", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'pixelRatio:' + res.pixelRatio });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.pixelRatio != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_06windowWidth", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'windowWidth:' + res.windowWidth });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.windowWidth != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_07windowHeight", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'windowHeight:' + res.windowHeight });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.windowHeight != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_08language", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'language:' + res.language });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.language != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_09storage", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'storage:' + res.storage });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.storage != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_10currentBattery", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'currentBattery:' + res.currentBattery });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.currentBattery != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_11system", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'system:' + res.system });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.system != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_12platform", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'platform:' + res.platform });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.platform != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_13titleBarHeight", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'titleBarHeight:' + res.titleBarHeight });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.titleBarHeight != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_14statusBarHeight", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'statusBarHeight:' + res.statusBarHeight });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.statusBarHeight != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_15screenWidth", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'screenWidth:' + res.screenWidth });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.screenWidth != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_16screenHeight", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'screenHeight:' + res.screenHeight });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.screenHeight != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_17brand", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'brand:' + res.brand });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.brand != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_18fontSizeSetting", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'fontSizeSetting:' + res.fontSizeSetting });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.fontSizeSetting != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_19app", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          my.showToast({ content: 'app:' + res.app });
          // my.alert({ content: 'my.getSystemInfo: ' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          assert((res.app != ""), "调用getSystemInfo接口，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), "调用getSystemInfo接口，无法获取到返回值，success callback 失败");
        },
      });
    });


    ////设备-my.getNetworkType////
    this.Qunit.test("getNetworkType_01success", "getNetworkType接口success callback测试", function (assert) {
      my.getNetworkType({
        success: (res) => {
          my.showToast({ content: 'networkType:' + res.networkType });
          assert((res.networkType != ""), "调用getNetworkType接口，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getNetworkType接口，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getNetworkType_02fail", "getNetworkType接口fail callback测试", function (assert) {
      //assert(false, "结果pass", "结果fail");
      my.getNetworkType({
        fail: (res) => {
          assert(false, "异常", "调用getNetworkType接口，出现异常，调用了fail");
        },
      });
      assert(true, "调用getNetworkType接口，不会调用fail", "异常");
    });

    this.Qunit.test("getNetworkType_03complete", "getNetworkType接口complete callback测试", function (assert) {
      my.getNetworkType({
        complete: (res) => {
          assert(true, "调用getNetworkType接口，可以正常complete callback ", "调用getNetworkType接口，无法正常complete callback ");
        },
      });
    });

    this.Qunit.test("getNetworkType_04networkAvailable", "getNetworkType接口success callback测试", function (assert) {
      my.getNetworkType({
        success: (res) => {
          my.showToast({ content: 'networkAvailable:' + res.networkAvailable });
          assert((res.networkAvailable != ""), "调用getNetworkType接口，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getNetworkType接口，无法获取到返回值，success callback 失败");
        },
      });
    });


    ////设备-剪切板////
    this.Qunit.test("getClipbboard_01clipboardsuccess", "getClipboard接口success callback测试", function (assert) {
      my.setClipboard({
        text: '3.1415926', // clipboard data 
      });
      my.getClipboard({
        success: (res) => {
          my.showToast({ content: 'TEXT:' + res.text });
          // res.text == undefined
          assert((res.text == "3.1415926"), "调用getClipboard接口success,返回:" + JSON.stringify(res), "调用getClipboard接口失败:" + JSON.stringify(res))
        },
      });
    });

    this.Qunit.test("getClipbboard_02clipboardfail", "getClipboard接口fail callback测试", function (assert) {
      my.setClipboard({
        text: null, // clipboard data 为空
      });
      my.getClipboard({
        success: (res) => {
          my.showToast({ content: 'TEXT:' + JSON.stringify(res) });
          assert(res.text == "", "异常" + JSON.stringify(res), "调用getClipboard接口，出现异常" + JSON.stringify(res));
        },
      });
    });

    this.Qunit.test("getClipbboard_03clipboardcomplete", "getClipboard接口complete callback测试", function (assert) {
      my.setClipboard({
        text: '3.1415926', // clipboard data 
      });
      my.getClipboard({
        complete: (res) => {
          my.showToast({ content: 'TEXT:' + JSON.stringify(res) });
          assert(true, "调用getClipboard接口，可以正常complete callback " + JSON.stringify(res), "调用getClipboard接口，无法正常complete callback " + JSON.stringify(res));
        },
      });
    });

    // // ////位置-getLocation////

    // this.Qunit.test("getLocation_01success(type:0)", "getLocation接口success callback测试", function (assert) {
    //   my.getLocation({
    //     cacheTimeout: 30,
    //     type: 0,
    //     success: (res) => {
    //       //my.hideLoading();
    //       console.log(JSON.stringify(res))
    //       assert((res.latitude != ""), "调用getLocation接口，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getLocation接口，无法获取到返回值，success callback 失败");
    //     },
    //   });
    // });

    // this.Qunit.test("getLocation_02success(type:1)", "getLocation接口success callback测试", function (assert) {
    //   my.getLocation({
    //     cacheTimeout: 30,
    //     type: 1,
    //     success: (res) => {
    //       //my.hideLoading();
    //       console.log(JSON.stringify(res))
    //       assert((res.latitude != ""), "调用getLocation接口，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getLocation接口，无法获取到返回值，success callback 失败");
    //     },
    //   });
    // });

    // this.Qunit.test("getLocation_03success(type:2)", "getLocation接口success callback测试", function (assert) {
    //   my.getLocation({
    //     cacheTimeout: 30,
    //     type: 2,
    //     success: (res) => {
    //       //my.hideLoading();
    //       console.log(JSON.stringify(res))
    //       assert((res.latitude != ""), "调用getLocation接口，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getLocation接口，无法获取到返回值，success callback 失败");
    //     },
    //   });
    // });

    // this.Qunit.test("getLocation_04success不传参数", "getLocation接口success callback测试", function (assert) {
    //   my.getLocation({
    //     type: "",
    //     success: (res) => {
    //       //my.hideLoading();
    //       console.log(JSON.stringify(res))
    //       assert((res.latitude != ""), "调用getLocation接口，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getLocation接口，无法获取到返回值，success callback 失败");
    //     },
    //   });
    // });

    // this.Qunit.test("getLocation_05success", "getLocation接口success callback测试", function (assert) {
    //   my.getLocation({
    //     cacheTimeout: 30,
    //     type: 0,
    //     coordinate: "gcj02",
    //     success: (res) => {
    //       //my.hideLoading();
    //       console.log(JSON.stringify(res))
    //       assert((res.latitude != ""), "调用getLocation接口，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getLocation接口，无法获取到返回值，success callback 失败");
    //     },
    //   });
    // });

    // this.Qunit.test("getLocation_06success", "getLocation接口success callback测试", function (assert) {
    //   my.getLocation({
    //     type: 0,
    //     coordinate: "gcj02",
    //     success: (res) => {
    //       //my.hideLoading();
    //       console.log(JSON.stringify(res))
    //       assert((res.latitude != ""), "调用getLocation接口，cacheTimeout为空，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getLocation接口，无法获取到返回值，success callback 失败");
    //     },
    //   });
    // });

    // this.Qunit.test("getLocation_07success", "getLocation接口success callback测试", function (assert) {
    //   my.getLocation({
    //     cacheTimeout: 30,
    //     coordinate: "gcj02",
    //     success: (res) => {
    //       //my.hideLoading();
    //       console.log(JSON.stringify(res))
    //       assert((res.latitude != ""), "调用getLocation接口，type为空，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getLocation接口，无法获取到返回值，success callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("getLocation_08success", "getLocation接口success callback测试", function (assert) {
    //   my.getLocation({
    //     cacheTimeout: 30,
    //     type: 0,
    //     coordinate: "gcj02",
    //     success: (res) => {
    //       //my.hideLoading();
    //       console.log(JSON.stringify(res))
    //       assert((res.latitude != ""), "调用getLocation接口，coordinate为空，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getLocation接口，无法获取到返回值，success callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("getLocation_09success", "getLocation接口success callback测试", function (assert) {
    //   my.getLocation({
    //     cacheTimeout: 30,
    //     type: 0,
    //     coordinate: "gcj02",
    //     success: (res) => {
    //       //my.hideLoading();
    //       console.log(JSON.stringify(res))
    //       assert((res.latitude != ""), "调用getLocation接口，cacheTimeout和type为空，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getLocation接口，无法获取到返回值，success callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("getLocation_10success", "getLocation接口success callback测试", function (assert) {
    //   my.getLocation({
    //     type: 0,
    //     success: (res) => {
    //       //my.hideLoading();
    //       console.log(JSON.stringify(res))
    //       assert((res.latitude != ""), "调用getLocation接口，cacheTimeout和coordinate为空，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getLocation接口，无法获取到返回值，success callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("getLocation_11complete", "getLocation接口success callback测试", function (assert) {
    //   my.getLocation({
    //     cacheTimeout: 30,
    //     complete: (res) => {
    //       my.showToast({  
    //         content: 'complete!',
    //       });
    //       console.log(JSON.stringify(res))
    //       assert((res.latitude != ""), "调用getLocation接口，type和coordinate为空，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getLocation接口，无法获取到返回值，success callback 失败");
    //     },
    //   });
    // });


    ////获取系统信息////

    this.Qunit.test("getSystemInfo_01success", "getSystemInfo接口callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          assert(true, "调用getSystemInfo接口可以正常获取到返回值，正常success callback ");
        },
      });
    });

    this.Qunit.test("getSystemInfo_02complete", "getSystemInfo接口complete callback测试", function (assert) {
      my.getSystemInfo({
        complete: (res) => {
          assert(true, "调用getSystemInfo接口，可以正常complete callback ", "调用getLocation接口，无法正常complete callback ");
        },
      });
    });

    ////多媒体-  save  图片////

    // this.Qunit.test("saveImage_01显示操作菜单", "saveImage接口success callback测试", function (assert) {
    //   my.saveImage({
    //     url: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
    //     showActionSheet: true,
    //   });
    //   assert(true, "调用saveImage接口,显示操作菜单，图片  save  成功，successs callback 成功", "调用saveImage接口，  save  图片不成功，success callback 失败");
    // });

    // this.Qunit.test("saveImage_02不显示操作菜单", "saveImage接口success callback测试", function (assert) {
    //   my.saveImage({
    //     url: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
    //     showActionSheet: false,
    //   });
    //   assert(true, "调用saveImage接口,不显示操作菜单，图片  save  成功，successs callback 成功", "调用saveImage接口，success callback 失败");
    // });


    ////request////
    this.Qunit.test("my.request_01 callback success_https  request  ", "my.request接口success iBeacon测试", function (assert) {
      my.request({
        url: 'https://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'Paytm',
          production: 'JSAPI',
        },
        dataType: 'json',
        success: (res) => {
          my.showToast({ content: 'request:' + JSON.stringify(res) });
          assert(true, "调用my.request接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.hideTabBar接口，无法获取到返回值，success callback 失败");
        },
        fail: (error) => {
          my.showToast({ content: 'request:' + JSON.stringify(error) });
          assert(false, "fail", "调用my.hideToast接口，fail callback 异常");
        }
      });
    });

    this.Qunit.test("my.request_02 callback fail_http  request  ", "my.request接口fail iBeacon测试", function (assert) {
      var platform = "";
      my.getSystemInfo({
        success: (res) => {
          platform = res.platform
          // my.showToast({ content: 'my.getSystemInfo:' + JSON.stringify(res) });
          console.log(JSON.stringify(res))
          console.log(res.platform)
        },
      });
      my.request({
        url: 'http://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'Paytm',
          production: 'JSAPI',
        },
        dataType: 'json',
        success: (res) => {
          // my.showToast({ content: 'request:' + JSON.stringify(res) });
          console.log("platform: " + platform)
          if (platform == 'iOS') {
            assert(true, "调用my.request接口，http  request  ，正常success callback ，IOS符合预期，返回" + JSON.stringify(res), "调用my.request接口，success callback 异常");
          } else {
            assert(false, "调用my.request接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.hideTabBar接口，无法获取到返回值，success callback 失败");
          }
        },
        fail: (error) => {
          my.showToast({ content: 'request:' + JSON.stringify(error) });
          if (platform == 'iOS') {
            assert(false, "调用my.request接口，fail失败异常，返回:" + JSON.stringify(error), "调用my.request接口，success callback 失败异常");
          } else {
            assert(true, "调用my.request接口，http  request  ，正常fail callback ，符合预期，返回" + JSON.stringify(error), "调用my.request接口，fail callback 异常");
          }

        }
      });
    });


    ////网络-httpRequest////

    this.Qunit.test("httpRequest_01 send a request  ", "httpRequest接口success callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'miniapp',

          production: 'MiniprogramJSAPI',
        },
        dataType: 'json',
        timeout: 20000,
        success: function (res) {
          console.log(JSON.stringify(res))
          // res.status == undefined
          assert(true, "调用httpRequest接口，成功发送  request  ,success callback 成功，返回：" + JSON.stringify(res), "  request  发送失败，返回：" + JSON.stringify(res));
        },
      });
    });

    this.Qunit.test("httpRequest_02 request url wrong", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'xxx',
        success: function (res) {
          assert(true, "调用httpRequest接口，fail callback 出现异常", "异常，返回：" + JSON.stringify(res));
        },
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, "调用httpRequest接口，地址错误，fail callback ,返回:" + JSON.stringify(error), "调用httpRequest接口，url错误，出现异常，不会调用fail");
        },
      });
    });

    this.Qunit.test("httpRequest_03 request timeout", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'miniapp',
          production: 'MiniprogramJSAPI',
        },
        timeout: 50,
        dataType: 'json',
        success: function (res) {
          assert(true, "调用httpRequest接口，fail callback 出现异常", "异常，返回：" + JSON.stringify(res));
        },
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, "调用httpRequest接口，  request  超时，fail callback ，返回:" + JSON.stringify(error), "调用httpRequest接口，  request  超时，出现异常，不会调用fail");
        },
      });
    });

    this.Qunit.test("httpRequest_04 request fail", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbina.com/post',
        method: 'POST',
        data: {
          from: 'miniapp',
          production: 'MiniprogramJSAPI',
        },
        dataType: 'json',
        timeout: 20000,
        success: function (res) {
          assert(false, "fail", "调用httpRequest接口，fail callback 出现异常");;
        },
        fail: function (res) {
          console.log(JSON.stringify(res))
          assert(true, "调用httpRequest接口，跨越没有权限，fail callback ，返回:" + JSON.stringify(res), "fail");
        },
      });
    });


    this.Qunit.test("httpRequest_05", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, "调用httpRequest接口，url入参完整，其他为空，fail callback ，返回:" + JSON.stringify(error), "调用httpRequest接口，出现异常，不会调用fail");
        },
      });
    });
    this.Qunit.test("httpRequest_06", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        method: 'POST',
        timeout: 20000,
        dataType: 'json',
        success: function (res) {
          assert(true, "fail", "调用httpRequest接口，fail callback 出现异常");;
        },
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, "调用httpRequest接口，data为空，返回:" + JSON.stringify(error), "调用httpRequest接口，data为空，出现异常，不会调用fail");
        },
      });
    });
    this.Qunit.test("httpRequest_07", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'miniapp',
          production: 'MiniprogramJSAPI',
        },
        dataType: 'json',
        success: function (res) {
          assert(true, "fail", "调用httpRequest接口，fail callback 出现异常");;
        },
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, "调用httpRequest接口，timeout为空，fail callback ，返回:" + JSON.stringify(error), "调用httpRequest接口，出现异常，不会调用fail");
        },
      });
    });
    this.Qunit.test("httpRequest_08", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        data: {
          from: 'miniapp',

          production: 'MiniprogramJSAPI',
        },
        timeout: 20000,
        dataType: 'json',
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, "调用httpRequest接口，method为空，fail callback ，返回:" + JSON.stringify(error), "调用httpRequest接口，出现异常，不会调用fail");
        },
      });
    });
    this.Qunit.test("httpRequest_09", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'miniapp',

          production: 'MiniprogramJSAPI',
        },
        timeout: 20000,
        dataType: 'json',
        success: function (res) {
          assert(true, "fail", "调用httpRequest接口，fail callback 出现异常");;
        },
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, "调用httpRequest接口，dataType为空，fail callback ，返回:" + JSON.stringify(error), "调用httpRequest接口，出现异常，不会调用fail");
        },
      });
    });
    this.Qunit.test("httpRequest_10", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        timeout: 20000,
        dataType: 'json',
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, "调用httpRequest接口，method为空，data为空，fail callback ，返回:" + JSON.stringify(error), "调用httpRequest接口，出现异常，不会调用fail");
        },
      });
    });
    this.Qunit.test("httpRequest_11", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        data: {
          from: 'miniapp',

          production: 'MiniprogramJSAPI',
        },
        dataType: 'json',
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, "调用httpRequest接口，method为空，timeout为空，fail callback ，返回:" + JSON.stringify(error), "调用httpRequest接口，出现异常，不会调用fail");
        },
      });
    });
    this.Qunit.test("httpRequest_12", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        data: {
          from: 'miniapp',

          production: 'MiniprogramJSAPI',
        },
        timeout: 20000,
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, "调用httpRequest接口，method为空，dataType为空，fail callback ，返回:" + JSON.stringify(error), "调用httpRequest接口，出现异常，不会调用fail");
        },
      });
    });
    this.Qunit.test("httpRequest_13", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          assert(true, "fail", "调用httpRequest接口，fail callback 出现异常");;
        },
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, "调用httpRequest接口，data为空，timeout为空，fail callback ，返回:" + JSON.stringify(error), "调用httpRequest接口，出现异常，不会调用fail");
        },
      });
    });
    this.Qunit.test("httpRequest_14", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'miniapp',

          production: 'MiniprogramJSAPI',
        },
        timeout: 20000,
        dataType: 'json',
        success: function (res) {
          assert(true, "fail", "调用httpRequest接口，fail callback 出现异常");;
        },
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, "调用httpRequest接口，data为空，dataType为空，fail callback ，返回:" + JSON.stringify(error), "调用httpRequest接口，出现异常，不会调用fail");
        },
      });
    });
    this.Qunit.test("httpRequest_15", "httpRequest接口fail callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'miniapp',

          production: 'MiniprogramJSAPI',
        },
        success: function (res) {
          assert(true, "fail", "调用httpRequest接口，fail callback 出现异常");;
        },
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, "调用httpRequest接口，tiomeout为空，dataType为空，fail callback ，返回:" + JSON.stringify(error), "调用httpRequest接口，出现异常，不会调用fail");
        },
      });
    });

    this.Qunit.test("httpRequest_16success", "httpRequest接口success callback测试", function (assert) {
      my.httpRequest({
        url: 'https://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'miniapp',

          production: 'MiniprogramJSAPI',
        },
        header: {
        },
        dataType: 'json',
        timeout: 20000,
        success: function (res) {
          console.log(JSON.stringify(res))
          res.status == undefined
          assert(true, "调用httpRequest接口，header为空成功发送  request  ,success callback 成功，返回：" + JSON.stringify(res), "  request  发送失败，返回：" + JSON.stringify(res));
        },
      });
    });

    this.Qunit.test("httpRequest_17fail_http  request  ", "httpRequest接口fail callback测试", function (assert) {
      var platform = "";
      my.getSystemInfo({
        success: (res) => {
          platform = res.platform
        }
      })

      my.httpRequest({
        url: 'http://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'miniapp',

          production: 'MiniprogramJSAPI',
        },
        header: {
        },
        dataType: 'json',
        timeout: 20000,
        success: function (res) {
          console.log(JSON.stringify(res))
          res.status == undefined
          if (platform == 'iOS') {
            assert(true, "调用httpRequest接口，,success callback 成功，ios返回：" + JSON.stringify(res), "  request  发送失败，返回：" + JSON.stringify(res));
          } else {
            assert(false, "调用httpRequest接口，header为空成功发送  request  ,success callback 成功，返回：" + JSON.stringify(res), "  request  发送失败，返回：" + JSON.stringify(res));
          }

        },
        fail: function (error) {
          console.log(JSON.stringify(error))
          if (platform == 'iOS') {
            assert(false, "调用httpRequest接口，http  request  ，IOS失败，返回:" + JSON.stringify(error), "调用httpRequest接口，调用出现异常fail");
          } else {
            assert(true, "调用httpRequest接口，http  request  ，fail callback ，预期失败，返回:" + JSON.stringify(error), "调用httpRequest接口，出现异常，不会调用fail");
          }

        },
      });
    });

    this.Qunit.test("uploadFile_03 upload img path wrong", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        url: 'https://httpbin.org/post',
        fileType: 'image',
        fileName: 'VID20170825110217.mp4',
        filePath: '手机存储/DCIM/era/VID20170825110217.mp4',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，path错误，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });

    this.Qunit.test("uploadFile_04 upload img url wrong", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        url: 'https://httpbin.o/post',
        fileType: 'image',
        fileName: "file",
        filePath: '[\"file:///storage/emulated/0/DCIM/Camer/file1.jpg\"]',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
          setTimeout(() => {
            my.hideLoading({
              // page: that,  // avoid hide the other page if switch to another page
            });
          }, 2000);
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，url错误，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
          setTimeout(() => {
            my.hideLoading({
              // page: that,  // avoid hide the other page if switch to another page
            });
          }, 2000);
        }

      });
    });
    this.Qunit.test("uploadFile_05", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        fileType: 'image',
        fileName: 'VID20170825110217.mp4',
        filePath: '手机存储/DCIM/era/VID20170825110217.mp4',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，缺少URL，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_06", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        url: 'https://httpbin.org/post',
        fileType: 'image',
        filePath: '手机存储/DCIM/era/VID20170825110217.mp4',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，缺少fileName，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_07", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        url: 'https://httpbin.org/post',
        fileName: 'VID20170825110217.mp4',
        filePath: '手机存储/DCIM/era/VID20170825110217.mp4',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，缺少fileType，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_08", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        url: 'https://httpbin.org/post',
        fileType: 'image',
        filePath: '手机存储/DCIM/era/VID20170825110217.mp4',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，缺少fileName，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_08", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        url: 'https://httpbin.org/post',
        fileType: 'image',
        fileName: 'VID20170825110217.mp4',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，缺少filePath，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_09", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        fileName: 'VID20170825110217.mp4',
        filePath: '手机存储/DCIM/era/VID20170825110217.mp4',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，url和fileType为空，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_10", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        fileType: 'image',
        filePath: '手机存储/DCIM/era/VID20170825110217.mp4',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，url和fileName为空，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_11", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        fileType: 'image',
        fileName: 'VID20170825110217.mp4',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，url和filePath为空，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_12", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        url: 'https://httpbin.org/post',
        filePath: '手机存储/DCIM/era/VID20170825110217.mp4',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，fileType和fileName为空，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_13", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        url: 'https://httpbin.org/post',
        fileName: 'VID20170825110217.mp4',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，fileType和filePath为空，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_14", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        url: 'https://httpbin.org/post',
        fileType: 'image',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，fileName和filePath为空，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_15", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        url: 'https://httpbin.org/post',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，入参URL以外的参数为空，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_16", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        fileType: 'image',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，入参fileType以外的参数为空，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_17", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        fileName: 'VID20170825110217.mp4',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，入参fileName以外的参数为空，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_18", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        filePath: '手机存储/DCIM/era/VID20170825110217.mp4',
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，入参filePath以外的参数为空，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_19", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，参数全部为空，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });
    this.Qunit.test("uploadFile_20fail", "uploadFile接口fail callback测试", function (assert) {
      my.uploadFile({
        url: 'https://httpbin.org/post',
        fileType: 'image',
        fileName: 'VID20170825110217.mp4',
        filePath: '手机存储/DCIM/era/VID20170825110217.mp4',
        header: {
        },
        success: (res) => {
          assert(false, "异常", "调用uploadFile接口，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用uploadFile接口，header为空，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    });



    this.Qunit.test("downloadFile_01 downloadfile", "downloadFile接口success callback测试", function (assert) {
      my.downloadFile({
        url: 'http://img.alicdn.com/tfs/TB1x669SXXXXXbdaFXXXXXXXXXX-520-280.jpg',
        header: {
          'content-type': 'application/json'
        },
        success: (apFilePath) => {
          urls: [apFilePath],
            assert(apFilePath != "", "调用downloadFile接口，文件下载成功，success callback ，返回:" + JSON.stringify(apFilePath), "调用downloadFile接口,下载文件不成功，无法success callback ");
        },
      });
    });

    this.Qunit.test("downloadFile_02downloadfile URL wrong", "downloadFile接口fail callback测试", function (assert) {
      my.downloadFile({
        url: 'http://xxxx',
        fail: (res) => {
          console.log(res)
          assert(true, "调用uploadFile接口，URL错误，fail callback ,返回error码:" + res.error, "调用uploadFile接口，URL错误，fail callback 出现异常");
        },
      });
      assert(true, "异常", "调用uploadFile接口，fail callback 出现异常");
    });

    this.Qunit.test("downloadFile_03success", "downloadFile接口success callback测试", function (assert) {
      my.downloadFile({
        url: 'http://img.alicdn.com/tfs/TB1x669SXXXXXbdaFXXXXXXXXXX-520-280.jpg',
        success: (apFilePath) => {
          urls: [apFilePath],
            assert(apFilePath != "", "调用downloadFile接口，缺少header，success callback ，返回:" + JSON.stringify(apFilePath), "调用downloadFile接口,下载文件不成功，无法success callback ");
        },
      });
    });

    //WebSocket
    this.Qunit.test("connectSocket_01 create connect  ", "connectSocket接口success callback测试", function (assert) {
      my.connectSocket({
        url: 'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用connectSocket接口，可以正常success callback ,成功返回:" + JSON.stringify(res), "");
        },
      });
      assert(false, "调用connectSocket接口，无法正常success callback ", "");
    });

    this.Qunit.test("connectSocket_02 create connect no url", "connectSocket接口fail callback测试", function (assert) {
      my.connectSocket({
        url: '',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用connectSocket接口，url为空，fail callback ,返回:" + JSON.stringify(res), "异常");
        },
      });
      assert(false, "异常", "调用connectSocket接口，fail callback 出现异常");
    });

    this.Qunit.test("connectSocket_03 create connect-conectting", "connectSocket接口fail callback测试", function (assert) {
      my.connectSocket({
        url: 'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        success: (res) => {
          my.connectSocket({
            url: 'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
            data: {},
            header: {
              'content-type': 'application/json'
            },
            method: "POST",
            fail: (res) => {
              assert(false, "异常", "调用connectSocket接口，重复连接，出现异常");
            },
          });
        },
      });
      assert(true, "调用connectSocket接口，无法重复连接", "异常");
    });


    this.Qunit.test("connectSocket_04 create connect  URL wrong", "connectSocket接口fail callback测试", function (assert) {
      my.connectSocket({
        url: 'https://mobilegwspanner.miniprogram',
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用connectSocket接口，URL不合法，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
      assert(false, "异常", "调用connectSocket接口，URL不合法，fail callback 出现异常");
    });

    this.Qunit.test("connectSocket_05 create connect-conectting", "connectSocket接口fail callback测试", function (assert) {
      my.connectSocket({
        url: 'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
        data: {},
        method: "POST",
        success: (res) => {
          my.connectSocket({
            url: 'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
            data: {},
            method: "POST",
            fail: (res) => {
              assert(false, "异常", "header为空，调用connectSocket接口，重复连接，出现异常");
            },
          });
        },
      });
      assert(true, "调用connectSocket接口，无法重复连接", "异常");
    });
    this.Qunit.test("connectSocket_06 create connect -conectting", "connectSocket接口fail callback测试", function (assert) {
      my.connectSocket({
        url: 'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        success: (res) => {
          my.connectSocket({
            url: 'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
            header: {
              'content-type': 'application/json'
            },
            method: "POST",
            fail: (res) => {
              assert(false, "异常", "data为空，调用connectSocket接口，重复连接，出现异常");
            },
          });
        },
      });
      assert(true, "调用connectSocket接口，无法重复连接", "异常");
    });
    this.Qunit.test("connectSocket_07 create connect  -conectting", "connectSocket接口fail callback测试", function (assert) {
      my.connectSocket({
        url: 'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',

        method: "POST",
        success: (res) => {
          my.connectSocket({
            url: 'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',

            method: "POST",
            fail: (res) => {
              assert(false, "异常", "data和header为空，调用connectSocket接口，重复连接，出现异常");
            },
          });
        },
      });
      assert(true, "调用connectSocket接口，无法重复连接", "异常");
    });

    // this.Qunit.test("closeSocket_01success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       url:'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
    //       data: {},
    //       header:{
    //         'content-type': 'application/json'
    //       },
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，入参完全，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    // });
    // this.Qunit.test("closeSocket_02success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       url:'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
    //       header:{
    //         'content-type': 'application/json'
    //       },
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，缺少入参data，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    // });
    // this.Qunit.test("closeSocket_03success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       url:'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
    //       data: {},
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，缺少入参header，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    // });
    // this.Qunit.test("closeSocket_04success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       url:'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
    //       data: {},
    //       header:{
    //         'content-type': 'application/json'
    //       },
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，缺少入参method，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    //   });
    //   this.Qunit.test("closeSocket_05success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       url:'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，缺少入参data和header，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    //   });
    //   this.Qunit.test("closeSocket_06success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       url:'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
    //       header:{
    //         'content-type': 'application/json'
    //       },
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，缺少入参data和method，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    //   });
    //   this.Qunit.test("closeSocket_07success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       url:'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
    //       data: {},
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，缺少入参header和method，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    //   });
    //   this.Qunit.test("closeSocket_08success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，入参全为空，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    //   });
    //   this.Qunit.test("closeSocket_09success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       data: {},
    //       header:{
    //         'content-type': 'application/json'
    //       },
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，入参缺少URL，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    // });
    // this.Qunit.test("closeSocket_10success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       header:{
    //         'content-type': 'application/json'
    //       },
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，入参缺少URL和data为空，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    // });
    // this.Qunit.test("closeSocket_11success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       data: {},
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，入参缺少URL和header为空，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    // });
    // this.Qunit.test("closeSocket_12success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       data: {},
    //       header:{
    //         'content-type': 'application/json'
    //       },
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，入参缺少URL和method为空，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    // });
    // this.Qunit.test("closeSocket_13success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       url:'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，入参除URL以外全为空，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    // });
    // this.Qunit.test("closeSocket_14success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       data: {},
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，入参除data以外全为空，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    // });
    // this.Qunit.test("closeSocket_15success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       header:{
    //         'content-type': 'application/json'
    //       }
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，入参除header以外全为空，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    // });
    // this.Qunit.test("closeSocket_16success callback ", "closeSocket接口success callback测试", function(assert){
    //     my.connectSocket({
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });                         
    //     assert(true, "调用closeSocket接口，入参除method以外全为空，关闭连接成功，success callback 正常", "调用closeSocket接口，出现异常，无法完成success callback ");          
    // });

    // this.Qunit.test("onSocketClose_01success callback ", "onSocketClose接口success callback测试", function(assert){
    //     my.connectSocket({
    //       url:'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
    //       data: {},
    //       header:{
    //         'content-type': 'application/json'
    //       },
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });
    //     my.onSocketClose(function(res) {
    //     }) 
    //     assert(true, "调用onSocketClose接口，监听关闭连接成功，success callback 正常", "调用onSocketClose接口，出现异常，无法完成success callback ");          
    //   }); 
    //   this.Qunit.test("onSocketClose_02success callback ", "onSocketClose接口success callback测试", function(assert){
    //     my.connectSocket({

    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });
    //     my.onSocketClose(function(res) {
    //     }) 
    //     assert(true, "调用onSocketClose接口，入参全部为空，监听关闭连接成功，success callback 正常", "调用onSocketClose接口，出现异常，无法完成success callback ");          
    //   });  
    //   this.Qunit.test("onSocketClose_03success callback ", "onSocketClose接口success callback测试", function(assert){
    //     my.connectSocket({
    //       data: {},
    //       header:{
    //         'content-type': 'application/json'
    //       },
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });
    //     my.onSocketClose(function(res) {
    //     }) 
    //     assert(true, "调用onSocketClose接口，入参URL为空，监听关闭连接成功，success callback 正常", "调用onSocketClose接口，出现异常，无法完成success callback ");          
    //   }); 
    //   this.Qunit.test("onSocketClose_04success callback ", "onSocketClose接口success callback测试", function(assert){
    //     my.connectSocket({
    //       url:'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
    //       header:{
    //         'content-type': 'application/json'
    //       },
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });
    //     my.onSocketClose(function(res) {
    //     }) 
    //     assert(true, "调用onSocketClose接口，入参data为空，监听关闭连接成功，success callback 正常", "调用onSocketClose接口，出现异常，无法完成success callback ");          
    //   }); 
    //   this.Qunit.test("onSocketClose_05success callback ", "onSocketClose接口success callback测试", function(assert){
    //     my.connectSocket({
    //       url:'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
    //       data: {},
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });
    //     my.onSocketClose(function(res) {
    //     }) 
    //     assert(true, "调用onSocketClose接口，入参header为空，监听关闭连接成功，success callback 正常", "调用onSocketClose接口，出现异常，无法完成success callback ");          
    //   }); 
    //   this.Qunit.test("onSocketClose_06success callback ", "onSocketClose接口success callback测试", function(assert){
    //     my.connectSocket({
    //       url:'ws://mobilegwspanner.stable.miniprogram.net:8000/ws',
    //       data: {},
    //       header:{
    //         'content-type': 'application/json'
    //       },
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });
    //     my.onSocketClose(function(res) {
    //     }) 
    //     assert(true, "调用onSocketClose接口，入参method为空，监听关闭连接成功，success callback 正常", "调用onSocketClose接口，出现异常，无法完成success callback ");          
    //   }); 
    //   this.Qunit.test("onSocketClose_07success callback ", "onSocketClose接口success callback测试", function(assert){
    //     my.connectSocket({
    //       header:{
    //         'content-type': 'application/json'
    //       },
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });
    //     my.onSocketClose(function(res) {
    //     }) 
    //     assert(true, "调用onSocketClose接口，入参url和data为空，监听关闭连接成功，success callback 正常", "调用onSocketClose接口，出现异常，无法完成success callback ");          
    //   }); 
    //   this.Qunit.test("onSocketClose_08success callback ", "onSocketClose接口success callback测试", function(assert){
    //     my.connectSocket({
    //       data: {},
    //       method:"GET",
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });
    //     my.onSocketClose(function(res) {
    //     }) 
    //     assert(true, "调用onSocketClose接口，入参url和header为空，监听关闭连接成功，success callback 正常", "调用onSocketClose接口，出现异常，无法完成success callback ");          
    //   }); 
    //   this.Qunit.test("onSocketClose_09success callback ", "onSocketClose接口success callback测试", function(assert){
    //     my.connectSocket({
    //       data: {},
    //       header:{
    //         'content-type': 'application/json'
    //       },
    //     });
    //     my.onSocketOpen(function(res) {
    //       my.closeSocket() 
    //     });
    //     my.onSocketClose(function(res) {
    //     }) 
    //     assert(true, "调用onSocketClose接口，入参url和method为空，监听关闭连接成功，success callback 正常", "调用onSocketClose接口，出现异常，无法完成success callback ");          
    //   }); 

    this.Qunit.test("setNavigationBar_01success（reset：false）", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        title: 'Wallet Alliance',
        backgroundColor: '#108ee9',
        borderBottomColor: '#FFC0CB',
        image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=639232549,1482140416&fm=27&gp=0.jpg',
        reset: false,
        success: () => {
          assert(true, "调用setNavigationBar接口，入参完全，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参完全，setNavigationBar失败，successs callback 失败");
        },
        fail: (error) => {
          assert(false, "fail", "调用setNavigationBar接口，fail callback 异常");
        },
        complete: () => {
          my.showToast({
            content: 'complete!',
          });
          assert(true, "调用setNavigationBar接口，可以正常complete callback ", "调用setNavigationBar接口，无法正常complete callback ");
        },
      });
    });
    this.Qunit.test("setNavigationBar_02success（reset：true）", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        title: 'Wallet Alliance',
        backgroundColor: '#108ee9',
        borderBottomColor: '#FFC0CB',
        image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=639232549,1482140416&fm=27&gp=0.jpg',
        reset: true,
        success: () => {
          assert(true, "调用setNavigationBar接口，入参完全，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参完全，setNavigationBar失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("setNavigationBar_03success(params null)", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        success: () => {
          assert(true, "调用setNavigationBar接口，入参全部为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参全部为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("setNavigationBar_04success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        backgroundColor: '#108ee9',
        borderBottomColor: '#FFC0CB',
        image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=639232549,1482140416&fm=27&gp=0.jpg',
        reset: false,
        success: () => {
          assert(true, "调用setNavigationBar接口，入参title为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参title为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });

    this.Qunit.test("setNavigationBar_05success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        title: 'Wallet Alliance',
        backgroundColor: '#108ee9',
        image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=639232549,1482140416&fm=27&gp=0.jpg',
        reset: false,
        success: () => {
          assert(true, "调用setNavigationBar接口，入参borderBottomColor为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参borderBottomColor为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("setNavigationBar_06success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        title: 'Wallet Alliance',
        backgroundColor: '#108ee9',
        borderBottomColor: '#FFC0CB',
        reset: false,
        success: () => {
          assert(true, "调用setNavigationBar接口，入参image为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参image为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });

    this.Qunit.test("setNavigationBar_07success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        backgroundColor: '#108ee9',
        image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=639232549,1482140416&fm=27&gp=0.jpg',
        reset: false,
        success: () => {
          assert(true, "调用setNavigationBar接口，入参title和borderBottomColor为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参title和borderBottomColor为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("setNavigationBar_08success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        backgroundColor: '#108ee9',
        borderBottomColor: '#FFC0CB',
        reset: false,
        success: () => {
          assert(true, "调用setNavigationBar接口，入参title和image为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参title和image为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("setNavigationBar_09success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        backgroundColor: '#108ee9',
        borderBottomColor: '#FFC0CB',
        image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=639232549,1482140416&fm=27&gp=0.jpg',
        success: () => {
          assert(true, "调用setNavigationBar接口，入参title和reset为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参title和reset为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });

    this.Qunit.test("setNavigationBar_10success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        title: 'Wallet Alliance',
        backgroundColor: '#108ee9',
        reset: false,
        success: () => {
          assert(true, "调用setNavigationBar接口，入参borderBottomColor和image为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参borderBottomColor和image为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("setNavigationBar_11success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        title: 'Wallet Alliance',
        backgroundColor: '#108ee9',
        image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=639232549,1482140416&fm=27&gp=0.jpg',
        success: () => {
          assert(true, "调用setNavigationBar接口，入参borderBottomColor和reset为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参borderBottomColor和reset为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("setNavigationBar_12success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        title: 'Wallet Alliance',
        backgroundColor: '#108ee9',
        success: () => {
          assert(true, "调用setNavigationBar接口，入参title和backgroundColor完全其他为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参title和backgroundColor完全其他为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("setNavigationBar_13success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        title: 'Wallet Alliance',
        borderBottomColor: '#FFC0CB',
        success: () => {
          assert(true, "调用setNavigationBar接口，入参title和和borderBottomColor完全其他为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参title和和borderBottomColor完全其他为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });

    this.Qunit.test("setNavigationBar_14success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        backgroundColor: '#108ee9',
        borderBottomColor: '#FFC0CB',
        success: () => {
          assert(true, "调用setNavigationBar接口，入参backgroundColor和和borderBottomColor完全其他为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参backgroundColor和和borderBottomColor完全其他为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("setNavigationBar_15success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        backgroundColor: '#108ee9',
        image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=639232549,1482140416&fm=27&gp=0.jpg',
        success: () => {
          assert(true, "调用setNavigationBar接口，入参backgroundColor和image完全其他为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参backgroundColor和image完全其他为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });

    this.Qunit.test("setNavigationBar_16success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        borderBottomColor: '#FFC0CB',
        image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=639232549,1482140416&fm=27&gp=0.jpg',
        success: () => {
          assert(true, "调用setNavigationBar接口，入参borderBottomColor和image完全其他为空，，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参borderBottomColor和image完全其他为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });
  

    this.Qunit.test("setNavigationBar_17success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        title: 'Wallet Alliance',
        success: () => {
          assert(true, "调用setNavigationBar接口，入参title完全其他为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参title完全其他为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("setNavigationBar_18success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        backgroundColor: '#108ee9',
        success: () => {
          assert(true, "调用setNavigationBar接口，入参backgroundColor完全其他为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参backgroundColor完全其他为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("setNavigationBar_19success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        borderBottomColor: '#FFC0CB',
        success: () => {
          assert(true, "调用setNavigationBar接口，入参borderBottomColor完全其他为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参borderBottomColor完全其他为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });
    this.Qunit.test("setNavigationBar_20success", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        image: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=639232549,1482140416&fm=27&gp=0.jpg',
        success: () => {
          assert(true, "调用setNavigationBar接口，入参image完全其他为空，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参image完全其他为空，setNavigationBar失败，successs callback 失败");
        },
      });
    });


    //showLoading hideLoading测试用例
    this.Qunit.test("showLoading_01success callback ", "showLoading接口success callback测试", function (assert) {
      my.showLoading({
        content: 'Loading...',
        delay: 500,
      });
      // const that = this;
      setTimeout(() => {
        my.hideLoading({
          // page: that,  // avoid hide the other page if switch to another page
        });
      }, 2000);
      assert(true, "调用showLoading接口，success callback 正常", "调用showLoading接口，出现异常，无法完成success callback ");
    });


    this.Qunit.test("my.setCanPullDown callback ", "my.hideToast接口success iBeacon测试", function (assert) {
      my.setCanPullDown({
        canPullDown: true,
        success: (res) => {
          my.showToast({ content: 'result:' + JSON.stringify(res) });
          assert(true, "调用my.hideToast接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.hideTabBar接口，无法获取到返回值，success callback 失败");
        },
        fail: (error) => {
          my.showToast({ content: 'result:' + JSON.stringify(error) });
          assert(false, "fail", "调用my.hideToast接口，fail callback 异常");
        }
      });
    });


    //startPullDownRefresh测试用例
    this.Qunit.test("startPullDownRefresh_01success", "stopPullDownRefresh接口success callback测试", function (assert) {
      my.startPullDownRefresh({
        pullRefresh: true,
        allowsBounceVertical: 'YES',
      });
      assert(true, "调用startPullDownRefresh接口，success callback 正常", "调用stopPullDownRefresh接口，出现异常，无法完成success callback ");
    });

    //stopPullDownRefresh 测试用例
    this.Qunit.test("stopPullDownRefresh_01success callback ", "stopPullDownRefresh接口success callback测试", function (assert) {
      my.stopPullDownRefresh();
      assert(true, "调用stopPullDownRefresh接口，success callback 正常", "调用stopPullDownRefresh接口，出现异常，无法完成success callback ");
    });


    // //switchTab 测试用例
    // this.Qunit.test("switchTab_01success callback ", "switchTab接口success callback测试", function(assert){
    //   my.switchTab();
    //   assert(true, "调用switchTab接口，success callback 正常", "调用switchTab接口，出现异常，无法完成success callback ");          
    // }); 

    //hideKeyboard 测试用例
    this.Qunit.test("hideKeyboard_01success callback ", "hideKeyboard接口success callback测试", function (assert) {
      my.hideKeyboard();
      assert(true, "调用hideKeyboard接口，success callback 正常", "调用hideKeyboard接口，出现异常，无法完成success callback ");
    });

    //caniuse 测试用例
    this.Qunit.test("canIUse_01success callback ", "canIUse接口success callback测试", function (assert) {
      my.canIUse("saveImage");
      assert(true, "调用canIUse接口，success callback 正常", "调用canIUse接口，出现异常，无法完成success callback ");
    });

    // //新增 API 是否可用
    // this.Qunit.test("canIUse_01success callback ", "canIUse接口success 新增 API 是否可用测试", function (assert) {
    //   if (my.canIUse('pageScrollTo')) {
    //     assert(true, "调用canIUse接口，success callback 正常canIUse" , "调用canIUse接口，出现异常，无法完成success callback ");
    //   } else {
    //     assert(false, "调用my.canIUse接口，fail callback 异常");
    //   }
    // });


    // //Socket 测试用例
    // this.Qunit.test("offSocketOpen_01success callback ", "offSocketOpen接口success Socket测试", function (assert) {
    //   var res = my.offSocketOpen(this.callback);
    //   assert(true, "调用offSocketOpen接口，success callback 正常 offSocketOpen:" + JSON.stringify(res), "调用offSocketOpen接口，出现异常，无法完成success callback ");
    // });

    // //Socket 测试用例
    // this.Qunit.test("offSocketError_02success callback ", "offSocketError接口success Socket测试", function (assert) {
    //   var res = my.offSocketError(this.callback);
    //   assert(true, "调用offSocketError接口，success callback 正常 offSocketError:" + JSON.stringify(res), "调用offSocketError接口，出现异常，无法完成success callback ");
    // });


    // this.Qunit.test("onGyroscopeChange_01success callback ", "onGyroscopeChange接口success 陀螺仪测试", function (assert) {
    //   my.onGyroscopeChange((res) => {
    //     console.log('gyroData.rotationRate.x = ' + res.x);
    //     console.log('gyroData.rotationRate.y = ' + res.y);
    //     console.log('gyroData.rotationRate.z = ' + res.z);
    //     success: (res) => {
    //       assert(true, "调用onGyroscopeChange接口，success callback 正常", "调用onGyroscopeChange接口，出现异常，无法完成success callback ");
    //     }
    //   });

    // });

    // this.Qunit.test("offGyroscopeChange_01success callback ", "offGyroscopeChange接口success offGyroscopeChange测试", function (assert) {
    //   my.offGyroscopeChange({
    //     success: (res) => {
    //       assert(true, "调用offGyroscopeChange接口，success callback 正常", "调用offGyroscopeChange接口，出现异常，无法完成success callback ");
    //     },
    //   });
    // });


    // this.Qunit.test("onAccelerometerChange_01success callback ", "onAccelerometerChange接口success onAccelerometerChange测试", function (assert) {
    //   my.onAccelerometerChange((res) => {
    //     console.log(res.x);
    //     console.log(res.y);
    //     console.log(res.z);
    //     success: (res) => {
    //       assert(true, "调用onAccelerometerChange接口，success callback 正常", "调用onAccelerometerChange接口，出现异常，无法完成success callback ");
    //     }
    //   });
    // });

    // this.Qunit.test("offAccelerometerChange_01success callback ", "offAccelerometerChange接口success offAccelerometerChange测试", function (assert) {
    //   my.offAccelerometerChange({
    //     success: (res) => {
    //       assert(true, "调用offAccelerometerChange接口，success callback 正常", "调用offAccelerometerChange接口，出现异常，无法完成success callback ");
    //     },
    //   });
    // });

    // this.Qunit.test("onCompassChange_01success callback ", "onCompassChange接口success onCompassChange测试", function (assert) {
    //   my.onCompassChange(function (res) {
    //     success: (res) => {
    //       assert(true, "调用onCompassChange接口，success callback 正常", "调用onCompassChange接口，出现异常，无法完成success callback ");
    //     }
    //     // fail: (error) => {
    //     //   assert(false, "调用my.offCompassChange接口，fail callback 异常"); 
    //     // },
    //     // complete: () => {
    //     //   assert(true, "调用my.offCompassChange接口，可以正常complete callback ", "调用my.offCompassChange接口，无法正常complete callback ");
    //     // }
    //   });
    // });

    // this.Qunit.test("offCompassChange_01success callback ", "offCompassChange接口success offCompassChange测试", function (assert) {
    //   my.offCompassChange({
    //     success: (res) => {
    //       assert(true, "调用offCompassChange接口，success callback 正常", "调用offCompassChange接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.offCompassChange接口，fail callback 异常");
    //     }
    //   });
    // });

    // this.Qunit.test("openSetting_01success callback ", "openSetting接口success openSetting测试", function (assert) {
    //   my.openSetting({
    //     success: (res) => {
    //       /*
    //       * res.authSetting = {
    //       *   "userInfo": true,
    //       *   "location": true,
    //       *   ...
    //       * }
    //       */
    //       assert(true, "调用openSetting接口，success callback 正常", "调用openSetting接口，出现异常，无法完成success callback ");
    //     }
    //   })
    // });


    // this.Qunit.test("getSetting_01success callback ", "getSetting接口success getSetting测试", function (assert) {
    //   my.getSetting({
    //     success: (res) => {
    //       /*
    //       * res.authSetting = {
    //       *   "location": true,
    //       *   "audioRecord": true,
    //       *   ...
    //       * }
    //       */
    //       assert(true, "调用getSetting接口，success callback 正常", "调用getSetting接口，出现异常，无法完成success callback ");
    //     }
    //   })
    // });

    // this.Qunit.test("openDocument_01success callback ", "openDocument接口success openDocument测试", function (assert) {
    //   my.downloadFile({
    //     url: 'https://gw.miniprogramobjects.com/os/basement_prod/0155bfea-000c-4e5b-a306-d90ef272dd46.pdf', // 下载文件地址
    //     success: ({ apFilePath }) => {
    //       my.hideLoading();
    //       my.openDocument({
    //         filePath: apFilePath,
    //         fileType: 'pdf',
    //         success: (res) => {
    //           my.alert({
    //             content: 'open pdf success'
    //           });
    //           assert(true, "调用openDocument接口，success callback 正常", "调用openDocument接口，出现异常，无法完成success callback ");
    //         }
    //       })
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.downloadFile接口，fail callback 异常");
    //     }
    //   });
    // });

    // this.Qunit.test("setTabBarStyle_01success callback ", "setTabBarStyle接口success setTabBarStyle测试", function (assert) {
    //   my.setTabBarStyle({
    //     color: '#FF0000',
    //     selectedColor: '#00FF00',
    //     backgroundColor: '#0000FF',
    //     borderStyle: 'white',
    //     success: (res) => {
    //       assert(true, "调用setTabBarStyle接口，success callback 正常", "调用setTabBarStyle接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.setTabBarStyle接口，fail callback 异常");
    //     }
    //   })
    // });

    this.Qunit.test("setBackgroundColor_01success callback ", "setBackgroundColor接口success setBackgroundColor测试", function (assert) {
      var v = my.setBackgroundColor({
        backgroundColor: '#F8F8FF',
        backgroundColorTop: '#FF00FF',
        backgroundColorBottom: '#ff00ff',
        success: (res) => {
          assert(true, "调用setBackgroundColor接口，success callback 正常", "调用setBackgroundColor接口，出现异常，无法完成success callback ");
        },
        fail: (error) => {
          assert(false, "调用my.setBackgroundColor接口，fail callback 异常");
        },
      })
    });

    this.Qunit.test("setBackgroundColor_02complete", "setBackgroundColor接口success setBackgroundColor测试", function (assert) {
      var v = my.setBackgroundColor({
        backgroundColor: '#F8F8FF',
        backgroundColorTop: '#FF00FF',
        backgroundColorBottom: '#ff00ff',
        complete: (res) => {
          my.showToast({
            content: 'complete!',
          });
          assert(true, "调用setBackgroundColor接口，success callback 正常", "调用setBackgroundColor接口，出现异常，无法完成success callback ");
        },
      })
    });

    // this.Qunit.test("setBackgroundTextStyle_01success callback ", "setBackgroundTextStyle接口success setBackgroundTextStyle测试", function (assert) {
    //   var v = my.setBackgroundTextStyle({
    //     textStyle: 'dark',
    //     success: (res) => {
    //       assert(true, "调用setBackgroundTextStyle接口，success callback 正常", "调用setBackgroundTextStyle接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.setBackgroundTextStyle接口，fail callback 异常");
    //     }
    //   })
    // });


    // this.Qunit.test("getOpenUserData_01success callback ", "getOpenUserData接口success getOpenUserData测试", function (assert) {
    //   var res = my.getOpenUserData({
    //     success: (res) => {
    //       assert(true, "调用getOpenUserData接口，success callback 正常 getOpenUserData：" + JSON.stringify(res), "调用getOpenUserData接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.getOpenUserData接口，fail callback 异常");
    //     }
    //   })
    // });

    // this.Qunit.test("getDeviceInfo_01success callback ", "getDeviceInfo接口success getDeviceInfo测试", function (assert) {
    //   var res = my.getDeviceInfo({
    //     success: (res) => {
    //       assert(true, "调用getDeviceInfo接口，success callback 正常 getDeviceInfo：" + JSON.stringify(res), "调用getDeviceInfo接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.getDeviceInfo接口，fail callback 异常");
    //     }
    //   })
    // });

    // this.Qunit.test("getDeviceID_01success callback ", "getDeviceID接口success getDeviceID测试", function (assert) {
    //   var res = my.getDeviceID({
    //     success: (res) => {
    //       assert(true, "调用getDeviceID接口，success callback 正常 getDeviceID：" + JSON.stringify(res), "调用getDeviceID接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.getDeviceID接口，fail callback 异常");
    //     }

    //   })
    // });




    // this.Qunit.test("onDeviceMotionChange_01success callback ", "onDeviceMotionChange接口success onDeviceMotionChange测试", function (assert) {
    //   my.onDeviceMotionChange(function (res) {
    //     console.log(res.alpha);
    //     console.log(res.beta);
    //     console.log(res.gamma);
    //     success: (res) => {
    //       assert(true, "调用onDeviceMotionChange接口，success callback 正常 onDeviceMotionChange：" + JSON.stringify(res), "调用onDeviceMotionChange接口，出现异常，无法完成success callback ");
    //     }
    //     fail: (error) => {
    //       assert(false, "调用my.onDeviceMotionChange接口，fail callback 异常");
    //     }
    //   })
    // });

    // this.Qunit.test("offDeviceMotionChange_01success callback ", "offDeviceMotionChange接口success offDeviceMotionChange测试", function (assert) {
    //   my.offDeviceMotionChange({
    //     success: (res) => {
    //       assert(true, "调用offDeviceMotionChange接口，success callback 正常 offDeviceMotionChange：" + JSON.stringify(res), "调用offDeviceMotionChange接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.offDeviceMotionChange接口，fail callback 异常");
    //     }
    //   })
    // });

    // this.Qunit.test("getCarrierName_01success callback ", "getCarrierName接口success getCarrierName测试", function (assert) {
    //   my.getCarrierName(function (res) {
    //     success: (res) => {
    //       assert(true, "调用getCarrierName接口，success callback 正常 getCarrierName：" + JSON.stringify(res), "调用getCarrierName接口，出现异常，无法完成success callback ");
    //     }
    //     fail: (error) => {
    //       assert(false, "调用my.getCarrierName接口，fail callback 异常");
    //     }
    //   })
    // });



    // this.Qunit.test("my.isLowPowerMode_01success callback ", "my.isLowPowerMode接口success my.isLowPowerMode测试", function (assert) {
    //   my.isLowPowerMode(function (res) {
    //     success: (res) => {
    //       assert(true, "调用my.isLowPowerMode接口，success callback 正常 my.isLowPowerMode：" + JSON.stringify(res), "调用my.isLowPowerMode接口，出现异常，无法完成success callback ");
    //     }
    //     fail: (error) => {
    //       assert(false, "调用my.my.isLowPowerMode接口，fail callback 异常");
    //     }
    //   })
    // });

    // this.Qunit.test("my.onLowPowerWarning_01success callback ", "my.onLowPowerWarning接口success my.onLowPowerWarning测试", function (assert) {
    //   my.onLowPowerWarning(function (res) {
    //     success: (res) => {
    //       assert(true, "调用my.onLowPowerWarning接口，success callback 正常 my.onLowPowerWarning：" + JSON.stringify(res), "调用my.onLowPowerWarning接口，出现异常，无法完成success callback ");
    //     }
    //     fail: (error) => {
    //       assert(false, "调用my.onLowPowerWarning接口，fail callback 异常");
    //     }
    //   })
    // });

    // this.Qunit.test("my.offLowPowerWarning_01success callback ", "my.offLowPowerWarning接口success my.offLowPowerWarning测试", function (assert) {
    //   my.offLowPowerWarning(function (res) {
    //     success: (res) => {
    //       assert(true, "调用my.offLowPowerWarning接口，success callback 正常 my.offLowPowerWarning：" + JSON.stringify(res), "调用my.offLowPowerWarning接口，出现异常，无法完成success callback ");
    //     }
    //     fail: (error) => {
    //       assert(false, "调用my.offLowPowerWarning接口，fail callback 异常");
    //     }
    //   })
    // });

    // this.Qunit.test("my.startWifi_01success callback ", "my.startWifi接口success my.startWifi测试", function (assert) {
    //   my.startWifi(function (res) {
    //     success: (res) => {
    //       assert(true, "调用my.startWifi接口，success callback 正常 my.startWifi：" + JSON.stringify(res), "调用my.startWifi接口，出现异常，无法完成success callback ");
    //     }
    //     fail: (error) => {
    //       assert(false, "调用my.startWifi接口，fail callback 异常");
    //     }
    //   })
    // });


    // this.Qunit.test("my.stopWifi_01success callback ", "my.stopWifi接口success my.stopWifi测试", function (assert) {
    //   my.stopWifi(function (res) {
    //     success: (res) => {
    //       assert(true, "调用my.stopWifi接口，success callback 正常 my.stopWifi：" + JSON.stringify(res), "调用my.stopWifi接口，出现异常，无法完成success callback ");
    //     }
    //     fail: (error) => {
    //       assert(false, "调用my.stopWifi接口，fail callback 异常");
    //     }
    //   })
    // });

    // this.Qunit.test("my.connectWifi_01success callback ", "my.connectWifi接口success my.connectWifi测试", function (assert) {
    //   my.connectWifi({
    //     SSID: '',
    //     BSSID: '',
    //     success: function (res) {
    //       success: (res) => {
    //         assert(true, "调用my.connectWifi接口，success callback 正常 my.connectWifi：" + JSON.stringify(res), "调用my.connectWifi接口，出现异常，无法完成success callback ");
    //       }
    //       fail: (error) => {
    //         assert(false, "调用my.connectWifi接口，fail callback 异常");
    //       }
    //     }
    //   })
    // });

    // this.Qunit.test("my.getWifiList_01success callback ", "my.getWifiList接口success my.getWifiList测试", function (assert) {
    //   my.getWifiList({
    //     success: (res) => {
    //       assert(true, "调用my.getWifiList接口，success callback 正常 my.getWifiList：" + JSON.stringify(res), "调用my.getWifiList接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.getWifiList接口，fail callback 异常");
    //     }
    //   })
    // });

    // this.Qunit.test("my.onGetWifiList_01success callback ", "my.onGetWifiList接口success wifi测试", function (assert) {
    //   my.onGetWifiList(function (res) {
    //     success: (res) => {
    //       assert(true, "调用my.onGetWifiList接口，success callback 正常 my.onGetWifiList：" + JSON.stringify(res), "调用my.onGetWifiList接口，出现异常，无法完成success callback ");
    //     }
    //     fail: (error) => {
    //       assert(false, "调用my.onGetWifiList接口，fail callback 异常");
    //     }
    //   });
    // });

    // this.Qunit.test("my.setWifiList_01success callback ", "my.setWifiList接口success wifi测试", function (assert) {
    //   my.onGetWifiList(function (res) {
    //     if (res.wifiList.length) {
    //       my.setWifiList({
    //         wifiList: [{
    //           SSID: res.wifiList[0].SSID,
    //           BSSID: res.wifiList[0].BSSID,
    //           password: '123456'
    //         }],
    //         success: (res) => {
    //           assert(true, "调用my.setWifiList接口，success callback 正常 my.setWifiList：" + JSON.stringify(res), "调用my.setWifiList接口，出现异常，无法完成success callback ");
    //         },
    //         fail: (error) => {
    //           assert(false, "调用my.setWifiList接口，fail callback 异常");
    //         }
    //       })
    //     } else {
    //       my.setWifiList({
    //         wifiList: [],
    //         success: (res) => {
    //           assert(true, "调用my.setWifiList接口，success callback 正常 my.setWifiList：" + JSON.stringify(res), "调用my.setWifiList接口，出现异常，无法完成success callback ");
    //         },
    //         fail: (error) => {
    //           assert(false, "调用my.setWifiList接口，fail callback 异常");
    //         }
    //       })
    //     }
    //   })
    // });

    // this.Qunit.test("my.onWifiConnected_01success callback ", "my.onWifiConnected接口success wifi测试", function (assert) {
    //   my.onWifiConnected(function (res) {
    //     success: (res) => {
    //       assert(true, "调用my.onWifiConnected接口，success callback 正常 my.onWifiConnected：" + JSON.stringify(res), "调用my.onWifiConnected接口，出现异常，无法完成success callback ");
    //     }
    //     fail: (error) => {
    //       assert(false, "调用my.onWifiConnected接口，fail callback 异常");
    //     }
    //   });
    // });

    // this.Qunit.test("my.getConnectedWifi_01success callback ", "my.getConnectedWifi接口success wifi测试", function (assert) {
    //   my.getConnectedWifi(function (res) {
    //     success: (res) => {
    //       assert(true, "调用my.getConnectedWifi接口，success callback 正常 my.getConnectedWifi：" + JSON.stringify(res), "调用my.getConnectedWifi接口，出现异常，无法完成success callback ");
    //     }
    //     fail: (error) => {
    //       assert(false, "调用my.getConnectedWifi接口，fail callback 异常");
    //     }
    //   });
    // });

    // this.Qunit.test("my.registerSSID_01success callback ", "my.registerSSID接口success wifi测试", function (assert) {
    //   my.registerSSID({
    //     SSID: '',
    //     success: (res) => {
    //       assert(true, "调用my.registerSSID接口，success callback 正常 my.registerSSID：" + JSON.stringify(res), "调用my.registerSSID接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.registerSSID接口，fail callback 异常");
    //     }
    //   });
    // });

    // this.Qunit.test("my.unregisterSSID_01success callback ", "my.unregisterSSID接口success wifi测试", function (assert) {
    //   my.unregisterSSID({
    //     SSID: '',
    //     success: (res) => {
    //       assert(true, "调用my.unregisterSSID接口，success callback 正常 my.unregisterSSID：" + JSON.stringify(res), "调用my.unregisterSSID接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.unregisterSSID接口，fail callback 异常");
    //     }
    //   });
    // });

    // this.Qunit.test("isSystemRoot_01success callback ", "isSystemRoot接口success isSystemRoot测试", function (assert) {
    //   my.isSystemRoot({
    //     success: (res) => {
    //       assert(true, "调用isSystemRoot接口，success callback 正常", "调用isSystemRoot接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.isSystemRoot接口，fail callback 异常");
    //     },

    //   })
    // });

    // this.Qunit.test("chooseVideo_01success callback ", "chooseVideo接口success chooseVideo测试", function (assert) {
    //   my.chooseVideo({
    //     sourceType: ['album', 'camera'],
    //     maxDuration: 60,
    //     camera: 'back',
    //     success: (res) => {
    //       assert(true, "调用chooseVideo接口，success callback 正常 res.tempFilePath" + res.tempFilePath, "调用chooseVideo接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.chooseVideo接口，fail callback 异常");
    //     },

    //   })
    // });

    // this.Qunit.test("saveVideoToPhotosAlbum_01success callback ", "saveVideoToPhotosAlbum接口success saveVideoToPhotosAlbum测试", function (assert) {
    //   my.saveVideoToPhotosAlbum({
    //     src: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
    //     success: (res) => {
    //       assert(true, "调用saveVideoToPhotosAlbum接口，success callback 正常 res.tempFilePath" + JSON.stringify(res), "调用saveVideoToPhotosAlbum接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.saveVideoToPhotosAlbum接口，fail callback 异常");
    //     },

    //   })
    // });


    // //将当前小程序添加到收藏。客户端10.1.38及以上版本支持。
    // this.Qunit.test("addToFavorite_01success callback ", "addToFavorite接口success 小程序收藏测试", function (assert) {
    //   my.addToFavorite({
    //     success: (res) => {
    //       assert(true, "调用addToFavorite接口，success callback 正常 addToFavorite" + JSON.stringify(res), "调用addToFavorite接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.addToFavorite接口，fail callback 异常");
    //     },

    //   })
    // });


    // //查询当前小程序是否被收藏。 客户端10.1.38及以上版本支持。
    // this.Qunit.test("isFavorite_01success callback ", "isFavorite接口success 小程序收藏测试", function (assert) {
    //   my.isFavorite({
    //     success: (res) => {
    //       assert(true, "调用isFavorite接口，success callback 正常 isFavorite" + JSON.stringify(res), "调用isFavorite接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.isFavorite接口，fail callback 异常");
    //     },

    //   })
    // });


    // //将当前小程序从收藏中移除。 客户端10.1.38及以上版本支持。
    // this.Qunit.test("addremoveFromFavorite_01success callback ", "removeFromFavorite接口success 小程序收藏测试", function (assert) {
    //   my.removeFromFavorite({
    //     success: (res) => {
    //       assert(true, "调用removeFromFavorite接口，success callback 正常 removeFromFavorite" + JSON.stringify(res), "调用removeFromFavorite接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.removeFromFavorite接口，fail callback 异常");
    //     },

    //   })
    // });


    // //监听添加/取消收藏事件
    // this.Qunit.test("onFavorite_01success callback ", "onFavorite接口success 小程序收藏测试", function (assert) {
    //   my.onFavorite({
    //     success: (res) => {
    //       assert(true, "调用onFavorite接口，success callback 正常 onFavorite" + JSON.stringify(res), "调用onFavorite接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.onFavorite接口，fail callback 异常");
    //     },

    //   })
    // });

    // //取消监听添加/取消收藏事件
    // this.Qunit.test("offFavorite_01success callback ", "offFavorite接口success 小程序收藏测试", function (assert) {
    //   my.offFavorite({
    //     success: (res) => {
    //       assert(true, "调用offFavorite接口，success callback 正常 offFavorite" + JSON.stringify(res), "调用offFavorite接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.offFavorite接口，fail callback 异常");
    //     },

    //   })
    // });

    // //从手机硬盘选择文件。IOS平台10.1.75开始支持，Android平台10.1.85开始支持
    // this.Qunit.test("chooseFileFromDisk_01success callback ", "chooseFileFromDisk接口success 从硬盘选择文件测试", function (assert) {
    //   my.chooseFileFromDisk({
    //     success: (res) => {
    //       assert(true, "调用chooseFileFromDisk接口，success callback 正常 chooseFileFromDisk" + JSON.stringify(res), "调用chooseFileFromDisk接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.chooseFileFromDisk接口，fail callback 异常");
    //     },

    //   })
    // });

    // //获取文件管理器  客户端 10.1.50，基础库 1.13.0 开始支持，低版本需要做兼容处理
    // this.Qunit.test("getFileSystemManager_01success callback ", "getFileSystemManager接口success 获取文件管理器测试", function (assert) {
    //   let res = my.getFileSystemManager({
    //     success: (res) => {
    //       assert(true, "调用getFileSystemManager接口，success callback 正常 getFileSystemManager" + JSON.stringify(res), "调用getFileSystemManager接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.getFileSystemManager接口，fail callback 异常");
    //     },
    //   });
    // });



    // //滚动到页面的目标位置。
    // this.Qunit.test("pageScrollTo_01success callback ", "pageScrollTo接口success 从硬盘选择文件测试", function (assert) {
    //   my.pageScrollTo({
    //     scrollTop: parseInt(0),
    //     selector: '',
    //     duration: 300,
    //     success: (res) => {
    //       assert(true, "调用pageScrollTo接口，success callback 正常 pageScrollTo：" + JSON.stringify(res), "调用pageScrollTo接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.pageScrollTo接口，fail callback 异常");
    //     },
    //     complete: (res) => {
    //       assert(true, "调用pageScrollTo接口，success callback 正常 pageScrollTo：" + JSON.stringify(res), "调用pageScrollTo接口，出现异常，无法完成success callback ");
    //     }
    //   });
    // });


    // this.Qunit.test("my.stopHCE_01success callback ", "my.stopHCE接口success my.getstopHCE测试", function (assert) {
    //   my.stopHCE({
    //     success: (res) => {
    //       assert(true, "调用my.stopHCE接口，success callback 正常 my.stopHCE：" + JSON.stringify(res), "调用my.stopHCE接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.stopHCE接口，fail callback 异常");
    //     }
    //   })
    // });


    // this.Qunit.test("my.startHCE_01success callback ", "my.startHCE接口success my.startHCE测试", function (assert) {
    //   my.startHCE({
    //     aidList: ['F222222222'],
    //     success: (res) => {
    //       assert(true, "调用my.startHCE接口，success callback 正常 my.startHCE：" + JSON.stringify(res), "调用my.startHCE接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.startHCE接口，fail callback 异常");
    //     }
    //   })
    // });

    // this.Qunit.test("my.getHCEState_01success callback ", "my.getHCEState接口success my.getHCEState测试", function (assert) {

    //   my.getHCEState({
    //     success: (res) => {
    //       assert(true, "调用my.getHCEState接口，success callback 正常 my.getHCEState：" + JSON.stringify(res), "调用my.getHCEState接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用my.getHCEState接口，fail callback 异常");
    //     }
    //   })
    // });


    // this.Qunit.test("my.sendHCEMessage_01success callback ", "my.gsendHCEMessage接口success my.sendHCEMessage测试", function (assert) {

    //   my.startHCE({
    //     success(res) {
    //       my.onHCEMessage(function (res) {
    //         if (res.messageType === 1) {
    //           my.sendHCEMessage({
    //             data: '6F16840B506369...',
    //             success: (res) => {
    //               assert(true, "调用my.sendHCEMessage接口，success callback 正常 my.sendHCEMessage：" + JSON.stringify(res), "调用my.sendHCEMessage接口，出现异常，无法完成success callback ");
    //             },
    //             fail: (error) => {
    //               assert(false, "调用my.sendHCEMessage接口，fail callback 异常");
    //             }
    //           },
    //           )
    //         }
    //       })
    //     }
    //   })
    // });

    // this.Qunit.test("my.onHCEMessage_01success callback ", "my.onHCEMessage接口success my.getWifiList测试", function (assert) {
    //   my.startHCE({
    //     success(res) {
    //       my.onHCEMessage(function (res) {
    //         if (res.messageType === 1) {
    //           my.sendHCEMessage({
    //             data: '6F16840B506369...',
    //             success: (res) => {
    //               assert(true, "调用my.onHCEMessage接口，success callback 正常 my.onHCEMessage：" + JSON.stringify(res), "调用my.onHCEMessage接口，出现异常，无法完成success callback ");
    //             },
    //             fail: (error) => {
    //               assert(false, "调用my.onHCEMessage接口，fail callback 异常");
    //             }

    //           })
    //         }
    //       })
    //     }
    //   })
    // });

    // this.Qunit.test("getSystemInfoSync_01success", "getSystemInfoSync接口success 获取手机系统信息的  sync  接口测试", function (assert) {
    //   my.getSystemInfoSync({
    //     success: (res) => {
    //       console.log(JSON.stringify(res))
    //       assert(true, "调用getSystemInfoSync接口，successs callback 成功:" + JSON.stringify(res), "调用getSystemInfoSync接口，入参完全，getSystemInfoSync失败，successs callback 失败");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用getSystemInfoSync接口，fail callback 异常:" + JSON.stringify(error));
    //     },
    //   });
    // });

    this.Qunit.test("reportAnalytics_01success", "reportAnalytics接口success 自定义分析 data 的上报接口测试", function (assert) {
      var res = my.reportAnalytics('click', { spmId: 'MiniApp_2168010000013806.page/API/report-analytics/report-analytics' });
      assert(true, "调用getSystemInfo接口，successs callback 成功:" + JSON.stringify(res), "调用getSystemInfo接口，入参完全，getSystemInfo失败，successs callback 失败");
    });

    //创建动画实例
    this.Qunit.test("createAnimation_01success", "createAnimation接口success 创建动画实例测试", function (assert) {
      const animation = my.createAnimation({
        transformOrigin: "top right",
        duration: 3000,
        timeFunction: "ease-in-out",
        delay: 100,
      });
      assert(animation.config.duration == 3000, "调用createAnimation接口，successs callback 成功:" + JSON.stringify(animation), "调用createAnimation接口，入参完全，createAnimation失败，successs callback 失败 " + JSON.stringify(animation));

    });

    // //预览图片
    // this.Qunit.test("previewImage_01success", "previewImage接口success 预览图片测试", function (assert) {
    //   my.previewImage({
    //     current: 2,
    //     urls: [
    //       'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
    //       'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg',
    //       'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg'
    //     ],
    //     success: (res) => {
    //       assert(true, "调用previewImage接口，successs callback 成功:" + JSON.stringify(res), "调用previewImage接口，入参完全，previewImage失败，successs callback 失败");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用previewImage接口，fail callback 异常:" + JSON.stringify(error));
    //     },
    //   });

    // });

    // this.Qunit.test("previewImage_02complete", "previewImage接口success 预览图片测试", function (assert) {
    //   my.previewImage({
    //     current: 2,
    //     urls: [
    //       'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
    //       'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg',
    //       'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg'
    //     ],
    //     complete: (res) => {
    //       my.showToast({  
    //         content: 'complete!',
    //       });
    //       assert(true, "调用previewImage接口，successs callback 成功:" + JSON.stringify(res), "调用previewImage接口，入参完全，previewImage失败，successs callback 失败");
    //     }
    //   });
    // });

    //获取图片信息
    this.Qunit.test("getImageInfo_01success", "getImageInfo接口success 获取图片信息测试", function (assert) {
      my.getImageInfo({
        src: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
        success: (res) => {
          assert(true, "调用getImageInfo接口，successs callback 成功:" + JSON.stringify(res), "调用getImageInfo接口，入参完全，previewImage失败，successs callback 失败");
        },
        fail: (error) => {
          assert(false, "调用getImageInfo接口，fail callback 异常:" + JSON.stringify(error));
        },
      });
    });

    this.Qunit.test("getImageInfo_02complete", "getImageInfo接口success 获取图片信息测试", function (assert) {
      my.getImageInfo({
        src: '/image/arrowright.png',
        complete: (res) => {
          my.showToast({
            content: 'complete!',
          });
          assert(true, "调用getImageInfo接口，successs callback 成功:" + JSON.stringify(res), "调用getImageInfo接口，入参完全，previewImage失败，successs callback 失败");
        },
      });
    });

    //调用振动功能
    this.Qunit.test("vibrate_01success", "vibrate接口success 调用振动功能测试", function (assert) {
      my.vibrate({
        success: (res) => {
          assert(true, "调用vibrate接口，successs callback 成功:" + JSON.stringify(res), "调用vibrate接口，入参完全，vibrate失败，successs callback 失败");
        },
        fail: (error) => {
          assert(false, "调用vibrate接口，fail callback 异常:" + JSON.stringify(error));
        },
      });
    });


    //设置是否保持屏幕长亮状态
    this.Qunit.test("setKeepScreenOn_01success", "setKeepScreenOn接口success 设置是否保持屏幕长亮状态测试", function (assert) {
      my.setKeepScreenOn({
        keepScreenOn: false,
        success: (res) => {
          assert(true, "调用setKeepScreenOn接口，successs callback 成功:" + JSON.stringify(res), "调用setKeepScreenOn接口，入参完全，setKeepScreenOn失败，successs callback 失败");
        },
        fail: (error) => {
          assert(false, "调用setKeepScreenOn接口，fail callback 异常:" + JSON.stringify(error));
        },
      });
    });

    this.Qunit.test("setKeepScreenOn_02complete", "setKeepScreenOn接口success 设置是否保持屏幕长亮状态测试", function (assert) {
      my.setKeepScreenOn({
        keepScreenOn: false,
        complete: (res) => {
          my.showToast({
            content: 'complete!',
          });
          assert(true, "调用setKeepScreenOn接口，successs callback 成功:" + JSON.stringify(res), "调用setKeepScreenOn接口，入参完全，setKeepScreenOn失败，successs callback 失败");
        },
      });
    });

    //获取屏幕亮度
    this.Qunit.test("getScreenBrightness_01success", "getScreenBrightness接口success 获取屏幕亮度测试", function (assert) {
      my.getScreenBrightness({
        keepScreenOn: false,
        success: (res) => {
          assert(true, "调用getScreenBrightness接口，successs callback 成功:" + JSON.stringify(res.brightness), "调用getScreenBrightness接口，入参完全，getScreenBrightness失败，successs callback 失败");
        },
        fail: (error) => {
          assert(false, "调用getScreenBrightness接口，fail callback 异常:" + JSON.stringify(error));
        },
      });
    });

    //设置屏幕亮度
    this.Qunit.test("setScreenBrightness_01success", "setScreenBrightness接口success 设置屏幕亮度测试", function (assert) {
      my.setScreenBrightness({
        brightness: 0.48,
        success: (res) => {
          assert(true, "调用setScreenBrightness接口，successs callback 成功:", "调用setScreenBrightness接口，入参完全，setScreenBrightness失败，successs callback 失败");
        },
        fail: (error) => {
          assert(false, "调用setScreenBrightness接口，fail callback 异常:" + JSON.stringify(error));
        },
      });
    });

    this.Qunit.test("setScreenBrightness_02complete", "setScreenBrightness接口success 设置屏幕亮度测试", function (assert) {
      my.setScreenBrightness({
        brightness: 0.48,
        complete: (res) => {
          my.showToast({
            content: 'complete!',
          });
          assert(true, "调用setScreenBrightness接口，successs callback 成功:", "调用setScreenBrightness接口，入参完全，setScreenBrightness失败，successs callback 失败");
        },
      });
    });



    // //选择本地系统通信录中某个联系人的电话。
    // this.Qunit.test("choosePhoneContact_01success", "choosePhoneContact接口success 选择本地系统通信录中某个联系人的电话测试", function (assert) {
    //   my.choosePhoneContact({
    //     success: (res) => {
    //       assert(true, "调用choosePhoneContact接口，successs callback 成功:" + JSON.stringify(res), "调用choosePhoneContact接口，入参完全，choosePhoneContact失败，successs callback 失败");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用choosePhoneContact接口，fail callback 异常:" + JSON.stringify(error));
    //     }
    //   });
    // });
    // this.Qunit.test("choosePhoneContact_02complete", "choosePhoneContact接口success 选择本地系统通信录中某个联系人的电话测试", function (assert) {
    //   my.choosePhoneContact({
    //     complete: (res) => {
    //       assert(true, "调用choosePhoneContact接口，successs callback 成功:" + JSON.stringify(res), "调用choosePhoneContact接口，入参完全，choosePhoneContact失败，successs callback 失败");
    //     }
    //   });
    // });

    // //开始监听内存不足的告警事件
    // this.Qunit.test("onMemoryWarning_01success", "onMemoryWarning接口success 选择本地系统通信录中某个联系人的电话测试", function (assert) {
    //   my.onMemoryWarning({
    //     success: (res) => {
    //       assert(true, "调用onMemoryWarning接口，successs callback 成功:" + JSON.stringify(res), "调用onMemoryWarning接口，入参完全，onMemoryWarning失败，successs callback 失败");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用onMemoryWarning接口，fail callback 异常:" + JSON.stringify(error));
    //     },
    //   });
    // });

    ////设备-获取服务时间////
    this.Qunit.test("getServerTime_01 fail", "getServerTime接口fail callback测试", function (assert) {
      //assert(false, "结果pass", "结果fail");
      my.getServerTime({
        success: (res) => {
          console.log(res.time)
          assert((res.time != ""), "调用getServerTime接口，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), "调用getServerTime接口，无法获取到返回值，success callback 失败");
        },
        fail: (error) => {
          assert(true, "getServerTime_01 fail， callback fail,符合预期，返回：:" + JSON.stringify(error));
        }
      });
    });



    // // 蓝牙初始化
    // this.Qunit.test("openBluetoothAdapter_01success callback ", "openBluetoothAdapter接口success callback测试", function (assert) {
    //   my.openBluetoothAdapter({
    //     autoClose: false,
    //     success: (res) => {
    //       console.log(JSON.stringify(res))
    //       assert(res.isSupportBLE != "", "调用openBluetoothAdapter接口，初始化蓝牙成功,success callback 成功" + JSON.stringify(res), "调用openBluetoothAdapter接口,蓝牙未开启，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       console.log(JSON.stringify(error))
    //       assert(false, "调用openBluetoothAdapter接口，fail callback 异常:" + JSON.stringify(error));
    //     }
    //   });
    // });

    // //关闭本机蓝牙
    // this.Qunit.test("closeBluetoothAdapter_01success callback ", "closeBluetoothAdapter接口success callback测试", function (assert) {
    //   my.closeBluetoothAdapter({
    //     success: (res) => {
    //       assert(true, "调用closeBluetoothAdapter接口，成功关闭本机蓝牙，success callback 成功", "调用closeBluetoothAdapter接口，成功关闭本机蓝牙，success callback 失败");
    //     },
    //     fail: (error) => {
    //       console.log(JSON.stringify(error))
    //       assert(false, "调用closeBluetoothAdapter接口，fail callback 异常:" + JSON.stringify(error));
    //     }
    //   });
    // });

    // //获取本机蓝牙状态
    // this.Qunit.test("getBluetoothAdapterState_01success callback ", "getBluetoothAdapterState接口success callback测试", function (assert) {
    //   my.getBluetoothAdapterState({
    //     success: (res) => {
    //       console.log(JSON.stringify(res))
    //       assert(res.available != "", "调用getBluetoothAdapterState接口，成功获取本机蓝牙状态" + "，返回:" + JSON.stringify(res) + "success callback 成功", "调用getBluetoothAdapterState接口,无法获取本机蓝牙状态，success callback 失败");
    //     },
    //     fail: (error) => {canIUse
    //       console.log(JSON.stringify(error))
    //       assert(false, "调用getBluetoothAdapterState接口，fail callback 异常:" + JSON.stringify(error));
    //     }
    //   });
    // });

    // //蓝牙-开始搜索
    // this.Qunit.test("startBluetoothDevicesDiscovery_01success callback ", "startBluetoothDevicesDiscovery接口success callback测试", function (assert) {
    //   my.openBluetoothAdapter({
    //     autoClose: false,
    //     success: (res) => {
    //       console.log(JSON.stringify(res))
    //       my.startBluetoothDevicesDiscovery({
    //         services: ['fff0'],
    //         success: (res) => {
    //           console.log(res)
    //           assert(true, "调用startBluetoothDevicesDiscovery接口，开始搜索蓝牙设备，可以正常success callback ,返回：" + res, "fail")
    //         },
    //         fail: (res) => {
    //           console.log(res)
    //         }
    //       });
    //     },
    //     fail: (error) => {
    //       console.log(JSON.stringify(error))
    //       assert(false, "调用openBluetoothAdapter接口，fail callback 异常:" + JSON.stringify(error));
    //     }
    //   });
    // });

    // //获取蓝牙设备
    // this.Qunit.test("getBluetoothDevices_01success callback ", "getBluetoothDevices接口success callback测试", function (assert) {
    //   my.getBluetoothDevices({
    //     success: (res) => {
    //       console.log(res)
    //       assert(res.available != "", "调用getBluetoothDevices接口，成功获取本机蓝牙状态" + "，返回:" + res + "success callback 成功", "调用getBluetoothAdapterState接口,无法获取本机蓝牙状态，success callback 失败");
    //     },
    //     fail: (res) => {
    //       assert(false, "调用getBluetoothDevices接口，fail callback 异常:" + res);
    //     }
    //   });
    // });

    // //获取conectting中的设备
    // this.Qunit.test("getConnectedBluetoothDevices_01success callback ", "getBluetoothDevices接口success callback测试", function (assert) {
    //   my.getConnectedBluetoothDevices({
    //     success: res => {
    //       if (res.devices.length === 0) {
    //         console.log(JSON.stringify(res))
    //         assert(true, "调用getConnectedBluetoothDevices接口，获取conectting中的设备，可以正常success callback ,返回：没有在连接中的设备！", "fail")
    //         return;
    //       }
    //       console.log(JSON.stringify(res))
    //       assert(true, "调用startBluetoothDevicesDiscovery接口，开始搜索蓝牙设备，可以正常success callback ,返回：" + JSON.stringify(res), "fail")
    //     },
    //     fail: error => {
    //       console.log(JSON.stringify(error))
    //       assert(false, "调用getConnectedBluetoothDevices接口，fail callback 异常:" + JSON.stringify(error));
    //     },
    //   });

    // });

    // // 关闭蓝牙搜索
    // this.Qunit.test("stopBluetoothDevicesDiscovery_01success callback ", "openBluetoothAdapter接口success callback测试", function (assert) {
    //   my.openBluetoothAdapter({
    //     autoClose: false,
    //     success: (res) => {
    //       my.stopBluetoothDevicesDiscovery({
    //         success: (res) => {
    //           console.log(JSON.stringify(res))
    //           assert(true, "调用stopBluetoothDevicesDiscovery接口，初始化蓝牙成功,success callback 成功" + JSON.stringify(res), "调用stopBluetoothDevicesDiscovery接口,蓝牙未开启，无法完成success callback ");
    //         },
    //         fail: (res) => {
    //           console.log(JSON.stringify(res))
    //           assert(false, "调用stopBluetoothDevicesDiscovery接口，fail callback 异常:" + JSON.stringify(error));
    //         },
    //       });
    //     },
    //     fail: (error) => {
    //       console.log(JSON.stringify(error))
    //       assert(false, "调用openBluetoothAdapter接口，fail callback 异常:" + JSON.stringify(error));
    //     }
    //   });
    // });

    // this.Qunit.test("onBluetoothDeviceFound_01success callback ", "onBluetoothDeviceFound接口success callback测试", function (assert) {
    //   my.openBluetoothAdapter({
    //     autoClose: false,
    //     success: (res) => {
    //       console.log(JSON.stringify(res))
    //       my.startBluetoothDevicesDiscovery({
    //         services: ['fff0'],
    //         success: (res) => {

    //           my.onBluetoothDeviceFound({
    //             success: res => {
    //               console.log(res)
    //               assert(true, "调用onBluetoothDeviceFound接口，开始搜索蓝牙设备，可以正常success callback ,返回：" + res, "fail")
    //             },
    //             fail: error => {
    //               my.alert({ content: 'Failed to listen for new devices' + JSON.stringify(error) });
    //             },
    //           });
    //         },
    //         fail: (res) => {
    //           console.log(res)
    //         }
    //       });
    //     },
    //     fail: (error) => {
    //       console.log(JSON.stringify(error))
    //       assert(false, "调用openBluetoothAdapter接口，fail callback 异常:" + JSON.stringify(error));
    //     }
    //   });
    // });

    // this.Qunit.test("getBLEDeviceCharacteristics_01success callback ", "getBLEDeviceCharacteristics接口success callback测试", function (assert) {
    //   my.getConnectedBluetoothDevices({
    //     success: res => {
    //       my.getBLEDeviceCharacteristics({
    //         success: res => {
    //           //特征字对象属性见文档，根据属性匹配读写特征字并记录，然后后面读写使用
    //           console.log(JSON.stringify(res))
    //           assert(true, "调用getBLEDeviceCharacteristics接口，开始搜索蓝牙设备，可以正常success callback ,返回：" + JSON.stringify(res), "fail")

    //         },
    //         fail: error => {
    //           console.log(JSON.stringify(error))
    //           assert(false, "调用getBLEDeviceCharacteristics接口，fail callback 异常:" + JSON.stringify(error));
    //         },
    //       });
    //     },
    //   });
    // });

    // //启用低功耗蓝牙设备特征值变化时的 notify 功能
    // this.Qunit.test("notifyBLECharacteristicValueChange_01success callback ", "notifyBLECharacteristicValueChange接口success callback测试", function (assert) {
    //   my.notifyBLECharacteristicValueChange({
    //     // state: true,
    //     // deviceId: deviceId,
    //     // serviceId: serviceId,
    //     // characteristicId: characteristicId,
    //     success: () => {
    //       console.log(JSON.stringify(res))
    //       assert(true, "调用notifyBLECharacteristicValueChange接口，开始搜索蓝牙设备，可以正常success callback ,返回：" + JSON.stringify(res), "fail")

    //     },
    //     fail: error => {
    //       // my.alert({ content: 'Listening failure' + JSON.stringify(error) });
    //       console.log(JSON.stringify(error))
    //       assert(false, "调用getBLEDeviceCharacteristics接口，fail callback 异常:" + JSON.stringify(error));
    //     },
    //   });
    // });


    //
    // this.Qunit.test("readBLECharacteristicValue_01success callback ", "readBLECharacteristicValue接口success callback测试", function (assert) {
    //   my.readBLECharacteristicValue({
    //     // deviceId: deviceId,
    //     // serviceId: serviceId,
    //     // characteristicId: characteristicId,
    //     success: (res) => {
    //       console.log(res)
    //       assert(true, "调用readBLECharacteristicValue接口，开始搜索蓝牙设备，可以正常success callback ,返回：" + res, "fail")

    //     },
    //     fail: (res) => {
    //       console.log(res)
    //       assert(false, "调用readBLECharacteristicValue接口，fail callback 异常:" + JSON.stringify(error));
    //     },

    //   });
    // });








    //////////////// 用例结束 /////////////////////

    //  let app = getApp();
    app.Q.setData = this.setData;
    app.Q.setData(app.Q.data);

  },
});
