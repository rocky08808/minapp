import { test, runAll, run } from '/util/qunit/qunit';
Page({
  data: {},
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
    //参数校验
    this.Qunit.test("获取系统信息_complete", "getSystemInfo接口complete callback测试", function (assert) {
      my.getSystemInfo({
        complete: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getSystemInfo接口成功，获取complete回调" + JSON.stringify(res));
        },
      })
    });

    this.Qunit.test("获取系统信息", "getSystemInfo接口success callback测试", function (assert) {
      my.getSystemInfo({
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getSystemInfo接口成功，获取系统信息" + JSON.stringify(res), "调用setStorage接口失败，无法获取系统信息");
        },
      });
      assert(false,"调用getSystemInfo接口成功，获取系统信息", "调用setStorage接口失败，无法获取系统信息");
    });


    this.Qunit.test("获取系统信息_many", "getSystemInfo接口success callback测试", function (assert) {
      for (var i = 0; i < 30; i++) {     
      my.getSystemInfo({
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "循环调用getSystemInfo接口成功，获取系统信息" + JSON.stringify(res), "循环调用setStorage接口失败，无法获取系统信息");
        },
      })
      };
      assert(false,"循环调用getSystemInfo接口成功，获取系统信息", "循环调用setStorage接口失败，无法获取系统信息");
    });


    //////////////// 用例结束 /////////////////////
    app.Q.setData = this.setData;
    app.Q.setData(app.Q.data);
  },
});




// Page({
//   data: {},
//   onLoad() { },
//   getSystemInfo() {
//     my.getSystemInfo({
//       success: (res) => {
//         my.alert({ content: '系统信息：' + JSON.stringify(res), });
//       },
//       fail: (error) => {
//         my.alert({ content: '获取失败' + JSON.stringify(error), });
//       },
//       complete: () => {
//         my.alert({ title: 'complete回调', });
//       },
//     })
//   },

//   getSystemInfo_many() {
//     for (var i = 0; i < 30; i++) {
//       my.getSystemInfo({
//         success: (res) => {
//           my.showToast({ content: i+'系统信息：' + JSON.stringify(res), });
//         },
//         fail: (error) => {
//           my.alert({ content: '获取失败' + JSON.stringify(error), });
//         },
//       });
//     }
//   },
// });
