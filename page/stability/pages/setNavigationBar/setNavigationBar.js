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
    this.Qunit.test("设置导航栏_parameter_Chinese", "setNavigationBar接口fail callback测试", function (assert) {
      my.setNavigationBar({
        title:hello,
        backgroundColor:hello,
        borderBottomColor:hello,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用setNavigationBar接口成功,改变导航栏" + JSON.stringify(res), "调用setNavigationBar接口失败，无法改变导航栏");
        },
      });
      assert(false, "调用setNavigationBar接口成功,改变导航栏", "调用setNavigationBar接口失败，无法改变导航栏");
    });


    this.Qunit.test("重置导航栏", "resetNavigationBar接口success callback测试", function (assert) {
      my.resetNavigationBar({
        title:"",
        backgroundColor:"#FFFFFF",
        reset: true,
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用resetNavigationBar接口成功,重置导航栏" + JSON.stringify(res), "调用resetNavigationBar接口失败，无法重置导航栏");
        },
      });
      assert(false, "调用resetNavigationBar接口成功,重置导航栏", "调用resetNavigationBar接口失败，无法重置导航栏");
    });
    
    this.Qunit.test("设置导航栏", "setNavigationBar接口success callback测试", function (assert) {
      my.setNavigationBar({
        title:"hello",
        backgroundColor:"#FFC0CB",
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用setNavigationBar接口成功,改变导航栏" + JSON.stringify(res), "调用setNavigationBar接口失败，无法改变导航栏");
        },
      });
      assert(false, "调用setNavigationBar接口成功,改变导航栏", "调用setNavigationBar接口失败，无法改变导航栏");
    });

    this.Qunit.test("设置导航栏_complete", "setNavigationBar接口complete callback测试", function (assert) {
      my.setNavigationBar({
        title:"hello",
        backgroundColor:"#FFC0CB",
        complete: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用setNavigationBar接口成功,获取complete回调" + JSON.stringify(res), "调用setNavigationBar接口失败，无法获取complete回调");
        },
      });
      assert(false, "调用setNavigationBar接口成功,获取complete回调", "调用setNavigationBar接口失败，无法获取complete回调");
    });

    this.Qunit.test("设置导航栏_parameter_null", "setNavigationBar接口fail callback测试", function (assert) {
      my.setNavigationBar({
        title: null,
        backgroundColor:null,
        borderBottomColor:null,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用setNavigationBar接口成功,改变导航栏" + JSON.stringify(res), "调用setNavigationBar接口失败，无法改变导航栏");
        },
      });
      assert(false, "调用setNavigationBar接口成功,改变导航栏", "调用setNavigationBar接口失败，无法改变导航栏");
    });

    this.Qunit.test("设置导航栏_parameter_nullString", "setNavigationBar接口fail callback测试", function (assert) {
      my.setNavigationBar({
        title: '',
        backgroundColor:'',
        borderBottomColor:'',
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用setNavigationBar接口成功,改变导航栏" + JSON.stringify(res), "调用setNavigationBar接口失败，无法改变导航栏");
        },
      });
      assert(false, "调用setNavigationBar接口成功,改变导航栏", "调用setNavigationBar接口失败，无法改变导航栏");
    });

    this.Qunit.test("设置导航栏_parameter_number", "setNavigationBar接口fail callback测试", function (assert) {
      my.setNavigationBar({
        title:123,
        backgroundColor:456,
        borderBottomColor:789,
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用setNavigationBar接口成功,改变导航栏" + JSON.stringify(res), "调用setNavigationBar接口失败，无法改变导航栏");
        },
      });
      assert(false, "调用setNavigationBar接口成功,改变导航栏", "调用setNavigationBar接口失败，无法改变导航栏");
    });

    this.Qunit.test("设置导航栏_parameter_array", "setNavigationBar接口fail callback测试", function (assert) {
      my.setNavigationBar({
        title:['12','12','12'],
        backgroundColor:['12','12','12'],
        borderBottomColor:['12','12','12'],
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, "调用setNavigationBar接口成功,改变导航栏" + JSON.stringify(res), "调用setNavigationBar接口失败，无法改变导航栏");
        },
      });
      assert(false, "调用setNavigationBar接口成功,改变导航栏", "调用setNavigationBar接口失败，无法改变导航栏");
    });

    //////////////// 用例结束 /////////////////////
    app.Q.setData = this.setData;
    app.Q.setData(app.Q.data);
  },
});





// Page({

// setNaivgationBar() {
//     my.setNavigationBar({
//       title:"hello",
//       backgroundColor:"#FFC0CB",
//     //   borderBottomColor:"#000000",
//       success() {
//         my.alert({
//           content: '设置成功', 
//         });
//       },
//       fail() {
//         my.alert({
//           content: '设置失败',
//        });
//       },
//     })
//   },
  
// setNaivgationBar_null() {
//     my.setNavigationBar({
//       title: null,
//       backgroundColor:null,
//       borderBottomColor:null,
//       success() {
//         my.alert({
//           content: '设置成功', 
//         });
//       },
//       fail() {
//         my.alert({
//           content: '设置失败',
//        });
//       },
//     })
// },

// setNaivgationBar_nullString() {
//     my.setNavigationBar({
//       title:"",
//       backgroundColor:"",
//       borderBottomColor:"",
//       success() {
//         my.alert({
//           content: '设置成功', 
//         });
//       },
//       fail() {
//         my.alert({
//           content: '设置失败',
//        });
//       },
//     })
// },

// setNaivgationBar_number() {
//     my.setNavigationBar({
//       title:123,
//       backgroundColor:123,
//       borderBottomColor:123,
//       success() {
//         my.alert({
//           content: '设置成功', 
//         });
//       },
//       fail() {
//         my.alert({
//           content: '设置失败',
//        });
//       },
//     })
// },

// setNaivgationBar_array() {
//     my.setNavigationBar({
//       title:['12','12','12'],
//       backgroundColor:['12','12','12'],
//       borderBottomColor:['12','12','12'],
//       success() {
//         my.alert({
//           content: '设置成功', 
//         });
//       },
//       fail() {
//         my.alert({
//           content: '设置失败',
//        });
//       },
//     })
// },


// setNaivgationBar_Chinese() {
//     my.setNavigationBar({
//       title:hello,
//       backgroundColor:hello,
//       borderBottomColor:hello,
//       success() {
//         my.alert({
//           content: '设置成功', 
//         });
//       },
//       fail() {
//         my.alert({
//           content: '设置失败',
//        });
//       },
//     })
// },

// resetNavigationBar() {
//     my.setNavigationBar({
//       title:"",
//       backgroundColor:"#FFFFFF",
//       reset: true,
//     });
//   }
// })
