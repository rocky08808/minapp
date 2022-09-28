// import { test, runAll, run, onItemTap } from '/util/qunit/qunit';
// Page({
//   data: {},
//   Qunit: {
//     idx: -1,
//     test: function (name, desc, callback) {
//       test(name, desc, callback)
//     },
//     runAll: function () {
//       runAll();
//     },
//   },

//   onItemTap(event) {
//     onItemTap(event);
//   },
//   onRunTap(event) {
//     let idx = event.currentTarget.id;
//     run(idx);
//   },
//   handleTap(event) {
//     my.showToast({
//       type: 'success',
//       content: 'Performing one-click automation! Please wait！',
//       duration: 10000
//     });
//     this.Qunit.runAll();
//   },
//   onLoad() {

//     let app = getApp();
//     app.Q.resetDate();
//     //参数校验
//     this.Qunit.test("保存数据", "setStorage接口success callback测试", function (assert) {
//       my.setStorage({
//         key: '1',
//         data: 'Miniprogram',
//         success: (res) => {
//           console.log(JSON.stringify(res))
//           assert(true, "调用setStorage接口成功,保存数据成功" + JSON.stringify(res), "调用setStorage接口失败，无法保存数据");
//         },
//       });
//       assert(false,"调用setStorage接口成功,保存数据成功", "调用setStorage接口失败，无法保存数据");
//     });


//     this.Qunit.test("同步获取数据", "getStorageSync接口complete callback测试", function (assert) {
//       my.getStorageSync({
//         key: '1',
//         complete: (res) => {
//           console.log(JSON.stringify(res))
//           assert(true, "调用getStorageSync接口成功,成功获取同步数据" + JSON.stringify(res), "调用getStorageSync接口失败，获取同步数据失败");
//         },
//       });
//       assert(false,"调用getStorageSync接口成功,成功获取同步数据", "调用getStorageSync接口失败，获取同步数据失败");
//     });

//     this.Qunit.test("同步获取数据_many", "getStorageSync接口success callback测试", function (assert) {
//       for (var i = 0; i < 30; i++) {
//       my.getStorageSync({
//         key: '1',
//         success: (res) => {
//           console.log(JSON.stringify(res))
//           assert(true, "循环调用getStorageSync接口成功,成功获取同步数据" + JSON.stringify(res), "循环调用getStorageSync接口失败，获取同步数据失败");
//         },
//       })
//       };
//       assert(false,"循环调用getStorageSync接口成功,成功获取同步数据", "循环调用getStorageSync接口失败，获取同步数据失败");
//     });


//     this.Qunit.test("同步获取数据_parameter_null", "getStorageSync接口success callback测试", function (assert) {
//       my.getStorageSync({
//         key: null,
//         success: (res) => {
//           console.log(JSON.stringify(res))
//           assert(true, "调用getStorageSync接口成功,成功获取同步数据" + JSON.stringify(res), "调用getStorageSync接口失败，获取同步数据失败");
//         },
//       });
//       assert(false,"调用getStorageSync接口成功,成功获取同步数据", "调用getStorageSync接口失败，获取同步数据失败");
//     });


//     this.Qunit.test("同步获取数据_parameter_number", "getStorageSync接口success callback测试", function (assert) {
//       my.getStorageSync({
//         key:3,
//         success: (res) => {
//           console.log(JSON.stringify(res))
//           assert(true, "调用getStorageSync接口成功,成功获取同步数据" + JSON.stringify(res), "调用getStorageSync接口失败，获取同步数据失败");
//         },
//       });
//       assert(false,"调用getStorageSync接口成功,成功获取同步数据", "调用getStorageSync接口失败，获取同步数据失败");
//     });

//     this.Qunit.test("同步获取数据_parameter_array", "getStorageSync接口success callback测试", function (assert) {
//       my.getStorageSync({
//         key: [0,1,2],
//         success: (res) => {
//           console.log(JSON.stringify(res))
//           assert(true, "调用getStorageSync接口成功,成功获取同步数据" + JSON.stringify(res), "调用getStorageSync接口失败，获取同步数据失败");
//         },
//       });
//       assert(false,"调用getStorageSync接口成功,成功获取同步数据", "调用getStorageSync接口失败，获取同步数据失败");
//     });


//     this.Qunit.test("同步获取数据_parameter_symbol", "getStorageSync接口success callback测试", function (assert) {
//       my.getStorageSync({
//         key: '%$#',
//         success: (res) => {
//           console.log(JSON.stringify(res))
//           assert(true, "调用getStorageSync接口成功,成功获取同步数据" + JSON.stringify(res), "调用getStorageSync接口失败，获取同步数据失败");
//         },
//       });
//       assert(false,"调用getStorageSync接口成功,成功获取同步数据", "调用getStorageSync接口失败，获取同步数据失败");
//     });

//     this.Qunit.test("同步获取数据_parameter_bool", "getStorageSync接口success callback测试", function (assert) {
//       my.getStorageSync({
//         key: true,
//         success: (res) => {
//           console.log(JSON.stringify(res))
//           assert(true, "调用getStorageSync接口成功,成功获取同步数据" + JSON.stringify(res), "调用getStorageSync接口失败，获取同步数据失败");
//         },
//       });
//       assert(false,"调用getStorageSync接口成功,成功获取同步数据", "调用getStorageSync接口失败，获取同步数据失败");
//     });

//     //////////////// 用例结束 /////////////////////
//     app.Q.setData = this.setData;
//     app.Q.setData(app.Q.data);
//   },
// });




Page({
  data: {},

  setStorage() {
    my.setStorage({
      key: '1',
      data: 'Miniprogram',
      success() {
        my.alert({ content: 'Data stored successfully!', });
      },
      fail: (error) => {
        my.alert({ content: 'Saving data failed' + JSON.stringify(error), });
      },
    });
  },
  getStorageSync() {
    my.alert({ content: 'Synchronize data acquisition' + JSON.stringify(my.getStorageSync({ key: '1' })), });
  },
getStorageSync_many(){
 for (var i = 0; i < 30; i++) {
   my.showToast({ content: i+'Synchronize data acquisition' + JSON.stringify(my.getStorageSync({ key: '1' })), });
 }
},
getStorageSync_null(){
 my.alert({ content: 'Synchronize data acquisition' + JSON.stringify(my.getStorageSync({ key: null })), });
},
getStorageSync_number(){
 my.alert({ content: 'Synchronize data acquisition' +JSON.stringify(my.getStorageSync({ key: 0 })), });
},

getStorageSync_array(){
 my.alert({ content: 'getStorageSync' +JSON.stringify(my.getStorageSync({ key: [0,1,2] })), });
},
getStorageSync_symbol(){
 my.alert({ content: 'Synchronize data acquisition' +JSON.stringify( my.getStorageSync({ key:'%$#'})), });
},
getStorageSync_bool(){
 my.alert({ content: 'Synchronous data acquisition' + JSON.stringify(my.getStorageSync({ key: true})), });
},
});
