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
    this.Qunit.test("保存数据", "setStorage接口success callback测试", function (assert) {
      my.setStorage({
        key: '1',
        data: 'Miniprogram',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用setStorage接口成功,保存数据成功" + JSON.stringify(res), "调用setStorage接口失败，无法保存数据");
        },
      });
      assert(false,"调用setStorage接口成功,保存数据成功", "调用setStorage接口失败，无法保存数据");
    });


    this.Qunit.test("获取缓存数据", "getStorage接口success callback测试", function (assert) {
      my.getStorage({
        key: '1',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getStorage接口成功,成功获取缓存数据" + JSON.stringify(res), "调用getStorage接口失败，获取缓存数据失败");
        },
      });
      assert(false,"调用getStorage接口成功,成功获取缓存数据", "调用getStorage接口失败，获取缓存数据失败");
    });


    this.Qunit.test("获取缓存数据_complete", "getStorage接口complete callback测试", function (assert) {
      my.getStorage({
        key: '1',
        complete: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getStorage接口成功,获取complete回调" + JSON.stringify(res), "调用getStorage接口失败，无法获取complete回调");
        },
      });
      assert(false,"调用getStorage接口成功,获取complete回调", "调用getStorage接口失败，无法获取complete回调");
    });


    this.Qunit.test("获取缓存数据_many", "getStorage接口success callback测试", function (assert) {
      for (var i = 0; i < 30; i++) {
      my.getStorage({
        key: '1',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "循环调用getStorage接口成功,成功获取缓存数据" + JSON.stringify(res), "循环调用getStorage接口失败，获取缓存数据失败");
        },
      })
      };
      assert(false,"循环调用getStorage接口成功,成功获取缓存数据", "循环调用getStorage接口失败，获取缓存数据失败");
    });


    this.Qunit.test("获取缓存数据_parameter_null", "getStorage接口fail callback测试", function (assert) {
      my.getStorage({
        key:null,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getStorage接口成功,成功获取缓存数据" + JSON.stringify(res), "调用getStorage接口失败，获取缓存数据失败");
        },
      });
      assert(false,"调用getStorage接口成功,成功获取缓存数据", "调用getStorage接口失败，获取缓存数据失败");
    });

    this.Qunit.test("获取缓存数据_parameter_number", "getStorage接口fail callback测试", function (assert) {
      my.getStorage({
        key:2,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getStorage接口成功,成功获取缓存数据" + JSON.stringify(res), "调用getStorage接口失败，获取缓存数据失败");
        },
      });
      assert(false,"调用getStorage接口成功,成功获取缓存数据", "调用getStorage接口失败，获取缓存数据失败");
    });


    this.Qunit.test("获取缓存数据_parameter_array", "getStorage接口fail callback测试", function (assert) {
      my.getStorage({
        key: ['0', '1', '2'],
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getStorage接口成功,成功获取缓存数据" + JSON.stringify(res), "调用getStorage接口失败，获取缓存数据失败");
        },
      });
      assert(false,"调用getStorage接口成功,成功获取缓存数据", "调用getStorage接口失败，获取缓存数据失败");
    });

    this.Qunit.test("获取缓存数据_parameter_symbol", "getStorage接口fail callback测试", function (assert) {
      my.getStorage({
        key: '#',
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用getStorage接口成功,成功获取缓存数据" + JSON.stringify(res), "调用getStorage接口失败，获取缓存数据失败");
        },
      });
      assert(false,"调用getStorage接口成功,成功获取缓存数据", "调用getStorage接口失败，获取缓存数据失败");
    });

    //////////////// 用例结束 /////////////////////
    app.Q.setData = this.setData;
    app.Q.setData(app.Q.data);
  },
});



// Page({
  // data: {},
  // setStorage() {
  //   my.setStorage({
  //     key: '1',
  //     data: 'Miniprogram',
  //     success() {
  //       my.alert({ content: 'Data stored successfully!', });
  //     },
  //     fail: (error) => {
  //       my.alert({ content: 'Saving data failed' + JSON.stringify(error), });
  //     },
  //   });
  // },
  // getStorage() {
  //   my.getStorage({
  //     key: '1',
  //     success(res) {
  //       my.alert({ content: '读取数据成功: ' + JSON.stringify(res.data) });
  //     },
  //     fail: (error) => {
  //       my.alert({ content: '读取失败' + JSON.stringify(error), });
  //     },
  //   });
  // },
  // getStorage_many() {
  //   for (var i = 0; i < 30; i++) {
  //     my.getStorage({
  //       key: '1',
  //       success(res) {
  //         my.showToast({ content: i+'读取数据成功: ' + JSON.stringify(res.data) });
  //       },
  //       fail: (error) => {
  //         my.alert({ content: '读取失败' + JSON.stringify(error), });
  //       },
  //     });
  //   }
  // },
  // getStorage_null() {
  //   my.getStorage({
  //     key: null,
  //     success(res) {
  //       my.alert({ content: '读取数据成功: ' + JSON.stringify(res.data) });
  //     },
  //     fail: (error) => {
  //       my.alert({ content: '读取失败' + JSON.stringify(error), });
  //     },
  //   });
  // },
  // getStorage_number() {
  //   my.getStorage({
  //     key: 0,
  //     success(res) {
  //       my.alert({ content: '读取数据成功: ' + JSON.stringify(res.data) });
  //     },
  //     fail: (error) => {
  //       my.alert({ content: '读取失败' + JSON.stringify(error), });
  //     },
  //   });
  // },
  // getStorage_array() {
  //   my.getStorage({
  //     key: ['0', '1', '2'],
  //     success(res) {
  //       my.alert({ content: '读取数据成功: ' + JSON.stringify(res.data) });
  //     },
  //     fail: (error) => {
  //       my.alert({ content: '读取失败' + JSON.stringify(error), });
  //     },
  //   });
  // },
//   getStorage_symbol() {
//     my.getStorage({
//       key: '*',
//       success(res) {
//         my.alert({ content: '读取数据成功: ' + JSON.stringify(res.data) });
//       },
//       fail: (error) => {
//         my.alert({ content: '读取失败' + JSON.stringify(error), });
//       },
//     });
//   },
// });
