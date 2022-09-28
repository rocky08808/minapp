import { test, runAll, run } from '/util/qunit/qunit';
Page({
  data: {
    devid: '78fc491B-3ACB-5258-2779-54FFE1CFB260',   //若这里不输入默认值，请在输入框输入
    //devid:'1185F80C-18E5-CD14-F3E4-EEFC3E2C7442',
    serid: '',
    charid: '',
    alldev: [{ deviceId: '', }],
  },
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

    if (app.Q.data.tests[idx].status == "show") {
      app.Q.data.tests[idx].status = "hide";
    } else {
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
    // const srempty = '';
    // const srline = 'abcde';
    // JSON srlineJson = {a:'b'};
    //////////////// 用例开始 /////////////////////
    ////蓝牙-初始化蓝牙////

    //参数校验
    this.Qunit.test("蓝牙-初始化蓝牙_autoClose_false", "openBluetoothAdapter接口success callback测试", function (assert) {
      my.openBluetoothAdapter({
        autoClose: false,
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(res.isSupportBLE != "", "调用openBluetoothAdapter接口，初始化蓝牙成功,success回调成功" + JSON.stringify(res), "调用openBluetoothAdapter接口,蓝牙未开启，无法完成success回调");
        },
      });
      assert(false, "调用openBluetoothAdapter接口,蓝牙未开启，无法完成success回调", "调用openBluetoothAdapter接口,蓝牙未开启，无法完成success回调");
    });

    this.Qunit.test("蓝牙-初始化蓝牙_autoClose_true", "openBluetoothAdapter接口success callback测试", function (assert) {
      my.openBluetoothAdapter({
        autoClose: true,
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(res.isSupportBLE != "", "调用openBluetoothAdapter接口，初始化蓝牙成功,success回调成功" + JSON.stringify(res), "调用openBluetoothAdapter接口,蓝牙未开启，无法完成success回调");
        },
      });
      assert(false, "调用openBluetoothAdapter接口,蓝牙未开启，无法完成success回调", "调用openBluetoothAdapter接口,蓝牙未开启，无法完成success回调");
    });

    this.Qunit.test("蓝牙-初始化蓝牙_autoClose_空字符串", "openBluetoothAdapter接口success callback测试", function (assert) {
      my.openBluetoothAdapter({
        autoClose: '',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(res.isSupportBLE != "", "调用openBluetoothAdapter接口，初始化蓝牙成功,success回调成功" + JSON.stringify(res), "调用openBluetoothAdapter接口,蓝牙未开启，无法完成success回调");
        },
      });
      assert(false, "调用openBluetoothAdapter接口,蓝牙未开启，无法完成success回调", "调用openBluetoothAdapter接口,蓝牙未开启，无法完成success回调");
    });

    this.Qunit.test("蓝牙-初始化蓝牙_autoClose_字符串", "openBluetoothAdapter接口success callback测试", function (assert) {
      my.openBluetoothAdapter({
        autoClose: 'apk',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(res.isSupportBLE != "", "调用openBluetoothAdapter接口，初始化蓝牙成功,success回调成功" + JSON.stringify(res), "调用openBluetoothAdapter接口,蓝牙未开启，无法完成success回调");
        },
      });
      assert(false, "调用openBluetoothAdapter接口,蓝牙未开启，无法完成success回调", "调用openBluetoothAdapter接口,蓝牙未开启，无法完成success回调");
    });

    //回调
    this.Qunit.test("蓝牙-初始化蓝牙_02fail回调", "openBluetoothAdapter接口fail callback测试", function (assert) {
      my.openBluetoothAdapter({
        fail: (res) => {
          assert(false, "异常", "调用openBluetoothAdapter接口，初始化蓝牙，出现异常,调用了fail");
        },
      });
      assert(true, "调用openBluetoothAdapter接口，初始化蓝牙，不会调用fail，", "异常");
    });


    this.Qunit.test("蓝牙-初始化蓝牙_03complete回调", "openBluetoothAdapter接口complete callback测试", function (assert) {
      my.openBluetoothAdapter({
        complete: (res) => {
          assert(true, "调用openBluetoothAdapter接口，初始化蓝牙，可以正常complete回调", "调用openBluetoothAdapter接口，初始化蓝牙，无法正常complete回调");
        },
      });
    });
    ////蓝牙-断开本机蓝牙////
    this.Qunit.test("蓝牙-断开本机蓝牙_字符串", "openBluetoothAdapter接口success callback测试", function (assert) {
      my.disconnectBLEDevice({
        deviceId: '1980980',
        success: (res) => {
          assert(true, "调用closeBluetoothAdapter接口，成功关闭本机蓝牙，success回调成功" + JSON.stringify(res), "调用closeBluetoothAdapter接口，成功关闭本机蓝牙，success回调失败");
        },
      });
      assert(false, "调用closeBluetoothAdapter接口，关闭失败", "调用closeBluetoothAdapter接口，关闭本机蓝牙");
    });
    this.Qunit.test("蓝牙-断开本机蓝牙_空字符串", "openBluetoothAdapter接口success callback测试", function (assert) {
      my.disconnectBLEDevice({
        deviceId: '',
        success: (res) => {
          assert(true, "调用closeBluetoothAdapter接口，成功关闭本机蓝牙，success回调成功" + JSON.stringify(res), "调用closeBluetoothAdapter接口，成功关闭本机蓝牙，success回调失败");
        },
      });
      assert(false, "调用closeBluetoothAdapter接口，关闭失败", "调用closeBluetoothAdapter接口，关闭本机蓝牙");

    });
    this.Qunit.test("蓝牙-断开本机蓝牙_数字", "openBluetoothAdapter接口success callback测试", function (assert) {

      my.disconnectBLEDevice({
        deviceId: 0,
        success: (res) => {
          assert(true, "调用closeBluetoothAdapter接口，成功关闭本机蓝牙，success回调成功" + JSON.stringify(res), "调用closeBluetoothAdapter接口，成功关闭本机蓝牙，success回调失败");
        },
      });
      assert(false, "调用closeBluetoothAdapter接口，关闭失败", "调用closeBluetoothAdapter接口，关闭本机蓝牙");


    });
    this.Qunit.test("蓝牙-断开本机蓝牙_数字", "openBluetoothAdapter接口success callback测试", function (assert) {
      my.disconnectBLEDevice({
        deviceId: 0,
        success: (res) => {
          assert(true, "调用closeBluetoothAdapter接口，成功关闭本机蓝牙，success回调成功" + JSON.stringify(res), "调用closeBluetoothAdapter接口，成功关闭本机蓝牙，success回调失败");
        },
      });
    });

    ////蓝牙-关闭本机蓝牙////

    this.Qunit.test("蓝牙-关闭本机蓝牙_01success回调", "openBluetoothAdapter接口success callback测试", function (assert) {
      my.closeBluetoothAdapter({
        success: (res) => {
          assert(true, "调用closeBluetoothAdapter接口，成功关闭本机蓝牙，success回调成功", "调用closeBluetoothAdapter接口，成功关闭本机蓝牙，success回调失败");
        },
      });
    });

    this.Qunit.test("蓝牙-关闭本机蓝牙_02fail回调", "openBluetoothAdapter接口fail callback测试", function (assert) {
      my.closeBluetoothAdapter({
        fail: (res) => {
          assert(false, "调用closeBluetoothAdapter接口，关闭本机蓝牙，出现异常，调用了fail", "");
        },
      });
      assert(true, "调用openBluetoothAdapter接口，关闭本机蓝牙，不会调用fail", "");
    });


    this.Qunit.test("蓝牙-关闭本机蓝牙_03complete回调", "openBluetoothAdapter接口complete callback测试", function (assert) {
      my.closeBluetoothAdapter({
        complete: (res) => {
          assert(true, "调用closeBluetoothAdapter接口，可以正常complete回调", "调用closeBluetoothAdapter接口，无法正常complete回调");
        },
      });
    });

    ////获取本机蓝牙状态////

    this.Qunit.test("蓝牙-获取本机蓝牙状态_01success回调", "getBluetoothAdapterState接口success callback测试", function (assert) {
      my.getBluetoothAdapterState({
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(res.available != "", "调用getBluetoothAdapterState接口，成功获取本机蓝牙状态" + "，返回:" + JSON.stringify(res) + "success回调成功", "调用getBluetoothAdapterState接口,无法获取本机蓝牙状态，success回调失败");
        },
      });
    });

    this.Qunit.test("蓝牙-获取本机蓝牙状态_02fail回调", "getBluetoothAdapterState接口fail callback测试", function (assert) {
      my.getBluetoothAdapterState({
        fail: (res) => {
          assert(false, "fail", "调用getBluetoothAdapterState接口，获取本机蓝牙状态，出现异常");
        },
      });
      assert(true, "调用getBluetoothAdapterState接口，获取本机蓝牙状态，不会调用fail", "fail");
    });


    this.Qunit.test("蓝牙-获取本机蓝牙状态_03complete回调", "getBluetoothAdapterState接口complete callback测试", function (assert) {
      my.getBluetoothAdapterState({
        complete: (res) => {
          assert(true, "调用getBluetoothAdapterState接口，获取本机可以状态，正常complete回调", "调用getBluetoothAdapterState接口，获取本机可以状态，无法正常complete回调");
        },
      });
    });

    ////蓝牙-开始搜索////

    this.Qunit.test("蓝牙-开始搜索_01不传参数", "startBluetoothDevicesDiscovery接口success callback测试", function (assert) {
      my.openBluetoothAdapter({
        autoClose: false,
        success: (res) => {
          my.startBluetoothDevicesDiscovery({
            allowDuplicatesKey: false,
            interval: '5000',
            //  services: "",                 
            success: (res) => {
              my.onBluetoothDeviceFound({
                success: (res) => {
                  console.log(JSON.stringify(res))
                  assert(true, "调用startBluetoothDevicesDiscovery接口，开始搜索蓝牙设备，可以正常success回调,返回：" + JSON.stringify(res), "fail")
                },
              });
            },
          });
        },
      });
      assert(false, "fail", "调用startBluetoothDevicesDiscovery接口，开始搜索蓝牙设备，无法正常success回调");
    });

    //   ////蓝牙-连接////
    //   this.Qunit.test("连接设备失败-设备ID错误_02", "connectBLEDevice接口success callback测试", function(assert){
    //     my.connectBLEDevice({
    //       deviceId: "7F:71:29:28:FC:00",       
    //       fail: (error) => {
    //         assert(false, "异常", "调用connectBLEDevice接口，设备ID错误，fail回调出现异常");
    //       },          
    //     });
    //   assert(true, "调用connectBLEDevice接口，设备ID错误，连接蓝牙失败,fail回调，返回："+JSON.stringify(res), "异常");
    //   }); 

    //   this.Qunit.test("连接设备失败-设备ID为空_03", "connectBLEDevice接口success callback测试", function(assert){
    //     my.connectBLEDevice({
    //       deviceId: "",       
    //       fail: (error) => {
    //         console.log(res),
    //         assert(false, "异常", "调用connectBLEDevice接口，ID为空，fail回调出现异常");
    //       },          
    //     });
    //   assert(true, "调用connectBLEDevice接口，ID为空，连接蓝牙失败，fail回调,返回："+JSON.stringify(res), "异常");
    // }); 


    //////////////// 用例结束 /////////////////////
    app.Q.setData = this.setData;
    app.Q.setData(app.Q.data);
  },
});
