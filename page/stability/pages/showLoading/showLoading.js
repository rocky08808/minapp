import { test, runAll, run} from '/util/qunit/qunit';
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

    // showLoading_many() {
    //   for (var i = 0; i < 10; i++) {
    //     my.showLoading({
    //       content: 'Loading hint...',
    //       success: (res) => {
    //         my.showToast({ content: '调用成功', });
    //         setTimeout(() => {
    //           my.hideLoading();
    //         }, 4000);
    //       },
    //       fail: (error) => {
    //         my.alert({ content: '调用失败' + JSON.stringify(error), });
    //       },
    //     });
    //   }
    // },
    this.Qunit.test("showLoading加载提示_参数为空", "showLoading加载提示_参数为空 callback测试", function (assert) {
      assert(false, "调用showLoading接口,参数为空", "调用showLoading接口_参数为空,没有触发fail回调");
      my.showLoading({
        content: null,
        delay: null,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "参数不合法，回调fail", "参数不合法，回调fail");
        },
      });
      setTimeout(() => { my.hideLoading(); }, 4000);
    });

    this.Qunit.test("showLoading加载提示_参数为数字", "showLoading接口_参数为数字 callback测试", function (assert) {
      assert(false, "调用showLoading接口,参数为数字，没有回调fail", "调用showLoading接口_参数为数字，没有回调fail");
      my.showLoading({
        content: 0,
        delay: 0,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用showLoading接口，参数为数字，回调fail", "调用showLoading接口,参数为数字，回调fail");
        },
      });
      setTimeout(() => { my.hideLoading(); }, 4000);
    });

    this.Qunit.test("showLoading加载提示_参数为数组", "showLoading加载提示_参数为数组 callback测试", function (assert) {
      assert(false, "调用showLoading接口，没有调用fail", "调用showLoading接口_参数为数组，没有回调fail");
      my.showLoading({
        content: [0, 1, 2],
        delay: [0, 1, 2],
        fail: (res) => {
          assert(true, "showLoading执行fail回调", "调用showLoading接口,没有回调fail");
        },
      });
      setTimeout(() => { my.hideLoading(); }, 4000);
    });

    this.Qunit.test("showLoading加载提示_参数为符号", "showLoading加载提示_参数为符号 callback测试", function (assert) {
      assert(false, "调用showLoading接口_参数为符号，没有调用fail", "调用showLoading接口_参数为符号，没有回调fail");
      my.showLoading({
        content: '*&_',
        delay: '&%#',
        success: (res) => {
          assert(true, "调用showLoading接口，正常回调fail", "调用showLoading接口，正常回调fail");
        },
      });
      setTimeout(() => { my.hideLoading(); }, 4000);
    });

    this.Qunit.test("showLoading加载提示_参数为布尔值", "showLoading加载提示_参数为布尔值 callback测试", function (assert) {
      assert(false, "调用showLoading接口_参数为布尔值，没有回调fail", "调用showLoading接口_参数为符号，没有回调fail");
      my.showLoading({
        content: false,
        delay: true,
        fail: (res) => {
          assert(true, "调用showLoading接口，正常回调fail", "调用showLoading接口，正常回调fail");
        },
      });
      setTimeout(() => { my.hideLoading(); }, 4000);
    });
    this.Qunit.test("showLoading加载提示", "showLoading加载提示-success callback测试", function (assert) {
      my.showLoading({
        content: 'Loading hint...',
        delay: 100,
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用showLoading接口，操作成功"+JSON.stringify(res));
          setTimeout(() => { my.hideLoading(); }, 4000);
        },
      });
    });

    this.Qunit.test("showLoading加载提示-complete回调", "showLoading加载提示-complete callback测试", function (assert) {
      my.showLoading({
        content: 'Loading hint...',
        delay: 100,
        complete: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "complete回调成功" + JSON.stringify(res), "complete回调失败");
          setTimeout(() => { my.hideLoading(); }, 4000);
        },
      });
    });

    //////////////// 用例结束 /////////////////////
    app.Q.setData = this.setData;
    app.Q.setData(app.Q.data);
  },
});