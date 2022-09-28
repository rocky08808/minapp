import { test, runAll, run, onItemTap } from '/util/qunit/qunit';
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
    this.Qunit.test("获取位置信息", "getLocation接口success callback测试", function (assert) {
      my.getLocation({
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getLocation接口成功,成功获取定位信息" + JSON.stringify(res), "调用getLocation接口失败，无法获取位置");
        },
      });
      assert(false,"调用getLocation接口成功,成功获取定位信息", "调用getLocation接口失败，无法获取位置");
    });

    this.Qunit.test("获取位置信息_complete", "getLocation接口complete callback测试", function (assert) {
      my.getLocation({
        complete: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getLocation接口成功,获取complete回调" + JSON.stringify(res), "调用getLocation接口失败，无法获取complete回调");
        },
      });
      assert(false,"调用getLocation接口成功,获取complete回调", "调用getLocation接口失败，无法获取complete回调");
    });

    this.Qunit.test("获取位置信息_parameter_null", "getLocation接口fail callback测试", function (assert) {
      my.getLocation({
        type: null,
        cacheTimeout: null,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getLocation接口成功,成功获取定位信息" + JSON.stringify(res), "调用getLocation接口失败，无法获取位置");
        },
      });
      assert(false,"调用getLocation接口成功,成功获取定位信息", "调用getLocation接口失败，无法获取位置");
    });


    this.Qunit.test("获取位置信息_many", "getLocation接口success callback测试", function (assert) {
      for (var i = 0; i < 30; i++) {
      my.getLocation({
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "循环调用getLocation接口成功,成功获取定位信息" + JSON.stringify(res), "循环调用getLocation接口失败，无法获取位置");
        },
      })
      };
      assert(false,"循环调用getLocation接口成功,成功获取定位信息", "循环调用getLocation接口失败，无法获取位置");
    });


    this.Qunit.test("获取位置信息_parameter_number", "getLocation接口fail callback测试", function (assert) {
      my.getLocation({
        type: 5,
        cacheTimeout: 4,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getLocation接口成功,成功获取定位信息" + JSON.stringify(res), "调用getLocation接口失败，无法获取位置");
        },
      });
      assert(false,"调用getLocation接口成功,成功获取定位信息", "调用getLocation接口失败，无法获取位置");
    });



    this.Qunit.test("获取位置信息_parameter_array", "getLocation接口fail callback测试", function (assert) {
      my.getLocation({
        type: ['0', '1', '2'],
        cacheTimeout: ['0', '1', '2'],
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getLocation接口成功,成功获取定位信息" + JSON.stringify(res), "调用getLocation接口失败，无法获取位置");
        },
      });
      assert(false,"调用getLocation接口成功,成功获取定位信息", "调用getLocation接口失败，无法获取位置");
    });


    this.Qunit.test("获取位置信息_parameter_symbol", "getLocation接口fail callback测试", function (assert) {
      my.getLocation({
        type: '*',
        cacheTimeout: '&*@',
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getLocation接口成功,成功获取定位信息" + JSON.stringify(res), "调用getLocation接口失败，无法获取位置");
        },
      });
      assert(false,"调用getLocation接口成功,成功获取定位信息", "调用getLocation接口失败，无法获取位置");
    }); 

    //////////////// 用例结束 /////////////////////
    app.Q.setData = this.setData;
    app.Q.setData(app.Q.data);
  },
});



// Page({
//   data: {},
//   getLocation() {
//     my.getLocation({
//       success(res) {
//         my.alert({ content: '获取位置信息成功：' + JSON.stringify(res) });
//       },
//       fail() {
//         my.alert({ title: 'Positioning failure' });
//       },
//     })
//   },
//   getLocation_null() {
//     my.getLocation({
//       type: null,
//       cacheTimeout: null,
//       success(res) {
//         my.alert({ content: '获取位置信息成功：' + JSON.stringify(res) });
//       },
//       fail() {
//         my.alert({ title: 'Positioning failure' });
//       },
//     })
//   },
//   getLocation_many() {
//     for (var i = 0; i < 30; i++) {
//       my.getLocation({
//         success(res) {
//           my.showToast({ content: i+'获取位置信息成功：' + JSON.stringify(res) });
//         },
//         fail() {
//           my.alert({ title: 'Positioning failure' });
//         },
//       });
//     }
//   },
//   getLocation_number() {
//     my.getLocation({
//       type: 0,
//       cacheTimeout: 0,
//       success(res) {
//         my.alert({ content: '获取位置信息成功：' + JSON.stringify(res) });
//       },
//       fail() {
//         my.alert({ title: 'Positioning failure' });
//       },
//     })
//   },
//   getLocation_array() {
//     my.getLocation({
//       type: ['0', '1', '2'],
//       cacheTimeout: ['0', '1', '2'],
//       success(res) {
//         my.alert({ content: '获取位置信息成功：' + JSON.stringify(res) });
//       },
//       fail() {
//         my.alert({ title: 'Positioning failure' });
//       },
//     })
//   },
//   getLocation_symbol() {
//     my.getLocation({
//       type: '*',
//       cacheTimeout: '&*@',
//       success(res) {
//         my.alert({ content: '获取位置信息成功：' + JSON.stringify(res) });
//       },
//       fail() {
//         my.alert({ title: 'Positioning failure' });
//       },
//     })
//   },
// });
