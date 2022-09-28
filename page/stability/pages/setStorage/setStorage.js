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
    my.setStorage({
      type: 'success',
      content: 'Performing one-click automation! Please wait！',
      duration: 5000
    });
    this.Qunit.runAll();
  },
  onLoad() {
    let app = getApp();
    app.Q.resetDate();

    //  setStorage_many() {
    //   for (var i = 10; i < 40; i++) {
    //     my.setStorage({
    //       key: i,
    //       data: '天天开心',
    //       success: (res) => {
    //         my.setStorage({ content: i + '保存数据成功：' + JSON.stringify(res), });
    //       },
    //       fail: (error) => {
    //         my.alert({ content: '保存失败' + JSON.stringify(error), });
    //       },
    //     });
    //   }
    // },

    this.Qunit.test("setStorage存储_参数为数组", "setStorage存储_参数为数组 callback测试", function (assert) {
      assert(false, "调用setStorage接口，没有调用fail", "调用setStorage接口_参数为数组，没有回调fail");
      my.setStorage({
        key: [0, 1, 2],
        data: [0, 1, 2],
        fail: (res) => {
          assert(true, "setStorage执行fail回调", "调用setStorage接口,没有回调fail");
        },
      });
    });

    this.Qunit.test("setStorage存储_参数为数字", "setStorage接口_参数为数字 callback测试", function (assert) {
      assert(false, "调用setStorage接口,参数为数字，没有回调fail", "调用setStorage接口_参数为数字，没有回调fail");
      my.setStorage({
        key: 0,
        data: 0,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用setStorage接口，参数为数字，回调fail", "调用setStorage接口,参数为数字，回调fail");
        },
      });
    });

    this.Qunit.test("setStorage存储_参数为空", "setStorage存储_参数为空 callback测试", function (assert) {
      assert(false, "调用setStorage接口,参数为空", "调用setStorage接口_参数为空,没有触发fail回调");
      my.setStorage({
        key: null,
        data: null,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "参数不合法，回调fail", "参数不合法，回调fail");
        },
      });
    });

    this.Qunit.test("setStorage存储_参数为符号", "setStorage存储_参数为符号 callback测试", function (assert) {
      assert(false, "调用setStorage接口_参数为符号，没有调用fail", "调用setStorage接口_参数为符号，没有回调fail");
      my.setStorage({
        key: _$,
        data: $(),
        duration: _,
        fail: (res) => {
          assert(true, "调用setStorage接口，正常回调fail", "调用setStorage接口，正常回调fail");
        },
      });
    });

    this.Qunit.test("setStorage存储_参数为布尔值", "setStorage存储_参数为布尔值 callback测试", function (assert) {
      assert(false, "调用setStorage接口_参数为布尔值，没有回调fail", "调用setStorage接口_参数为符号，没有回调fail");
      my.setStorage({
        key: true,
        data: true,
        fail: (res) => {
          assert(true, "调用setStorage接口，正常回调fail", "调用setStorage接口，正常回调fail");
        },
      });
    });
    this.Qunit.test("getStorage-验证存储数据", "setStorage存储-数据验证 callback测试", function (assert) {
      my.getStorage({
        key: '10',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(res.data == 'Miniprogram', "验证存入数据与获取数据一致" + JSON.stringify(res), "失败：验证存储的数据，与获取的不一致");
        },
      });
    });

    this.Qunit.test("setStorage存储数据", "setStorage存储-success callback测试", function (assert) {
      my.setStorage({
        key: '10',
        data: 'Miniprogram',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用setStorage接口，存储成功:"+JSON.stringify(res));
        },
      });
    });

    this.Qunit.test("setStorage存储-complete回调", "setStorage存储-complete callback测试", function (assert) {
      my.setStorage({
        key: '11',
        data: 'Miniprogram',
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
