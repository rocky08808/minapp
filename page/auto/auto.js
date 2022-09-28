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
      
      console.log(app.Q.data.tests[idx]);
      console.log('run test cases');

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

    //////////////// test start /////////////////////
    let app = getApp();
    app.Q.resetDate();
    //////
    this.Qunit.test("redirectTo_01success", "redirectTo接口success callback测试", function (assert) {
      my.redirectTo({
        url: '/page/component/button/button',
        success: () => {
          assert(true, "调用redirectTo接口，入参完全，successs callback 成功", "调用setNavigationBar接口，入参完全，redirectTo失败，successs callback 失败");
        },
        fail: (error) => {
          assert(false, "调用redirectTo接口，fail callback 异常");
        },
      });
    });

    ///关闭当前所有页面跳转到新页面///
    this.Qunit.test("my.reLaunch callback ", "my.reLaunch接口success iBeacon测试", function (assert) {
      my.reLaunch({
        url: '/page/API/index/index',
        success: (res) => {
          my.alert({ content: 'my.reLaunch：' + JSON.stringify(res) });
          assert(true, "调用my.reLaunch接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.reLaunch接口，无法获取到返回值，success callback 失败");
        },
        fail: (error) => {
          my.alert({ content: '获取失败' + JSON.stringify(error), });
          assert(false, "fail", "调用my.reLaunch接口，fail callback 异常");
        },
      });
    });

    this.Qunit.test("my.reLaunch_02complete", "my.reLaunch接口success iBeacon测试", function (assert) {
      my.reLaunch({
        url: '/page/API/index/index',
        complete: (res) => {
          console.log(res)
          my.showToast({
            content: 'complete!',
          });
          assert(true, "调用saveImage接口，可以正常complete callback ", "调用saveImage接口，无法正常complete callback ");
        }
      });
    });

    ///从当前页面跳转到新页面///
    this.Qunit.test("navigateTo(_01success", "navigateTo接口success callback测试", function (assert) {
      my.navigateTo({
        url: '/page/API/navigator/navigator',
        success: () => {
          assert(true, "调用navigateTo接口，入参完全，setNavigationBar成功，successs callback 成功", "调用setNavigationBar接口，入参完全，navigateTo失败，successs callback 失败");
        },
      });
    });

    //用于监听用户发起的主动截屏事件
    this.Qunit.test("onUserCaptureScreen_01success", "onUserCaptureScreen接口success 用于监听用户发起的主动截屏事件测试", function (assert) {
      my.onUserCaptureScreen({
        success: (res) => {
          my.alert({
            content: 'Receive user screenshot'
          });
          assert(true, "调用onUserCaptureScreen接口，successs callback 成功:" + JSON.stringify(res), "调用onUserCaptureScreen接口，入参完全，onUserCaptureScreen失败，successs callback 失败");
        },
        fail: (error) => {
          assert(false, "调用onUserCaptureScreen接口，fail callback 异常:" + JSON.stringify(error));
        }
      });
    });

    // //取消监听截屏事件
    // this.Qunit.test("offUserCaptureScreen_01success", "offUserCaptureScreen接口success 取消监听截屏事件测试", function (assert) {
    //   my.offUserCaptureScreen({
    //     success: (res) => {
    //       assert(true, "调用offUserCaptureScreen接口，successs callback 成功:" + JSON.stringify(res), "调用offUserCaptureScreen接口，入参完全，offUserCaptureScreen失败，successs callback 失败");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用offUserCaptureScreen接口，fail callback 异常:" + JSON.stringify(error));
    //     }
    //   });
    // });

    // //alert组件测试
    // this.Qunit.test("alert_01success", "alert接口success callback测试", function (assert) {
    //   my.alert({
    //     title: 'Bill',
    //     content: 'Here is your bill this month',
    //     buttonText: 'Confirm',
    //     success: () => {
    //       assert(true, "调用alert接口，alert成功，successs callback 成功", "调用alert接口，alert失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("alert_02success", "alert接口success callback测试", function (assert) {
    //   my.alert({
    //     content: 'Here is your bill this month',
    //     buttonText: 'Confirm',
    //     success: () => {
    //       assert(true, "调用alert接口，不传title，alert成功，successs callback 成功", "调用alert接口，不传title，alert失败，successs callback 成功");
    //     },
    //   });
    // });
    // this.Qunit.test("alert_03success", "alert接口success callback测试", function (assert) {
    //   my.alert({
    //     title: 'Bill',
    //     buttonText: 'Confirm',
    //     success: () => {
    //       assert(true, "调用alert接口，不传content，alert成功，successs callback 成功", "调用alert接口，，不传content，alert失败，successs callback 失败");
    //     },
    //     fail: (error) => {
    //       assert(false, "fail", "调用alert接口，fail callback 异常");
    //     },
    //   });
    // });
    // this.Qunit.test("alert_04success", "alert接口success callback测试", function (assert) {
    //   my.alert({
    //     title: 'Bill',
    //     content: 'Here is your bill this month',
    //     success: () => {
    //       assert(true, "调用alert接口，不传buttonText，alert成功，successs callback 成功", "调用alert接口，，不传buttonText，alert失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("alert_05success", "alert接口success callback测试", function (assert) {
    //   my.alert({
    //     title: 'Bill',
    //     success: () => {
    //       assert(true, "调用alert接口，只有title,alert成功，successs callback 成功", "调用alert接口，，只有title,alert失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("alert_06success", "alert接口success callback测试", function (assert) {
    //   my.alert({
    //     content: 'Here is your bill this month',
    //     success: () => {
    //       assert(true, "调用alert接口，只有content，alert成功，successs callback 成功", "调用alert接口，只有content，alert失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("alert_07success", "alert接口success callback测试", function (assert) {
    //   my.alert({
    //     buttonText: 'Confirm',
    //     success: () => {
    //       assert(true, "调用alert接口，只有buttonText，alert成功，successs callback 成功", "调用alert接口，只有buttonText，alert失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("alert_08success", "alert接口success callback测试", function (assert) {
    //   my.alert({
    //     success: () => {
    //       assert(true, "调用alert接口，入参为空，alert成功，successs callback 成功", "调用alert接口，入参为空，alert失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("alert_09complete", "alert接口success callback测试", function (assert) {
    //   my.alert({
    //     title: 'complete',
    //     complete: () => {
    //       my.showToast({
    //         content: 'complete!',
    //       });
    //       assert(true, "调用alert接口，入参为空，alert成功，successs callback 成功", "调用alert接口，入参为空，alert失败，successs callback 失败");
    //     },
    //   });
    // });
    // //Confirm
    // this.Qunit.test("confirm_01success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     title: 'Hint',
    //     content: 'Do you want to continue?',
    //     confirmButtonText: 'Continue',
    //     cancelButtonText: 'Cancel',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参完全，Confirm成功，successs callback 成功", "调用Confirm接口，入参完全，Confirm失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_02success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     content: 'Do you want to continue?',
    //     confirmButtonText: 'Continue',
    //     cancelButtonText: 'Cancel',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参title为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参title为空，Confirm失败，successs callback 失败");
    //     },
    //     fail: (result) => {
    //       assert(result.confirm == false, "调用Confirm接口，入参title为空，Confirm失败，successs callback 成功", "调用Confirm接口，入参title为空，Confirm失败，successs callback 失败");
    //     },
    //     complete: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参title为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参title为空，Confirm失败，successs callback 失败");
    //     }
    //   });
    // });
    // this.Qunit.test("confirm_03success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     title: 'Hint',
    //     confirmButtonText: 'Continue',
    //     cancelButtonText: 'Cancel',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参content为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参content为空，Confirm失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_04success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     title: 'Hint',
    //     content: 'Do you want to continue?',
    //     cancelButtonText: 'Cancel',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参confirmButtonText为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参confirmButtonText为空，Confirm失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_05success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     title: 'Hint',
    //     content: 'Do you want to continue?',
    //     confirmButtonText: 'Continue',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参cancelButtonText为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参cancelButtonText为空，Confirm失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_06success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参全部为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参全部为空，Confirm失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_07success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     confirmButtonText: 'Continue',
    //     cancelButtonText: 'Cancel',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参title为空，content为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参title为空，content为空，Confirm失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_08success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     content: 'Do you want to continue?',
    //     cancelButtonText: 'Cancel',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参title为空，confirmButtonText为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参title为空，confirmButtonText为空，Confirm失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_08success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     title: 'Hint',
    //     content: 'Do you want to continue?',
    //     confirmButtonText: 'Continue',
    //     cancelButtonText: 'Cancel',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参title为空，content为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参title为空，content为空，Confirm失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_09success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     content: 'Do you want to continue?',
    //     confirmButtonText: 'Continue',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参title为空，cancelButtonText为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参title为空，cancelButtonText为空，Confirm失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_10success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     title: 'Hint',
    //     cancelButtonText: 'Cancel',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参content为空，confirmButtonText为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参content为空，confirmButtonText为空，Confirm失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_11success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     title: 'Hint',
    //     confirmButtonText: 'Continue',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参content为空，cancleButtonText为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参content为空，cancleButtonText为空，Confirm失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_12success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     title: 'Hint',
    //     content: 'Do you want to continue?',

    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参confirmButtonText为空，cancelButtonText为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参confirmButtonText为空，cancelButtonText为空，Confirm失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_13success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     title: 'Hint',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参title不为空，其他为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参title不为空，其他为空，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_14success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     content: 'Do you want to continue?',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参content不为空，其他为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参content不为空，其他为空，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_15success", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     title: 'fail',
    //     confirmButtonText: 'Continue',
    //     cancelButtonText: 'Cancel',
    //     success: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参confirmButtonText不为空，其他为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参confirmButtonText不为空，其他为空，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("confirm_16complete", "confirm接口success callback测试", function (assert) {
    //   my.confirm({
    //     title: 'complete',
    //     cancelButtonText: 'Cancel',
    //     complete: (result) => {
    //       assert(result.confirm == true, "调用Confirm接口，入参cancelButtonText不为空，其他为空，Confirm成功，successs callback 成功", "调用Confirm接口，入参cancelButtonText不为空，其他为空，successs callback 失败");
    //     },
    //   });
    // });

    // //chooseImage 测试用例
    // this.Qunit.test("chooseImage_01success callback ", "chooseImage接口success callback测试", function (assert) {
    //   my.chooseImage({
    //     count: 2,
    //     success: (res) => {
    //       img.src = res.apFilePaths[0];
    //       assert(true, "调用chooseImage接口，success callback 正常", "调用chooseImage接口，出现异常，无法完成success callback ");
    //     },
    //   });
    // });

    // //chooseImage 测试用例
    // this.Qunit.test("chooseImage_02complete", "chooseImage接口success callback测试", function (assert) {
    //   my.chooseImage({
    //     count: 2,
    //     complete: (res) => {
    //       my.showToast({
    //         content: 'complete!',
    //       });
    //       assert(true, "调用chooseImage接口，success callback 正常", "调用chooseImage接口，出现异常，无法完成success callback ");
    //     },
    //   });
    // });
    // //chooseImage 测试用例
    // this.Qunit.test("chooseImage_03success callback ", "chooseImage接口success callback测试", function (assert) {
    //   my.chooseImage({
    //     count: 1,
    //     sourceType: "camera",
    //     sizeType: "original",

    //     success: (res) => {
    //       assert(true, "调用chooseImage接口，success callback 正常", "调用chooseImage接口，出现异常，无法完成success callback ");
    //     },
    //   });
    // });


    // ////多媒体-保存图片////
    //  //saveImage 测试用例
    // this.Qunit.test("saveImage_01success callback ", "saveImage接口complete callback测试", function (assert) {
    //   my.saveImage({
    //     url: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
    //     success: (res) => {
    //       my.showToast({ content: JSON.stringify(res) });
    //       assert(true, "调用saveImage接口，可以正常complete callback " + JSON.stringify(res));
    //     },
    //   });
    // });

    // this.Qunit.test("saveImage_01", "saveImage接口success callback测试", function (assert) {
    //   my.saveImage({
    //     url: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
    //     showActionSheet: true,
    //   });
    //   assert(true, "调用saveImage接口,显示操作菜单，图片保存成功，successs callback 成功", "调用saveImage接口，保存图片不成功，success callback 失败");
    // });

    // this.Qunit.test("saveImage_02", "saveImage接口success callback测试", function (assert) {
    //   my.saveImage({
    //     url: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
    //     showActionSheet: false,
    //   });
    //   assert(true, "调用saveImage接口,不显示操作菜单，图片保存成功，successs callback 成功", "调用saveImage接口，success callback 失败");
    // });
    
    // this.Qunit.test("saveImage_03 URL wrong", "saveImage接口success callback测试", function (assert) {
    //   my.saveImage({
    //     url: 'https://XXXXX.jpg',
    //     showActionSheet: false,
    //     fail: (res) => {
    //       console.log(res.error)
    //       assert(false, "fail", "调用saveImage接口，URL错误，fail callback 异常");
    //     },
    //   });
    //   assert(true, "调用saveImage接口，URL错误，fail callback ，无法保存图片", "fail");
    // });

    // this.Qunit.test("saveImage_04complete callback ", "saveImage接口complete callback测试", function (assert) {
    //   my.saveImage({
    //     url: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
    //     complete: (res) => {
    //       console.log(res)
    //       assert(true, "调用saveImage接口，可以正常complete callback ", "调用saveImage接口，无法正常complete callback ");
    //     },
    //   });
    // });

    // //scan 测试用例
    // this.Qunit.test("scan_01success callback ", "scan接口success callback测试", function (assert) {
    //   my.scan({
    //     type: 'qr',
    //     success: (res) => {
    //       my.alert({ title: res.code });
    //       assert(true, "调用scan接口，success callback 正常", "调用scan接口，出现异常，无法完成success callback ");
    //     },
    //   });
    // });
    // this.Qunit.test("scan_02success callback ", "scan接口success callback测试", function (assert) {
    //   my.scan({
    //     type: 'qr',
    //     hideAlbum: true,
    //     success: (res) => {
    //       my.alert({ title: res.code });
    //       assert(true, "调用scan接口，success callback 正常", "调用scan接口，出现异常，无法完成success callback ");
    //     },
    //   });
    // });
    // this.Qunit.test("scan_03success callback ", "scan接口success callback测试", function (assert) {
    //   my.scan({
    //     type: 'qr',
    //     hideAlbum: false,
    //     success: (res) => {
    //       my.alert({ title: res.code });
    //       assert(true, "调用scan接口，success callback 正常", "调用scan接口，出现异常，无法完成success callback ");
    //     },
    //   });
    // });
    // this.Qunit.test("scan_04success callback ", "scan接口success callback测试", function (assert) {
    //   my.scan({
    //     hideAlbum: false,
    //     success: (res) => {
    //       my.alert({ title: res.code });
    //       assert(true, "调用scan接口，success callback 正常", "调用scan接口，出现异常，无法完成success callback ");
    //     },
    //   });
    // });
    // this.Qunit.test("scan_05success callback ", "scan接口success callback测试", function (assert) {
    //   my.scan({
    //     hideAlbum: true,
    //     success: (res) => {
    //       my.alert({ title: res.code });
    //       assert(true, "调用scan接口，success callback 正常", "调用scan接口，出现异常，无法完成success callback ");
    //     },
    //   });
    // });
    // this.Qunit.test("scan_06complete", "scan接口success callback测试", function (assert) {
    //   my.scan({
    //     type: 'qr',
    //     complete: (res) => {
    //       my.showToast({
    //         content: 'complete!',
    //       });
    //       assert(true, "调用scan接口，success callback 正常", "调用scan接口，出现异常，无法完成success callback ");
    //     },
    //   });
    // });


    // this.Qunit.test("navigateToMiniProgram", "navigateToMiniProgram接口success callback测试", function (assert) {
    //   my.navigateToMiniProgram({
    //     // appId: '2171010045423413',
    //     appId: '2171020050578183',
    //     path: 'page/API/index/index',
    //     extraData: {
    //       "data1": "test"
    //     },
    //     success: (res) => {
    //       my.showToast({ content: 'success!', });
    //       console.log(JSON.stringify(res))
    //     },
    //     fail: (res) => {
    //       console.log(JSON.stringify(res))
    //     },
    //     complete: (res) => {
    //       my.showToast({ content: 'complete', });
    //       console.log(JSON.stringify(res))
    //     }
    //   });
    // });

    // this.Qunit.test("navigateBackMiniProgram", "navigateBackMiniProgram接口success callback测试", function (assert) {
    //   my.navigateBackMiniProgram({
    //     extraData: {
    //       "data1": "test"
    //     },
    //     success: (res) => {
    //       my.showToast({ content: 'success!', });
    //       console.log(JSON.stringify(res))
    //     },
    //     fail: (res) => {
    //       console.log(JSON.stringify(res))
    //     },
    //     complete: (res) => {
    //       my.showToast({ content: 'complete', });
    //       console.log(JSON.stringify(res))
    //     }
    //   });
    // });
    // //switchTab测试，URL没有
    // this.Qunit.test("switchTab_01success", "switchTab接口success callback测试", function (assert) {
    //   my.switchTab({
    //     url: '/page/component/index',
    //     success: (res) => {
    //       my.showToast({
    //         content: 'success!',
    //       });
    //       assert(true, "调用switchTab接口，入参完全，switchTab成功，successs callback 成功", "调用switchTab接口，入参完全，switchTab失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("switchTab_02success", "switchTab接口success callback测试", function (assert) {
    //   my.switchTab({
    //     success: (res) => {
    //       my.showToast({
    //         content: 'success!',
    //       });
    //       assert(true, "调用switchTab接口，入参完全，switchTab成功，successs callback 成功", "调用switchTab接口，入参完全，switchTab失败，successs callback 失败");
    //     },
    //   });
    // });
    // this.Qunit.test("switchTab_03complete", "switchTab接口success callback测试", function (assert) {
    //   my.switchTab({
    //     url: '/page/component/index',
    //     complete: (res) => {
    //       my.showToast({
    //         content: 'complete!',
    //       });
    //       console.log(res)
    //       assert(true, "调用saveImage接口，可以正常complete callback ", "调用saveImage接口，无法正常complete callback ");
    //     },
    //   });
    // });

    // // this.Qunit.test("offSocketClose", "offSocketClose接口success socket测试", function (assert) {
    // //   my.offSocketClose({
    // //     success: (res) => {
    // //       my.alert({ title: res.code });
    // //       assert(true, "调用offSocketClose接口，success callback 正常", "调用offSocketClose接口，出现异常，无法完成success callback ");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用offSocketClose接口，fail callback 异常");
    // //     }
    // //   });
    // //   // my.onSocketClose(this.callback);
    // //   // var res =my.offSocketClose(this.callback);
    // //   // my.alert({content: '连接已关闭！'});
    // //   // assert(true, "调用offSocketClose接口，success callback 正常 offSocketClose:"+JSON.stringify(res), "调用offSocketClose接口，出现异常，无法完成success callback "); 
    // // });


    // // this.Qunit.test("onSocketError", "onSocketError接口success socket测试", function (assert) {
    // //   my.connectSocket({
    // //     url: 'wss://imobilegmp.Miniprogram.com/group/connect'
    // //   });
    // //   my.onSocketOpen(function (res) {
    // //     my.alert({ title: 'WebSocket 连接已打开！' });
    // //   });
    // //   my.onSocketError(function (res) {
    // //     success: (res) => {
    // //       my.alert({ content: 'WebSocket 连接打开失败，请检查！' + JSON.stringify(res) });
    // //       assert(true, "WebSocket 连接打开失败，请检查 调用hideAllFavoriteMenu接口，正常success callback ，返回:" + JSON.stringify(res), "调用hideAllFavoriteMenu接口，无法获取到返回值，success callback 失败");
    // //     }
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用hideAllFavoriteMenu接口，fail callback 异常");
    // //     }
    // //   });
    // // });


    // // this.Qunit.test("onSocketMessage", "onSocketMessage接口success socket测试", function (assert) {
    // //   var res = my.connectSocket({
    // //     url: 'wss://imobilegmp.Miniprogram.com/group/connect',
    // //     // success: res => {
    // //     //   assert(true, "调用connectSocket接口，success callback 正常", "调用connectSocket接口，出现异常，无法完成success callback "); 
    // //     // }
    // //   })
    // //   //my.alert({ title: 'connectSocket：'+res});
    // //   my.onSocketMessage(function (res) {
    // //     success: (res) => {
    // //       my.alert({ title: '收到服务器内容：' + res.data });
    // //       assert(true, "收到服务器内容：" + res.data, "调用connectSocket接口，出现异常，无法完成success callback ");
    // //     }
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用hideAllFavoriteMenu接口，fail callback 异常");
    // //     }
    // //   });
    // // });

    // // this.Qunit.test("offSocketMessage", "offSocketMessage接口success socket测试", function (assert) {
    // //   var res = my.offSocketMessage(this.callback);
    // //   assert(true, "调用offSocketMessage接口，success callback 正常 offSocketMessage:" + JSON.stringify(res), "调用offSocketMessage接口，出现异常，无法完成success callback ");
    // // });


    // // this.Qunit.test("onSocketOpen", "onSocketOpen接口success socket测试", function (assert) {
    // //   my.connectSocket({
    // //     url: 'wss://imobilegmp.Miniprogram.com/group/connect',
    // //   });
    // //   my.connectSocket({
    // //     url: 'wss://imobilegmp.Miniprogram.com/group/connect', // 开发者服务器接口地址，必须是 wss protocol，且域名必须是后台配置的合法域名
    // //     success: (res) => {
    // //       my.showToast({
    // //         content: 'success', // 文字内容
    // //       });
    // //     },
    // //     fail: () => {
    // //       my.showToast({
    // //         content: 'fail', // 文字内容
    // //       });
    // //     }
    // //   });
    // //   my.onSocketOpen(function (res) {
    // //     success: (res) => {
    // //       my.alert({ title: 'WebSocket 连接已打开！' });
    // //       assert(true, "调用onSocketOpen接口，success callback 正常 onSocketOpen" + JSON.stringify(res), "调用onSocketOpen接口，出现异常，无法完成success callback ");
    // //     }
    // //     fail: () => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用onSocketOpen接口，fail callback 异常");
    // //     }

    // //   });
    // // });


    // // this.Qunit.test("getBatteryInfo", "getBatteryInfo接口success getBatteryInfo测试", function (assert) {
    // //   my.getBatteryInfo({
    // //     success: (res) => {
    // //       my.alert({ content: '系统信息：' + JSON.stringify(res), });
    // //       console.log({ content: '系统信息：' + JSON.stringify(res), });
    // //       assert(true, "调用getBatteryInfo接口，success callback 正常", "调用getBatteryInfo接口，出现异常，无法完成success callback ");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用getBatteryInfo接口，fail callback 异常");
    // //     }
    // //   });
    // // });

    // // this.Qunit.test("getBatteryInfoSync", "getBatteryInfoSync接口success getBatteryInfoSync测试", function (assert) {
    // //   var res = my.getBatteryInfoSync({
    // //     success: (res) => {
    // //       my.alert({ content: '系统信息：' + JSON.stringify(res) });
    // //       assert(true, "调用getBatteryInfoSync接口，可以正常complete callback ", "调用getBatteryInfoSync接口，无法正常complete callback ");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用getBatteryInfoSync接口，fail callback 异常");
    // //     },
    // //   });
    // // });


    // // this.Qunit.test("setTabBarItem", "setTabBarItem接口success setTabBarItem测试", function (assert) {
    // //   my.setTabBarItem({
    // //     index: 0,
    // //     text: 'text',
    // //     iconPath: '/image/iconPath',
    // //     selectedIconPath: '/image/selectedIconPath',
    // //     success: (res) => {
    // //       my.alert({ content: 'success' + JSON.stringify(res), });
    // //       assert(true, "调用setTabBarItem接口，可以正常complete callback ", "调用setTabBarItem接口，无法正常complete callback ");
    // //     },
    // //   })
    // // });


    // // this.Qunit.test("showSharePanel_01success callback ", "showSharePanel接口success showSharePanel测试", function (assert) {
    // //   var res = my.showSharePanel();
    // //   my.alert({ content: '调用showSharePanel接口：' + JSON.stringify(res) });
    // //   assert(true, "调用showSharePanel接口，可以正常complete callback ", "调用showSharePanel接口，无法正常complete callback ");
    // //   my.showSharePanel({
    // //     success: (res) => {
    // //       my.alert({ content: 'showSharePanel：' + JSON.stringify(res) });
    // //       assert(true, "调用showSharePanel接口，正常success callback ，返回:" + JSON.stringify(res), "调用showSharePanel接口，无法获取到返回值，success callback 失败");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用showSharePanel接口，fail callback 异常");
    // //     }
    // //   });
    // // });

    // // this.Qunit.test("hideAddToDesktopMenu_01success callback ", "hideAddToDesktopMenu接口success hideAddToDesktopMenu测试", function (assert) {
    // //   //my.hideAddToDesktopMenu();
    // //   my.hideAddToDesktopMenu({
    // //     success: (res) => {
    // //       my.alert({ content: 'hideAddToDesktopMenu：' + JSON.stringify(res) });
    // //       assert(true, "调用hideAddToDesktopMenu接口，正常success callback ，返回:" + JSON.stringify(res), "调用hideAddToDesktopMenu接口，无法获取到返回值，success callback 失败");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用hideAddToDesktopMenu接口，fail callback 异常");
    // //     }
    // //   });
    // // });


    // // this.Qunit.test("hideAllAddToDesktopMenu_01success callback ", "hideAllAddToDesktopMenu接口success hideAllAddToDesktopMenu测试", function (assert) {
    // //   //my.hideAllAddToDesktopMenu();
    // //   my.hideAllAddToDesktopMenu({
    // //     success: (res) => {
    // //       my.alert({ content: 'hideAllAddToDesktopMenu：' + JSON.stringify(res) });
    // //       assert(true, "调用hideAllAddToDesktopMenu接口，正常success callback ，返回:" + JSON.stringify(res), "调用hideAllAddToDesktopMenu接口，无法获取到返回值，success callback 失败");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用hideAllAddToDesktopMenu接口，fail callback 异常");
    // //     }
    // //   });
    // // });

    // // this.Qunit.test("hideAllFavoriteMenu_01success callback ", "hideAllFavoriteMenu接口success hideAllFavoriteMenu测试", function (assert) {
    // //   // my.hideAllFavoriteMenu();
    // //   // assert(true, "调用hideAllFavoriteMenu接口，可以正常complete callback ", "调用hideAllFavoriteMenu接口，无法正常complete callback ");
    // //   my.hideAllFavoriteMenu({
    // //     success: (res) => {
    // //       my.alert({ content: 'hideAllFavoriteMenu：' + JSON.stringify(res) });
    // //       assert(true, "调用hideAllFavoriteMenu接口，正常success callback ，返回:" + JSON.stringify(res), "调用hideAllFavoriteMenu接口，无法获取到返回值，success callback 失败");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用hideAllFavoriteMenu接口，fail callback 异常");
    // //     }
    // //   });
    // // });

    // // this.Qunit.test("my.onLocatedComplete_01success callback ", "my.onLocatedComplete接口success my.onLocatedComplete测试", function (assert) {
    // //   my.onLocatedComplete({
    // //     success: (res) => {
    // //       my.setLocatedCity({
    // //         locatedCityId: res.locatedCityId,//res.locatedCityId
    // //         locatedCityName: '修改后的城市名',
    // //         success: (res) => {
    // //           my.alert({ content: '修改当前定位城市成功' + JSON.stringify(res), });
    // //           assert(true, "调用my.setLocatedCity接口，可以正常complete callback ", "调用my.setLocatedCity接口，无法正常complete callback ");
    // //         },
    // //         fail: (error) => {
    // //           my.alert({ content: '修改当前定位城市失败' + JSON.stringify(error), });
    // //           assert(false, "fail", "调用my.setLocatedCity接口，fail callback 异常");
    // //         },
    // //       });
    // //       assert(true, "调用my.onLocatedComplete接口，可以正常complete callback ", "调用my.onLocatedComplete接口，无法正常complete callback ");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: 'onLocatedComplete失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用my.onLocatedComplete接口，fail callback 异常");
    // //     }
    // //   });
    // // });


    // // this.Qunit.test("my.getBeacons_01success callback ", "my.getBeacons接口success iBeacon测试", function (assert) {
    // //   //my.getBeacons();
    // //   my.getBeacons({
    // //     success: (res) => {
    // //       my.alert({ content: 'my.getBeacons：' + JSON.stringify(res) });
    // //       assert(true, "调用my.getBeacons接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.getBeacons接口，无法获取到返回值，success callback 失败");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用my.getBeacons接口，fail callback 异常");
    // //     }
    // //   });
    // // });

    // // this.Qunit.test("my.onBeaconServiceChange_01success callback ", "my.onBeaconServiceChange接口success iBeacon测试", function (assert) {
    // //   my.onBeaconServiceChange({
    // //     success: (res) => {
    // //       my.alert({ content: 'my.onBeaconServiceChange：' + JSON.stringify(res) });
    // //       assert(true, "调用my.onBeaconServiceChange接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.onBeaconServiceChange接口，无法获取到返回值，success callback 失败");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用my.onBeaconServiceChange接口，fail callback 异常");
    // //     }
    // //   });
    // // });


    // // this.Qunit.test("my.onBeaconUpdate_01success callback ", "my.onBeaconUpdate接口success iBeacon测试", function (assert) {
    // //   my.onBeaconUpdate({
    // //     success: (res) => {
    // //       my.alert({ content: 'my.onBeaconUpdate：' + JSON.stringify(res) });
    // //       assert(true, "调用my.onBeaconUpdate接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.onBeaconUpdate接口，无法获取到返回值，success callback 失败");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用my.onBeaconUpdate接口，fail callback 异常");
    // //     }
    // //   });
    // // });


    // // this.Qunit.test("my.startBeaconDiscovery_01success callback ", "my.startBeaconDiscovery接口success iBeacon测试", function (assert) {
    // //   my.startBeaconDiscovery({
    // //     uuids: ['55555333', '5544ssssss'],
    // //     success: (res) => {
    // //       my.alert({ content: 'my.startBeaconDiscovery：' + JSON.stringify(res) });
    // //       assert(true, "调用my.startBeaconDiscovery接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.startBeaconDiscovery接口，无法获取到返回值，success callback 失败");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用my.startBeaconDiscovery接口，fail callback 异常");
    // //     }
    // //   });
    // // });


    // // this.Qunit.test("my.stopBeaconDiscovery_01success callback ", "my.stopBeaconDiscovery接口success iBeacon测试", function (assert) {
    // //   my.stopBeaconDiscovery({
    // //     success: (res) => {
    // //       my.alert({ content: 'my.stopBeaconDiscovery：' + JSON.stringify(res) });
    // //       assert(true, "调用my.stopBeaconDiscovery接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.stopBeaconDiscovery接口，无法获取到返回值，success callback 失败");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用my.stopBeaconDiscovery接口，fail callback 异常");
    // //     }
    // //   });
    // // });


    // // this.Qunit.test("my.calculateRoute_01success callback ", "my.calculateRoute接口success 计算路径测试", function (assert) {
    // //   my.calculateRoute({
    // //     searchType: "bus",                // 搜索类型："walk", "bus", "drive", "ride", 默认值为walk
    // //     startLat: 30.257839,              // 起点纬度
    // //     startLng: 120.062726,             // 起点经度
    // //     endLat: 30.256718,                // 终点纬度
    // //     endLng: 120.059985,               // 终点经度
    // //     throughPoints: [{ lat: 39.866958, lng: 116.494231 }, { lat: 39.9357, lng: 116.581092 }],//途径点,仅驾车规划有效，searchType=“drive”
    // //     mode: 0,                          // 只有驾车模式和公交模式支持，可选，具体值见 mode 参数列表
    // //     city: 'hangzhou',                 // 公交模式下必填
    // //     destinationCity: 'hangzhou',      // 公交跨城模式下必填
    // //     success: (e) => {
    // //       console.log(e.distance);
    // //       console.log(e.duration);
    // //       my.alert({ content: 'e.distance' + e.distance });
    // //       my.alert({ content: 'e.duration' + e.duration });
    // //       assert(true, "调用my.calculateRoute接口，可以正常complete callback ", "调用my.calculateRoute接口，无法正常complete callback ");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用my.calculateRoute接口，fail callback 异常");
    // //     }
    // //   });
    // // });


    // this.Qunit.test("my.showNavigationBarLoading callback ", "my.showNavigationBarLoading接口success iBeacon测试", function (assert) {
    //   my.showNavigationBarLoading({
    //     success: (res) => {
    //       my.alert({ content: 'my.showNavigationBarLoading：' + JSON.stringify(res) });
    //       assert(true, "调用my.showNavigationBarLoading接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.showNavigationBarLoading接口，无法获取到返回值，success callback 失败");
    //     },
    //     fail: (error) => {
    //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    //       assert(false, "fail", "调用my.showNavigationBarLoading接口，fail callback 异常");
    //     }
    //   });
    // });

    // this.Qunit.test("my.hideNavigationBarLoading callback ", "my.hideNavigationBarLoading接口success iBeacon测试", function (assert) {
    //   my.hideNavigationBarLoading({
    //     success: (res) => {
    //       my.alert({ content: 'my.hideNavigationBarLoading：' + JSON.stringify(res) });
    //       assert(true, "调用my.hideNavigationBarLoading接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.hideNavigationBarLoading接口，无法获取到返回值，success callback 失败");
    //     },
    //     fail: (error) => {
    //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    //       assert(false, "fail", "调用my.hideNavigationBarLoading接口，fail callback 异常");
    //     }
    //   });
    // });

    // this.Qunit.test("my.hideTabBar callback ", "my.hideTabBar接口success iBeacon测试", function (assert) {
    //   my.hideTabBar({
    //     success: (res) => {
    //       my.alert({ content: 'my.hideTabBar：' + JSON.stringify(res) });
    //       assert(true, "调用my.hideTabBar接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.hideTabBar接口，无法获取到返回值，success callback 失败");
    //     },
    //     fail: (error) => {
    //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    //       assert(false, "fail", "调用my.hideTabBar接口，fail callback 异常");
    //     },
    //     complete: (res) => {
    //       console.log(res)
    //       assert(true, "调用saveImage接口，可以正常complete callback ", "调用saveImage接口，无法正常complete callback ");
    //     }
    //   });
    // });

    // this.Qunit.test("my.hideTabBar animation为true callback ", "my.hideTabBar接口success iBeacon测试", function (assert) {
    //   my.hideTabBar({
    //     animation: true,
    //     success: (res) => {
    //       my.alert({ content: 'my.hideTabBar：' + JSON.stringify(res) });
    //       assert(true, "调用my.hideTabBar接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.hideTabBar接口，无法获取到返回值，success callback 失败");
    //     },
    //     fail: (error) => {
    //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    //       assert(false, "fail", "调用my.hideTabBar接口，fail callback 异常");
    //     },
    //     complete: (res) => {
    //       console.log(res)
    //       assert(true, "调用saveImage接口，可以正常complete callback ", "调用saveImage接口，无法正常complete callback ");
    //     }
    //   });
    // });



    


    // this.Qunit.test("my.prompt callback ", "my.prompt接口success iBeacon测试", function (assert) {
    //   my.prompt({
    //     title: 'Title',
    //     message: 'Explain the current status and prompt the user solution. It is best not to exceed two lines.',
    //     placeholder: 'Leave a message to a friend',
    //     okButtonText: 'Confirm',
    //     cancelButtonText: 'Cancel',
    //     success: (res) => {
    //       my.alert({ content: 'my.prompt：' + JSON.stringify(res) });
    //       assert(true, "调用my.prompt接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.prompt接口，无法获取到返回值，success callback 失败");
    //     },
    //     fail: (error) => {
    //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    //       assert(false, "fail", "调用my.prompt接口，fail callback 异常");
    //     },
    //   });
    // });

    // this.Qunit.test("my.prompt_02complete", "my.prompt接口success iBeacon测试", function (assert) {
    //   my.prompt({
    //     title: 'Title',
    //     align: 'center',
    //     message: 'Explain the current status and prompt the user solution. It is best not to exceed two lines.',
    //     placeholder: 'Leave a message to a friend',
    //     okButtonText: 'Confirm',
    //     cancelButtonText: 'Cancel',
    //     complete: (res) => {
    //       my.showToast({
    //         content: 'complete!',
    //       });
    //       assert(true, "调用my.prompt接口");
    //     }
    //   });
    // });

    // this.Qunit.test("my.prompt callback align center", "my.prompt接口success iBeacon测试", function (assert) {
    //   my.prompt({
    //     title: 'Title',
    //     align: 'center',
    //     message: 'Explain the current status and prompt the user solution. It is best not to exceed two lines.',
    //     placeholder: 'Leave a message to a friend',
    //     okButtonText: 'Confirm',
    //     cancelButtonText: 'Cancel',
    //     success: (res) => {
    //       my.alert({ content: 'my.prompt：' + JSON.stringify(res) });
    //       assert(true, "调用my.prompt接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.prompt接口，无法获取到返回值，success callback 失败");
    //     },
    //     fail: (error) => {
    //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    //       assert(false, "fail", "调用my.prompt接口，fail callback 异常");
    //     },
    //     complete: (res) => {
    //       my.alert({ content: 'my.prompt：' + JSON.stringify(res) });
    //       assert(true, "调用my.prompt接口");
    //     }
    //   });
    // });

    

    // this.Qunit.test("multiLevelSelect_01success", "multiLevelSelect接口success multiLevelSelect测试", function (assert) {
    //   my.multiLevelSelect({
    //     title: '多级联选择器',//级联选择标题
    //     list: [
    //       {
    //         name: "杭州市",//条目名称
    //         subList: [
    //           {
    //             name: "西湖区",
    //             subList: [
    //               {
    //                 name: "古翠街道"
    //               },
    //               {
    //                 name: "文新街道"
    //               }
    //             ]
    //           },
    //           {
    //             name: "上城区",
    //             subList: [
    //               {
    //                 name: "延安街道"
    //               },
    //               {
    //                 name: "龙翔桥街道"
    //               }
    //             ]
    //           }
    //         ]//级联子数据列表
    //       }],//级联数据列表
    //     success: () => {
    //       assert(true, "调用multiLevelSelect接口，入参完全，successs callback 成功", "调用multiLevelSelect接口，入参完全，multiLevelSelect失败，successs callback 失败");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用multiLevelSelect接口，fail callback 异常");
    //     },
    //   });
    // });

    // this.Qunit.test("multiLevelSelect_02complete", "multiLevelSelect接口success multiLevelSelect测试", function (assert) {
    //   my.multiLevelSelect({
    //     title: '多级联选择器',//级联选择标题
    //     list: [
    //       {
    //         name: "杭州市",//条目名称
    //         subList: [
    //           {
    //             name: "西湖区",
    //             subList: [
    //               {
    //                 name: "古翠街道"
    //               },
    //               {
    //                 name: "文新街道"
    //               }
    //             ]
    //           },
    //           {
    //             name: "上城区",
    //             subList: [
    //               {
    //                 name: "延安街道"
    //               },
    //               {
    //                 name: "龙翔桥街道"
    //               }
    //             ]
    //           }
    //         ]//级联子数据列表
    //       }],//级联数据列表
    //     complete: () => {
    //       my.showToast({
    //         content: 'complete!',
    //       });
    //       assert(true, "调用multiLevelSelect接口，入参完全，successs callback 成功", "调用multiLevelSelect接口，入参完全，multiLevelSelect失败，successs callback 失败");
    //     },
    //   });
    // });


    // this.Qunit.test("my.setOptionMenu callback _01（URL）", "my.hideToast接口success iBeacon测试", function (assert) {
    //   my.setOptionMenu({
    //     icon: 'https://img.alicdn.com/tps/i3/T1OjaVFl4dXXa.JOZB-114-114.png',
    //     success: (res) => {
    //       my.showToast({ content: 'setOptionMenu：' + JSON.stringify(res) });
    //       assert(true, "调用my.setOptionMenu接口，正常success callback :" + JSON.stringify(res), "调用my.hideTabBar接口 callback 失败"+ JSON.stringify(res));
    //     } 
    //   });
    // });

    // this.Qunit.test("my.setOptionMenu callback _02（Base64）", "my.hideToast接口success iBeacon测试", function (assert) {
    //   my.setOptionMenu({
    //     icon: 'https://img.alicdn.com/tps/i3/T1OjaVFl4dXXa.JOZB-114-114.png',
    //     success: (res) => {
    //       my.showToast({ content: 'setOptionMenu：' + JSON.stringify(res) });
    //       assert(true, "调用my.setOptionMenu接口，正常success callback :" + JSON.stringify(res), "调用my.hideTabBar接口 callback 失败"+ JSON.stringify(res));
    //     } 
    //   });
    // });


    // this.Qunit.test("my.datePicker callback ", "my.hideToast接口success iBeacon测试", function (assert) {
    //   my.datePicker({
    //     format: 'HH:mm:ss',
    //     currentDate: '12:12:12',
    //     startDate: '11:11:11',
    //     endDate: '13:13:13',
    //     success: (res) => {
    //       my.alert({ content: 'my.datePicker：' + JSON.stringify(res) });
    //       assert(true, "调用my.datePicker接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.hideTabBar接口，无法获取到返回值，success callback 失败");
    //     },
    //     fail: (error) => {
    //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    //       assert(false, "fail", "调用my.hideToast接口，fail callback 异常");
    //     }
    //   });
    // });

    // // this.Qunit.test("my.hideBackHome callback ", "my.hideToast接口success iBeacon测试", function (assert) {
    // //   my.hideBackHome({
    // //     success: (res) => {
    // //       my.alert({ content: 'my.hideBackHome：' + JSON.stringify(res) });
    // //       assert(true, "调用my.hideBackHome接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.hideTabBar接口，无法获取到返回值，success callback 失败");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用my.hideToast接口，fail callback 异常");
    // //     }
    // //   });
    // // });

    // // this.Qunit.test("my.showActionSheet callback ", "my.hideToast接口success iBeacon测试", function (assert) {
    // //   my.showActionSheet({
    // //     title: 'Choose the Issuing bank',
    // //     items: banks,
    // //     success: (res) => {
    // //       my.alert({ content: 'my.showActionSheet：' + JSON.stringify(res) });
    // //       assert(true, "调用my.showActionSheet接口，正常success callback ，返回:" + JSON.stringify(res), "调用my.hideTabBar接口，无法获取到返回值，success callback 失败");
    // //     },
    // //     fail: (error) => {
    // //       my.alert({ content: '获取失败' + JSON.stringify(error), });
    // //       assert(false, "fail", "调用my.showActionSheet接口，fail callback 异常");
    // //     }
    // //   });
    // // });


    // //用户可以选择将该表单以“创建新联系人”或“添加到现有联系人”的方式，写入到手机系统的通讯录。
    // this.Qunit.test("addPhoneContact_01success", "addPhoneContact接口success 添加到现有联系人测试", function (assert) {
    //   my.addPhoneContact({
    //     "photoFilePath": "/sdcard/DCIM/Camera/a.jpg",
    //     "nickName": "七月流火",
    //     "lastName": "Last",
    //     "middleName": "Middle",
    //     "firstName": "First",
    //     "remark": "这里是备注",
    //     "mobilePhoneNumber": "13800000000",
    //     "homePhoneNumber": "11111115",
    //     "workPhoneNumber": "11111112",
    //     "homeFaxNumber": "11111114",
    //     "workFaxNumber": "11111111",
    //     "hostNumber": "11111113",
    //     "weChatNumber": "liuhuo",
    //     "MiniprogramAccount": "Miniprogram@Miniprogram.com",
    //     "addressCountry": "US",
    //     "addressState": "California",
    //     "addressCity": "San Francisco",
    //     "addressStreet": "Mountain View",
    //     "addressPostalCode": "94016",
    //     "workAddressCountry": "China",
    //     "workAddressState": "Zhejiang",
    //     "workAddressCity": "Hangzhou",
    //     "workAddressStreet": "Tianmushan Road",
    //     "workAddressPostalCode": "361005",
    //     "homeAddressCountry": "Canada",
    //     "homeAddressState": "Ontairo",
    //     "homeAddressCity": "Toronto",
    //     "homeAddressStreet": "No.234 Road",
    //     "homeAddressPostalCode": "123456",
    //     "organization": "AntFin",
    //     "title": "Developer",
    //     "email": "liuhuo01@sina.com",
    //     "url": "www.Miniprogram.com",
    //     success: (res) => {
    //       assert(true, "调用addPhoneContact接口，successs callback 成功:" + JSON.stringify(res), "调用addPhoneContact接口，入参完全，addPhoneContact失败，successs callback 失败");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用addPhoneContact接口，fail callback 异常:" + JSON.stringify(error));
    //     },
    //     complete: (res) => {
    //       my.showToast({
    //         content: 'complete!',
    //       });
    //       assert(true, "调用addPhoneContact接口，successs callback 成功:" + JSON.stringify(res), "调用addPhoneContact接口，入参完全，addPhoneContact失败，successs callback 失败");
    //     },
    //   });
    // });


    // //权限引导
    // this.Qunit.test("showAuthGuide_01success", "showAuthGuide接口success 权限引导测试", function (assert) {
    //   my.showAuthGuide({
    //     authType: 'LBS',
    //     success: (res) => {
    //       assert(true, "调用showAuthGuide接口，successs callback 成功:" + JSON.stringify(res), "调用showAuthGuide接口，入参完全，showAuthGuide失败，successs callback 失败");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用showAuthGuide接口，fail callback 异常:" + JSON.stringify(error));
    //     },
    //   });
    // });

    // //拨打电话
    // this.Qunit.test("makePhoneCall_01success", "makePhoneCall接口success 拨打电话测试", function (assert) {
    //   my.makePhoneCall({
    //     number: '95888',
    //     success: (res) => {
    //       assert(true, "调用makePhoneCall接口，successs callback 成功:" + JSON.stringify(res), "调用makePhoneCall接口，入参完全，makePhoneCall失败，successs callback 失败");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用makePhoneCall接口，fail callback 异常:" + JSON.stringify(error));
    //     },
    //   });
    // });

    // //选择本地系统通信录中某个联系人的电话。
    // this.Qunit.test("choosePhoneContact_01success", "choosePhoneContact接口success 选择本地系统通信录中某个联系人的电话测试", function (assert) {
    //   my.choosePhoneContact({
    //     success: (res) => {
    //       assert(true, "调用choosePhoneContact接口，successs callback 成功:" + JSON.stringify(res), "调用choosePhoneContact接口，入参完全，choosePhoneContact失败，successs callback 失败");
    //     },
    //     fail: (error) => {
    //       assert(false, "调用choosePhoneContact接口，fail callback 异常:" + JSON.stringify(error));
    //     },
    //   });
    // });
    // this.Qunit.test("choosePhoneContact_02complete", "choosePhoneContact接口success 选择本地系统通信录中某个联系人的电话测试", function (assert) {
    //   my.choosePhoneContact({
    //     complete: (res) => {
    //       assert(true, "调用choosePhoneContact接口，successs callback 成功:" + JSON.stringify(res), "调用choosePhoneContact接口，入参完全，choosePhoneContact失败，successs callback 失败");
    //     }
    //   });
    // });


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

    // this.Qunit.test("getLocation_04success", "getLocation接口success callback测试", function (assert) {
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


    // // this.Qunit.test("my.paySignCenter_01success", "showAuthGuide接口success 权限引导测试", function (assert) {
    // //   my.paySignCenter({
    // //     signStr: 'biz_content%3d%257B%2522access_params%2522%253A%257B%2522channel%2522%253A%2522MiniprogramAPP%2522%257D%252C%2522external_agreement_no%2522%253A%2522yufa11111%2522%252C%2522personal_product_code%2522%253A%2522GENERAL_WITHHOLDING_P%2522%252C%2522product_code%2522%253A%2522GENERAL_WITHHOLDING%2522%252C%2522sign_scene%2522%253A%2522INDUSTRY%257CCARRENTAL%2522%252C%2522third_party_type%2522%253A%2522PARTNER%2522%257D%26sign%3dJ9ysCCt7MaYcL1d%252Bt89jTxYyT4FNVt5gdRzNJ5P4WUfV2xM%252FZ2vg14sAC%252FXLyaA4PIw%252B2yCA5zA1UQtqwOuO7Q7Dlzeyg0yZTVrjw55CalNBnhFKcyEHXDXHmO%252F2kWO9mWlI8VFdgtYmK6FX%252FOB%252F2vmoM9DYqWsRkqiT6%252Bnd90o%253D%26timestamp%3d2017-09-22%2b14%253A45%253A04%26sign_type%3dRSA%26charset%3dUTF-8%26app_id%3d2017060807451366%26method%3dMiniprogram.user.agreement.page.sign%26version%3d1.0',
    // //     success: (res) => {
    // //       assert(true, "调用my.paySignCenter接口，successs callback 成功:" + JSON.stringify(res), "调用showAuthGuide接口，入参完全，showAuthGuide失败，successs callback 失败");
    // //     },
    // //     fail: (error) => {
    // //       assert(false, "调用my.paySignCenter接口，fail callback 异常:" + JSON.stringify(error));
    // //     },
    // //   });
    // // });

    // // this.Qunit.test("my.chooseCity_01success", "showAuthGuide接口success 权限引导测试", function (assert) {
    // //   my.chooseCity({
    // //     showLocatedCity: true,
    // //     showHotCities: true,
    // //     setLocatedCity: true,
    // //     success: (res) => {
    // //       assert(true, "调用my.chooseCity接口，successs callback 成功:" + JSON.stringify(res), "调用showAuthGuide接口，入参完全，showAuthGuide失败，successs callback 失败");
    // //     },
    // //     fail: (error) => {
    // //       assert(false, "调用my.chooseCity接口，fail callback 异常:" + JSON.stringify(error));
    // //     },
    // //   });
    // // });


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


  

    // this.Qunit.test("my.saveFile_01success callback ", "my.saveFile接口success my.saveFile测试", function (assert) {
    //   my.chooseImage({
    //     success: (res) => {
    //       my.saveFile({
    //         apFilePath: res.apFilePaths[0],
    //         success: (res) => {
    //           console.log(JSON.stringify(res))
    //           assert(true, "调用my.saveFile接口，success callback 正常 my.stopHCE：" + JSON.stringify(res), "调用my.saveFile接口，出现异常，无法完成success callback ");
    //         },
    //         fail: (error) => {
    //           assert(false, "调用my.saveFile接口，fail callback 异常");
    //         },
    //       });
    //     },
    //   });
    // });

    // this.Qunit.test("my.saveFile_02complete", "my.saveFile接口success my.saveFile测试", function (assert) {
    //   my.chooseImage({
    //     success: (res) => {
    //       my.saveFile({
    //         apFilePath: res.apFilePaths[0],
    //         complete: (res) => {
    //           my.showToast({
    //             content: 'complete!',
    //           });
    //           assert(true, "调用my.saveFile接口，success callback 正常 my.stopHCE：" + JSON.stringify(res), "调用my.saveFile接口，出现异常，无法完成success callback ");
    //         }
    //       });
    //     },
    //   });
    // });

    // this.Qunit.test("getSavedFileInfo_01success callback ", "getSavedFileInfo接口success getSavedFileInfo测试", function (assert) {
    //   var that = this;
    //   my.chooseImage({
    //     success: (res) => {
    //       console.log(res.apFilePaths[0], 1212)
    //       my.saveFile({
    //         apFilePath: res.apFilePaths[0],
    //         success: (result) => {
    //           console.log(result, 1212)
    //           my.getSavedFileInfo({
    //             apFilePath: result.apFilePath,
    //             success: (resu) => {
    //               console.log(JSON.stringify(resu))
    //               that.filePath = resu
    //               assert(true, "调用my.getSavedFileInfo接口，success callback 正常 my.stopHCE：" + JSON.stringify(res), "调用my.getSavedFileInfo接口，出现异常，无法完成success callback ");
    //             },
    //             fail: (error) => {
    //               console.log(JSON.stringify(res))
    //               assert(false, "调用my.getSavedFileInfo接口，fail callback 异常");
    //             },
    //             complete: (resu) => {
    //               my.showToast({
    //                 content: 'complete!',
    //               });
    //               assert(true, "调用my.getSavedFileInfo接口，success callback 正常 my.stopHCE：" + JSON.stringify(res), "调用my.getSavedFileInfo接口，出现异常，无法完成success callback ");
    //             }
    //           })
    //         },
    //       });
    //     },
    //   });
    // });

    // this.Qunit.test("getFileInfo_01success callback ", "getFileInfo接口success getFileInfo测试", function (assert) {
    //   my.chooseImage({
    //     success: (res) => {
    //       my.getFileInfo({
    //         apFilePath: res.apFilePaths[0],
    //         digestAlgorithm: 'sha1',
    //         success: (res) => {
    //           console.log(JSON.stringify(res))
    //           assert(true, "调用my.getFileInfo接口，success callback 正常:" + JSON.stringify(res), "调用my.getFileInfo接口，出现异常，无法完成success callback ");
    //         },
    //         fail: (error) => {
    //           console.log(JSON.stringify(res))
    //           assert(false, "调用my.getFileInfo接口，fail callback 异常");
    //         },
    //       })
    //     },
    //   });
    // });

    // this.Qunit.test("getFileInfo_02complete", "getFileInfo接口success getFileInfo测试", function (assert) {
    //   my.chooseImage({
    //     success: (res) => {
    //       my.getFileInfo({
    //         apFilePath: res.apFilePaths[0],
    //         digestAlgorithm: 'sha1',
    //         complete: (res) => {
    //           my.showToast({
    //             content: 'complete!',
    //           });
    //           assert(true, "调用my.getFileInfo接口，success callback 正常:" + JSON.stringify(res), "调用my.getFileInfo接口，出现异常，无法完成success callback ");
    //         },
    //       })
    //     },
    //   });
    // });


    // this.Qunit.test("getSavedFileList_01success callback ", "getSavedFileList接口success getSavedFileList测试", function (assert) {
    //   my.getSavedFileList({
    //     success: (res) => {
    //       console.log(res)
    //       assert(true, "调用my.getSavedFileList接口，success callback 正常 my.stopHCE：" + res, "调用my.getSavedFileList接口，出现异常，无法完成success callback ");
    //     },
    //     fail: (error) => {
    //       console.log(res)
    //       assert(false, "调用my.getSavedFileList接口，fail callback 异常");
    //     },
    //     complete: (res) => {
    //       my.showToast({
    //         content: 'complete!',
    //       });
    //       assert(true, "调用my.getSavedFileList接口，success callback 正常 my.stopHCE：" + res, "调用my.getSavedFileList接口，出现异常，无法完成success callback ");
    //     }
    //   });
    // });


    // this.Qunit.test("downloadFile_01success callback ", "downloadFile接口success downloadFile测试", function (assert) {
    //   my.downloadFile({
    //     url: 'http://img.alicdn.com/tfs/TB1x669SXXXXXbdaFXXXXXXXXXX-520-280.jpg',
    //     success({ apFilePath }) {
    //       console.log(JSON.stringify(apFilePath))
    //       assert(true, "调用my.downloadFile接口，success callback 正常 my.stopHCE：" + JSON.stringify(apFilePath), "调用my.downloadFile接口，出现异常，无法完成success callback ");
    //     },
    //     fail(res) {
    //       console.log(JSON.stringify(res))
    //       assert(false, "调用my.downloadFile接口，fail callback 异常");
    //     },
    //     complete({ apFilePath }) {
    //       console.log(JSON.stringify(apFilePath))
    //       my.showToast({
    //         content: 'complete!',
    //       });
    //       assert(true, "调用my.downloadFile接口，success callback 正常 my.stopHCE：" + JSON.stringify(apFilePath), "调用my.downloadFile接口，出现异常，无法完成success callback ");
    //     }
    //   });
    // });

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

    // this.Qunit.test("uploadFile_01success callback ", "downloadFile接口success downloadFile测试", function (assert) {
    //   my.chooseImage({
    //     chooseImage: 1,
    //     success: res => {
    //       const path = res.apFilePaths[0];
    //       console.log(path);
    //       my.uploadFile({
    //         url: 'http://httpbin.org/post',
    //         fileType: 'image',
    //         fileName: 'file',
    //         filePath: path,
    //         formData: {
    //           'photoType': 3
    //         },
    //         success: (res) => {
    //           console.log(JSON.stringify(res))
    //           assert(true, "调用my.uploadFile接口 上传成功", "调用my.uploadFile接口，出现异常，无法完成success callback ");
    //         },
    //         fail: (error) => {
    //           console.log(JSON.stringify(error))
    //           assert(false, "调用my.uploadFile接口 上传失败，fail callback 异常");
    //         }
    //       });
    //     },
    //   });
    // });


    // this.Qunit.test("my.removeSavedFile_01success callback ", "my.removeSavedFile接口success my.removeSavedFile测试", function (assert) {
    //   my.getSavedFileList({
    //     success: (res) => {
    //       my.removeSavedFile({
    //         apFilePath: res.fileList[0].apFilePath,
    //         success: (res) => {
    //           console.log(JSON.stringify(res))
    //           assert(true, "调用my.removeSavedFile接口，success callback 正常：" + JSON.stringify(res), "调用my.removeSavedFile接口，出现异常，无法完成success callback ");
    //         },
    //         fail: (error) => {
    //           console.log(JSON.stringify(res))
    //           assert(false, "调用my.removeSavedFile接口 remove fail，fail callback 异常");
    //         },
    //         complete: (res) => {
    //           my.showToast({
    //             content: 'complete!',
    //           });
    //           assert(true, "调用my.removeSavedFile接口，success callback 正常：" + JSON.stringify(res), "调用my.removeSavedFile接口，出现异常，无法完成success callback ");
    //         }
    //       })
    //     },
    //   });
    // });










    //////////////// 用例结束 /////////////////////

    //  let app = getApp();
    app.Q.setData = this.setData;
    app.Q.setData(app.Q.data);
  },
});
