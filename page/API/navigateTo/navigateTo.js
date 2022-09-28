import { test, runAll, run } from '/util/qunit/qunit';
Page({
  Qunit: {
    idx: -1,
    test: function (name, desc, callback) {
      test(name, desc, callback)
    },
    runAll: function () {
      runAll();
    },
  },

  onItemTap(event) {
    let app = getApp();
    let idx = event.currentTarget.id;
    
    if(app.Q.data.tests[idx].status == "show"){
      app.Q.data.tests[idx].status = "hide";
    }else{
      app.Q.data.tests[idx].status = "show";
    };

    this.setData(app.Q.data);
  },
  onRunTap(event) {
    let idx = event.currentTarget.id;
    run(idx);
  },
  handleTap(event) {
    my.showToast({
      type: 'success',
      content: 'Performing one-click automation! Please wait！',
      duration: 5000
    });
    this.Qunit.runAll();
  },
  onLoad() {
    let app = getApp();
    app.Q.resetDate();

    // navigateTo_many() {
    //   for (var i = 0; i < 10; i++) {
    //     my.navigateTo({
    //       url: '../getSystemInfo/getSystemInfo',
    //       success: () => {
    //         my.showToast({ content: '跳转成功', });
    //       },
    //       fail: (error) => {
    //         abridge.alert({ content: i+'调用失败' + JSON.stringify(error), });
    //       },
    //     });
    //   }
    // },

   this.Qunit.test("navigateTo跳转_url为数字", "navigateTo接口_url为数字 callback测试", function (assert) {
      assert(false, "调用navigateTo接口,参数为数字，没有回调fail", "调用navigateTo接口_url为数字，没有回调fail");
      my.navigateToMiniProgram({
    appId: 'xxxx',
    extraData:{
    "data1":"test"
    },
    success: (res) => {
    console.log(JSON.stringify(res))
    },
    fail: (res) => {
    console.log(JSON.stringify(res))
    }
});
    });

    this.Qunit.test("navigateTo跳转_url为空", "navigateTo跳转_url为空 callback测试", function (assert) {
      assert(false, "调用navigateTo接口,参数为空", "调用navigateTo接口_url为空,没有触发fail回调");
      my.navigateTo({
        url: null,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "参数不合法，回调fail", "参数不合法，回调fail");
        },
      });
    });

    this.Qunit.test("navigateTo跳转_url为数字", "navigateTo接口_url为数字 callback测试", function (assert) {
      assert(false, "调用navigateTo接口,参数为数字，没有回调fail", "调用navigateTo接口_url为数字，没有回调fail");
      my.navigateTo({
        url: 0,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用navigateTo接口，参数为数字，回调fail", "调用navigateTo接口,参数为数字，回调fail");
        },
      });
    });

    this.Qunit.test("navigateTo跳转_url为数组", "navigateTo跳转_url为数组 callback测试", function (assert) {
      assert(false, "调用navigateTo接口，没有调用fail", "调用navigateTo接口_url为数组，没有回调fail");
      my.navigateTo({
        url: [0, 1, 2],
        fail: (res) => {
          assert(true, "navigateTo执行fail回调", "调用navigateTo接口,没有回调fail");
        },
      });
    });

    this.Qunit.test("navigateTo跳转_url为符号", "navigateTo跳转_url为符号 callback测试", function (assert) {
      assert(false, "调用navigateTo接口_url为符号，没有调用fail", "调用navigateTo接口_url为符号，没有回调fail");
      my.navigateTo({
        url: '&%#',
        fail: (res) => {
          assert(true, "调用navigateTo接口，正常回调fail", "调用navigateTo接口，正常回调fail");
        },
      });
    });

    this.Qunit.test("navigateTo跳转_url为布尔值", "navigateTo跳转_url为布尔值 callback测试", function (assert) {
      assert(false, "调用navigateTo接口_url为布尔值，没有回调fail", "调用navigateTo接口_url为符号，没有回调fail");
      my.navigateTo({
        url: true,
        fail: (res) => {
          assert(true, "调用navigateTo接口，正常回调fail", "调用navigateTo接口，正常回调fail");
        },
      });
    });
    this.Qunit.test("navigateTo跳转", "navigateTo跳转-success callback测试", function (assert) {
      my.navigateTo({
        url: '../getSystemInfo/getSystemInfo',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用navigateTo接口，跳转成功,success回调成功");
        },
      });
    });

    this.Qunit.test("navigateTo跳转-complete回调", "navigateTo跳转-complete callback测试", function (assert) {
      my.navigateTo({
        url: '../getSystemInfo/getSystemInfo',
        complete: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "complete回调成功" + JSON.stringify(res), "complete回调失败");
        },
      });
    });

    //////////////// 用例结束 /////////////////////
    app.Q.setData = this.setData;
    app.Q.setData(app.Q.data);
  },
});