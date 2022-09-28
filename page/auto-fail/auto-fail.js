Page({
  data: {
    tests:[
      {
        name:"getSystemInfo Interface test",
        desc:"getSystemInfo",
        params:{}
      },
      {
        name:"getCities Interface test",
        desc:"getCities",
        params:{}
      }
    ]
  },
  Qunit:{
    idx:-1,
    test:function(name, desc, callback){
      let app = getApp();
      app.Q.data.tests.push({
        name:name,
        desc:desc,
        result:"untest",
        info:"",
        status:"hide"
      });

    app.Q.funcs.cblist.push({
      callback:callback
    });

    app.Q.data.total += 1;

    },
    
    run:function(idx){
      let running = true;
      let app = getApp();
      let lastResult = app.Q.data.tests[idx].result;
      app.Q.data.tests[idx].result = "run";
      app.Q.data.tests[idx].info = "";
      app.Q.setData(app.Q.data);

      let assert = function(condition, trueMsg, falseMsg){
        if(condition){
          app.Q.data.tests[idx].result = "pass";
          app.Q.data.tests[idx].info = trueMsg;
        }else{
          app.Q.data.tests[idx].result = "fail";
          app.Q.data.tests[idx].info = falseMsg;
        }

        app.Q.update(condition, lastResult);
        app.Q.setData(app.Q.data);
        running = false;
      };
      app.Q.funcs.cblist[idx].callback(assert);
    },
    runAll:function(){
      let app = getApp();

      for(let i=app.Q.data.tests.length -1; i>=0; i--){
        if(app.Q.data.tests[i].type != "manual"){
          this.run(i);
        }
      }
    },
  },

  onItemTap(event){
    let app = getApp();
    let idx = event.currentTarget.id;
    
    if(app.Q.data.tests[idx].status == "show"){
      app.Q.data.tests[idx].status = "hide";
    }else{
      app.Q.data.tests[idx].status = "show";
    };

    this.setData(app.Q.data);
  },
  onRunTap(event){
    let idx = event.currentTarget.id;
    this.Qunit.run(idx);
  },
  handleTap(event){
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
显示操作菜单
    //////////////// test start /////////////////////
    let app = getApp();
    app.Q.resetDate();

    ////save image////
    
    this.Qunit.test("saveImage_01 test ", "saveImage  success callback test ", function (assert) {
      my.saveImage({
        url: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
        showActionSheet: true,
      });
      assert(true, "saveImage  , test ，图片保存 success ，successs callback  success ", " call saveImage  ，保存图片不 success ，success callback 失败");
    });

    this.Qunit.test("saveImage_02不 test ", "saveImage  success callback test ", function(assert){
      my.saveImage({
        url:'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
        showActionSheet:false,
      });
    assert(true," call saveImage  , test ，图片保存 success ，successs callback  success "," call saveImage  ，success callback 失败");                   
    });

    this.Qunit.test("saveImage_03URL wrong ","saveImage  success callback test ", function(assert){
      my.saveImage({
        url:'https://XXXXX.jpg',
        showActionSheet:false,       
        fail:(res)=>{
          console.log(res.error)       
        assert(false,"fail"," call saveImage  ，URL wrong ，fail callback 异常");                  
        },
      });
    assert(true, " call saveImage  ，URL wrong ，fail callback ，无法保存图片","fail"); 
    });
    
    this.Qunit.test("saveImage_04complete callback ", "saveImage  complete callback test ", function(assert){
      my.saveImage({
        complete: (res) => {
          console.log(res)
          assert(true, " call saveImage  ，可以正常complete callback ", " call saveImage  ，无法正常complete callback ");
        },
      });
    });

    ////开放  -用户授权////
    this.Qunit.test("getAuthCode_01静默授权", "getAuthCode  success callback test ", function(assert){
      my.getAuthCode({
        scopes: 'auth_base',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert((res.authCode != ""), " call getAuthCode  ，auth_base,可以正常获取到authCode值,authCode值为" + JSON.stringify(res) + ", success success callback ", "fail");
        },
      });
    assert(false, "fail", " call getAuthCode  ,授权类型 wrong ,无法success callback ");  
    });

    this.Qunit.test("getAuthCode_02主动授权", "getAuthCode  success callback test ", function(assert){
      my.getAuthCode({
        scopes: 'auth_user',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert((res.authCode != ""), " call getAuthCode  ，auth_user,可以正常获取到authCode值,authCode值为" + JSON.stringify(res) + ", success success callback ", "fail");
        },
      }); 
    assert(false, "fail"," call getAuthCode  ,授权类型 wrong ,无法success callback ");    
    });

    this.Qunit.test("getAuthCode_03传入 wrong 的授权类型", "getAuthCode  fail callback test ", function(assert){   
      my.getAuthCode({
        scopes: 'auth',
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, " call getAuthCode  ，传入 wrong 参数，fail callback ，返回：" + JSON.stringify(res), "fail");
        },
      });
    assert(false, "fail", " call getAuthCode  ，传入 wrong 参数，fail callback 出现异常");
    });
    
    this.Qunit.test("getAuthCode_04complete callback ", "getAuthCode  complete callback test ", function(assert){
      my.getSystemInfo({
        complete: (res) => {
          assert(true, " call getAuthCode  ，可以正常complete callback ", " call getAuthCode  ，无法正常complete callback ");
        },
      });
    });


   ////开放  -客户端获取会员信息////

    this.Qunit.test("getAuthUserInfo_01主动授权", "getAuthUserInfo  success callback test ", function(assert){
      my.getAuthCode({
        scopes: 'auth_user',
        success: (res) => {
          my.getAuthUserInfo({
            success: (userInfo) => {
            console.log(userInfo)
            assert((userInfo.nickName !=""), "可以正常获取到nickname,avatar值, call getAuthUserInfo  ,主动授权，success callback "+",返回:"+JSON.stringify(userInfo)," call getAuthUserInfo  ，无法获得返回值，success callback 失败");
            }
          });
        },
      });            
    });

    this.Qunit.test("getAuthUserInfo_02静默授权", "getAuthUserInfo  success callback test ", function(assert){
      my.getAuthCode({
        scopes: 'auth_base',
        success: (res) => {
          my.getAuthUserInfo({
            success: (userInfo) => {
            console.log(userInfo)
            assert((userInfo.nickName !=""), "可以正常获取到nickname,avatar值, call getAuthUserInfo  ,主动授权，success callback "+",返回:"+JSON.stringify(userInfo), " call getAuthUserInfo  ，无法获得返回值，success callback 失败");    
            }
          });
        },
      });         
    });

    this.Qunit.test("getAuthUserInfo_03fail callback ", "getAuthUserInfo  fail callback test ", function(assert){   
      my.getSystemInfo({
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(false, "异常", " call getAuthUserInfo  ，出现异常， call 了fail");
        },
      });
    assert(true, " call getAuthUserInfo  ，不会 call fail", "异常");
    });

   
    this.Qunit.test("getAuthUserInfo_03complete callback ", "getAuthUserInfo  complete callback test ", function(assert){
        my.getSystemInfo({
        complete: (res) => {
          console.log(JSON.stringify(res))
          assert(true, " call getAuthUserInfo  ，可以正常complete callback ", " call getAuthUserInfo  ，无法正常complete callback ");
        },
      });
    });

    ////授权指导////
    this.Qunit.test("LBS_01授权指导", "showAuthGuide  success callback test ", function(assert){
      my.showAuthGuide({
        bizType: 'AppletPG',
        authType: 'LBS',
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, " call showAuthGuide  ，success callback ,返回:" + JSON.stringify(res), " call showAuthGuide  ，success callback 失败");
        },
      });    
    });

    ////蓝牙-初始化蓝牙////

    this.Qunit.test("蓝牙-初始化蓝牙_01success callback ", "openBluetoothAdapter  success callback test ", function(assert){
      my.openBluetoothAdapter({
        autoClose:false,       
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(res.isSupportBLE != "", " call openBluetoothAdapter  ，初始化蓝牙 success ,success callback  success " + JSON.stringify(res), " call openBluetoothAdapter  ,蓝牙未开启，无法完成success callback ");
        },
      });
    assert(false, " call openBluetoothAdapter  ,蓝牙未开启，无法完成success callback " , " call openBluetoothAdapter  ,蓝牙未开启，无法完成success callback ");
    });

    this.Qunit.test("蓝牙-初始化蓝牙_02fail callback ", "openBluetoothAdapter  fail callback test ", function(assert){   
      my.openBluetoothAdapter({
        fail: (res) => {
          assert(false, "异常", " call openBluetoothAdapter  ，初始化蓝牙，出现异常, call 了fail");
        },
      });
    assert(true, " call openBluetoothAdapter  ，初始化蓝牙，不会 call fail，", "异常");
    });

    
    this.Qunit.test("蓝牙-初始化蓝牙_03complete callback ", "openBluetoothAdapter  complete callback test ", function(assert){
        my.openBluetoothAdapter({
        complete: (res) => {
          assert(true, " call openBluetoothAdapter  ，初始化蓝牙，可以正常complete callback ", " call openBluetoothAdapter  ，初始化蓝牙，无法正常complete callback ");
        },
      });
    });

    ////蓝牙-关闭本机蓝牙////

    this.Qunit.test("蓝牙-关闭本机蓝牙_01success callback ", "openBluetoothAdapter  success callback test ", function(assert){
      my.closeBluetoothAdapter({       
        success: (res) => {
           assert(true, " call closeBluetoothAdapter  ， success 关闭本机蓝牙，success callback  success ", " call closeBluetoothAdapter  ， success 关闭本机蓝牙，success callback 失败");
        },                 
      });  
    }); 

    this.Qunit.test("蓝牙-关闭本机蓝牙_02fail callback ", "openBluetoothAdapter  fail callback test ", function(assert){   
      my.closeBluetoothAdapter({
        fail: (res) => {
          assert(false, " call closeBluetoothAdapter  ，关闭本机蓝牙，出现异常， call 了fail", "");
        },          
      });
    assert(true, " call openBluetoothAdapter  ，关闭本机蓝牙，不会 call fail", "");  
    });

    
    this.Qunit.test("蓝牙-关闭本机蓝牙_03complete callback ", "openBluetoothAdapter  complete callback test ", function(assert){
        my.closeBluetoothAdapter({
        complete: (res) => {
          assert(true, " call closeBluetoothAdapter  ，可以正常complete callback ", " call closeBluetoothAdapter  ，无法正常complete callback ");
        },        
      });
    });

    ////获取本机蓝牙状态////

    this.Qunit.test("蓝牙-获取本机蓝牙状态_01success callback ", "getBluetoothAdapterState  success callback test ", function(assert){
      my.getBluetoothAdapterState({       
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(res.available!="", " call getBluetoothAdapterState  ， success 获取本机蓝牙状态"+"，返回:"+JSON.stringify(res)+"success callback  success ", " call getBluetoothAdapterState  ,无法获取本机蓝牙状态，success callback 失败");
        },          
      });
    }); 

    this.Qunit.test("蓝牙-获取本机蓝牙状态_02fail callback ", "getBluetoothAdapterState  fail callback test ", function(assert){   
      my.getBluetoothAdapterState({
        fail: (res) => {
          assert(false, "fail", " call getBluetoothAdapterState  ，获取本机蓝牙状态，出现异常");
        },
      });
    assert(true, " call getBluetoothAdapterState  ，获取本机蓝牙状态，不会 call fail", "fail");
    });

    
    this.Qunit.test("蓝牙-获取本机蓝牙状态_03complete callback ", "getBluetoothAdapterState  complete callback test ", function(assert){
        my.getBluetoothAdapterState({
        complete: (res) => {
          assert(true, " call getBluetoothAdapterState  ，获取本机可以状态，正常complete callback ", " call getBluetoothAdapterState  ，获取本机可以状态，无法正常complete callback ");
        },
      });
    });

    ////蓝牙-开始搜索////

    this.Qunit.test("蓝牙-开始搜索_01不传参数", "startBluetoothDevicesDiscovery  success callback test ", function(assert){
      my.openBluetoothAdapter({
        autoClose:false,       
        success: (res) => {
          my.startBluetoothDevicesDiscovery({
            allowDuplicatesKey: false,
            interval: '5000',
          //  services: "",                 
            success: (res) => {
              my.onBluetoothDeviceFound({
                success: (res) => {
                console.log(JSON.stringify(res))
                assert(true, " call startBluetoothDevicesDiscovery  ，开始搜索蓝牙设备，可以正常success callback ,返回：" + JSON.stringify(res), "fail")
                },
              });
            },
          });
        },
      });
    assert(false, "fail", " call startBluetoothDevicesDiscovery  ，开始搜索蓝牙设备，无法正常success callback ");
    }); 

  //   ////蓝牙-连接////
  //   this.Qunit.test("连接设备失败-设备ID wrong _02", "connectBLEDevice  success callback test ", function(assert){
  //     my.connectBLEDevice({
  //       deviceId: "7F:71:29:28:FC:00",       
  //       fail: (error) => {
  //         assert(false, "异常", " call connectBLEDevice  ，设备ID wrong ，fail callback 出现异常");
  //       },          
  //     });
  //   assert(true, " call connectBLEDevice  ，设备ID wrong ，连接蓝牙失败,fail callback ，返回："+JSON.stringify(res), "异常");
  //   }); 

  //   this.Qunit.test("连接设备失败-设备ID为空_03", "connectBLEDevice  success callback test ", function(assert){
  //     my.connectBLEDevice({
  //       deviceId: "",       
  //       fail: (error) => {
  //         console.log(res),
  //         assert(false, "异常", " call connectBLEDevice  ，ID为空，fail callback 出现异常");
  //       },          
  //     });
  //   assert(true, " call connectBLEDevice  ，ID为空，连接蓝牙失败，fail callback ,返回："+JSON.stringify(res), "异常");
  // }); 
  
    ////网络-httpRequest////

    this.Qunit.test("httpRequest_01发送一条请求", "httpRequest  success callback test ", function(assert){
      my.httpRequest({
        url: 'http://httpbin.org/post',
        method: 'POST',
        data: {
          from: 'miniapp',

          production: 'JSAPI',
        },
        dataType: 'json',
        timeout: 20000,
        success: function (res) {
          console.log(JSON.stringify(res))
          res.status == undefined
          assert(res.status == '200', " call httpRequest  ， success 发送请求,success callback  success ，返回：" + JSON.stringify(res), "请求发送失败，返回："+JSON.stringify(res));
        },
      });
    }); 

    this.Qunit.test("httpRequest_02请求地址 wrong ", "httpRequest  fail callback test ", function(assert){
      my.httpRequest({
        url: 'xxx',
        success:function (res) {
          assert(true, " call httpRequest  ，fail callback 出现异常", "异常，返回："+JSON.stringify(res));
        },
        fail: function(error) {
          console.log(JSON.stringify(error))
          assert(true, " call httpRequest  ，地址 wrong ，fail callback ,返回:" + JSON.stringify(error), " call httpRequest  ，url wrong ，出现异常，不会 call fail");
        },
      });
    });
      
    this.Qunit.test("httpRequest_03请求超时", "httpRequest  fail callback test ", function(assert){
      my.httpRequest({
        url: 'http://httpbin.org/post',
        method:'POST',
        data: {
          from: 'miniapp',

          production: 'JSAPI',
        },
        timeout:50,
        dataType: 'json',
        fail: function (error) {
          console.log(JSON.stringify(error))
          assert(true, " call httpRequest  ，请求超时，fail callback ，返回:" + JSON.stringify(error), " call httpRequest  ，请求超时，出现异常，不会 call fail");
        },
      });
    });

    this.Qunit.test("httpRequest_04请求没有跨域权限", "httpRequest  fail callback test ", function (assert) {
      my.httpRequest({
        url: 'http://httpbina.com/post',
        method: 'POST',
        data: {
          from: 'miniapp',

          production: 'JSAPI',
        },
        dataType: 'json',
        timeout:20000,
        success:function(res) {
          assert(false, "fail", " call httpRequest  ，fail callback 出现异常");;
        },
        fail: function (res) {
          console.log(JSON.stringify(res))
          assert(true, " call httpRequest  ，跨越没有权限，fail callback ，返回:" + JSON.stringify(res), "fail");
        },
      });
    });

    
    this.Qunit.test("httpRequest_06complete callback ", "httpRequest  complete callback test ", function(assert){
      my.httpRequest({
        complete: function(res) {
          assert(true, " call setStorage  ，可以正常complete callback ", " call setStorage  ，无法正常complete callback ");
        },
      });
    });

      ////网路-上传图片文件////

    // this.Qunit.test("uploadFile_01上传图片", "uploadFile  success callback test ", function (assert) {
    //   my.uploadFile({
    //     url: 'http://httpbin.org/post',
    //     fileType: 'image',
    //     fileName: 'file',
    //     filePath: "https://resource/apml2595405f31e1039c9b0d3e228e11dca1.image",
    //     //filePath:'http://img.alicdn.com/tfs/TB1x669SXXXXXbdaFXXXXXXXXXX-520-280.jpg',
    //     success: (res) => {
    //       console.log(JSON.stringify(res))
    //       assert(res.data != "", " call uploadFile  ，上传图片，可以正常success callback ，返回:" + JSON.stringify(res), " call uploadFile  ，path wrong ，无法上传图片，请更改path");
    //     },
    //   });
    //   assert(false, " call uploadFile  ，无法正常success callback ", " call uploadFile  ，path wrong ，无法上传图片，请更改path");
    // });

    // ////网路-上传视频文件////
    // this.Qunit.test("uploadFile_02上传视频文件", "uploadFile  success callback test ", function (assert) {
    //   my.uploadFile({
    //     url: 'http://httpbin.org/post',
    //     fileType: 'video',
    //     fileName: 'file',
    //     filePath: "https://resource/apml545c5aff5b02d3d1f295ff351eaa5f4b.video",
    //     
    //     success: (res) => {
    //       console.log(JSON.stringify(res))
    //       assert(res.data != "", " call uploadFile  ，上传视频，可以正常success callback ，返回:" + JSON.stringify(res), " call uploadFile  ,path wrong ，无法上传视频，请更改path");
    //     },
    //   });
    //   assert(false, " call uploadFile  ，无法正常success callback ", " call uploadFile  ，path wrong ，无法上传视频，请更改path");
    // });

    this.Qunit.test("uploadFile_03上传图片path wrong ", "uploadFile  fail callback test ", function(assert){
      my.uploadFile({
        url: 'http://httpbin.org/post',
        fileType: 'image',
        fileName: 'VID20170825110217.mp4',
        filePath: '手机存储/DCIM/era/VID20170825110217.mp4',
  
        success: (res) => {
          assert(false, "异常", " call uploadFile  ，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, " call uploadFile  ，path wrong ，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    }); 

    this.Qunit.test("uploadFile_04上传图片url地址 wrong ", "uploadFile  fail callback test ", function(assert){
      my.uploadFile({
        url: 'http://httpbin.o/post',
        fileType: 'image',
        fileName: "file",
        filePath: '[\"file:///storage/emulated/0/DCIM/Camer/file1.jpg\"]',  
        success: (res) => {
          assert(false, "异常", " call uploadFile  ，fail callback 出现异常");
        },
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, " call uploadFile  ，url wrong ，无法上传图片，fail callback ，返回:" + JSON.stringify(res), "异常");
        }
      });
    });

    this.Qunit.test("downloadFile_01下载文件", "downloadFile  success callback test ", function (assert) {
      my.downloadFile({
        url: 'http://img.alicdn.com/tfs/TB1x669SXXXXXbdaFXXXXXXXXXX-520-280.jpg',
        success: (apFilePath) => {          
          urls: [apFilePath],     
          assert(apFilePath!="", " call downloadFile  ，文件下载 success ，success callback ，返回:"+JSON.stringify(apFilePath), " call downloadFile  ,下载文件不 success ，无法success callback ");
        },          
      });
    }); 

    this.Qunit.test("downloadFile_02下载文件URL wrong ", "downloadFile  fail callback test ", function(assert){
      my.downloadFile({
        url: 'http://xxxx',
        fail: (res) => {
          console.log(res)
          assert(true, " call uploadFile  ，URL wrong ，fail callback ,返回error码:" + res.error, " call uploadFile  ，URL wrong ，fail callback 出现异常");
        },
      });
    assert(false, "异常", " call uploadFile  ，fail callback 出现异常"); 
    }),

    this.Qunit.test("connectSocket_01创建连接", "connectSocket  success callback test ", function(assert){
      my.connectSocket({
          url: 'ws://mobilegwspanner.stable.test.net:8000/ws',
          data: {},
          header:{
          'content-type': 'application/json'
        },
        method: "POST",
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, " call connectSocket  ，可以正常success callback , success 返回:" + JSON.stringify(res), "");
        },
      });
      assert(false, " call connectSocket  ，无法正常success callback ", "");
    });
        

    this.Qunit.test("connectSocket_02创建连接URL为空", "connectSocket  fail callback test ", function(assert){
      my.connectSocket({
        url: '',
        data: {},
        header:{
        'content-type': 'application/json'
        },
        method:"POST",
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, " call connectSocket  ，url为空，fail callback ,返回:"+JSON.stringify(res), "异常");         
        },       
      });
    assert(false, "异常", " call connectSocket  ，fail callback 出现异常");     
  }); 
  
    this.Qunit.test("connectSocket_03创建连接-正在连接", "connectSocket  fail callback test ", function(assert){
      my.connectSocket({
        url: 'ws://mobilegwspanner.stable.Miniprogram.net:8000/ws',
        data: {},
        header:{
        'content-type': 'application/json'
        },
        method:"POST",
        success: (res) => { 
          my.connectSocket({
            url: 'ws://mobilegwspanner.stable.Miniprogram.net:8000/ws',
            data: {},
            header:{
            'content-type': 'application/json'
            },
            method:"POST",
            fail: (res) => {
              assert(false, "异常", " call connectSocket  ，重复连接，出现异常");                                 
            },              
          });
        },
      });
    assert(true, " call connectSocket  ，无法重复连接", "异常");                 
    }); 


    this.Qunit.test("connectSocket_03创建连接URL格式不合法", "connectSocket  fail callback test ", function(assert){
      my.connectSocket({
        url: 'https://mobilegwspanner.Miniprogram',
        fail: (res) => {
          console.log(JSON.stringify(res))
          assert(true, " call connectSocket  ，URL不合法，fail callback ，返回:" + JSON.stringify(res), "异常");
        },
      });
    assert(false, "异常", " call connectSocket  ，URL不合法，fail callback 出现异常");      
  });

    this.Qunit.test("closeSocket_01success callback ", "closeSocket  success callback test ", function(assert){
      my.connectSocket({
        url:'ws://mobilegwspanner.stable.Miniprogram.net:8000/ws',
        data: {},
        header:{
          'content-type': 'application/json'
        },
        method:"GET",
      });
      my.onSocketOpen(function(res) {
        my.closeSocket() 
      });                         
      assert(true, " call closeSocket  ，关闭连接 success ，success callback 正常", " call closeSocket  ，出现异常，无法完成success callback ");          
    });

    this.Qunit.test("onSocketClose_01success callback ", "onSocketClose  success callback test ", function(assert){
      my.connectSocket({
        url:'ws://mobilegwspanner.stable.Miniprogram.net:8000/ws',
        data: {},
        header:{
          'content-type': 'application/json'
        },
        method:"GET",
      });
      my.onSocketOpen(function(res) {
        my.closeSocket() 
      });
      my.onSocketClose(function(res) {
      }) 
      assert(true, " call onSocketClose  ，监听关闭连接 success ，success callback 正常", " call onSocketClose  ，出现异常，无法完成success callback ");          
    });

    ////缓存-Storage////

    this.Qunit.test("setStorage_01保存数据success", "setStorage  success callback test ", function(assert){
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => {
          console.log(JSON.stringify(res))
          assert(true, " call setStorage  ，保存数据 success ,success callback  success ，返回:" + JSON.stringify(res), " call setStorage  ，保存数据失败，success callback 失败，请检查");
        },
      });
    }); 
                         
    this.Qunit.test("setStorage_02保存数据fail", "setStorage  fail callback test ", function(assert){   
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        fail: (res) => {
          assert(false, "异常", " call setStorage  ，出现异常， call 了fail");
        },
      });
    assert(true, " call setStorage  ，不会 call fail", "异常");
    });

    
    this.Qunit.test("setStorage_03保存数据complete", "setStorage  complete callback test ", function(assert){
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        complete: (res) => {
          assert(true, " call setStorage  ，可以正常complete callback ", " call setStorage  ，无法正常complete callback ");
        },
      });
    });

    this.Qunit.test("getStorage_01读取数据success", "getStorage  success callback test ", function(assert){
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => { 
          my.getStorage({
            key: 'currentCity',
            success: function (res) {
              console.log(JSON.stringify(res))
              res.data = undefined
              assert(res.data != "", " call getStorage  ，读取数据 success ,success callback  success ，返回:" + JSON.stringify(res), " call getStorage  ，读取数据失败，success callback 失败，请检查");
            },
          });
        },
      });                
    }); 

    this.Qunit.test("getStorage_02读取数据fail", "getStorage  fail callback test ", function(assert){
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => { 
          my.getStorage({
            key: 'currentCity',
            fail: function(res) {                       
              assert(false, "异常", " call getStorage  ， call 了fail");  
            },              
          });
        },
      });                
    assert(true, " call getStorage  ，不会 call fail", "异常");
    }); 

    this.Qunit.test("getStorage_03读取数据complete", "getStorage  complete callback test ", function(assert){
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => { 
          my.getStorage({
            key: 'currentCity',
            complete: function(res) {                       
              assert(true, " call getStorage  ，可以正常complete callback ", " call getStorage  ，无法正常complete callback ");  
            },              
          });
        },
      });                
    }); 


    this.Qunit.test("removeStorage_01删除数据success", "removeStorage  success callback test ", function(assert){
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => { 
          my.removeStorage({
            key: 'currentCity',
            success: function(){
              assert(true, " call removeStorage  ，删除数据 success ，success callback  success ", " call removeStorage  ，删除数据失败，success callback 失败，请检查");  
            },              
          });
        },
      });                
    }); 

    this.Qunit.test("removeStorage_02删除数据fail", "removeStorage  success callback test ", function(assert){
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => { 
          my.removeStorage({
            key: 'currentCity',
            fail: function(){
              assert(false, "异常", " call removeStorage  ，出现异常， call 了fail");  
            },              
          });
        },
      });                
    assert(true, " call removeStorage  ，不会 call fail", "异常");
    }); 

    this.Qunit.test("removeStorage_03删除数据complete", "removeStorage  complete callback test ", function(assert){
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => { 
          my.removeStorage({
            key: 'currentCity',
            complete: function(res) {                       
              assert(true, " call removeStorage  ，可以正常complete callback ", " call removeStorage  ，无法正常complete callback ");  
            },              
          });
        },
      });                
    }); 

    this.Qunit.test("clearStorage_01清除数据success", "clearStorage  success callback test ", function(assert){
      my.setStorage({
        key: 'currentCity',
        data: {
          cityName: 'Hangzhou',
          adCode: '330100',
          spell: ' hangzhou',
        },
        success: (res) => {
          my.clearStorage()
          console.log(JSON.stringify(res))
          assert(true, " call clearStorage  ，清楚数据 success ，success callback  success ，返回:" + JSON.stringify(res), " call clearStorage  ，清楚数据失败，success callback 失败，请检查");
        },
      });
    });

    this.Qunit.test("setStorageSync_01同步保存数据success", "setStorageSync  success callback test ", function (assert) {
      let res = my.setStorageSync({
        key: 'currentCity',
        data: "Hangzhou"
      });
      if (!res.error) {
        assert(true, " call setStorageSync  ，同步保存数据 success ，正常success callback ,返回:" + JSON.stringify(res), "异常");
      } else {
        assert(false, "异常", " call setStorageSync  ，，同步保存数据无法正常success callback ");
      }

    });

    this.Qunit.test("getStorageSync_01同步读取数据", "getStorageSync  success callback test ", function(assert){
      let res = my.setStorageSync({ 
        key:'currentCity', 
        data: "Hangzhou" 
        });
        if (!res.error) {
          let res = my.getStorageSync({ key:'currentCity' });
            if (!res.error) {
              assert(res.data!="", "getStorageSync  ，同步读取数据 success ，正常success callback ,返回:"+JSON.stringify(res), "异常");
            }else{
              assert(false, "异常", " call getStorageSync  ，无法正常success callback "); 
            }
        }     
    });

    this.Qunit.test("removeStorageSync_01同步删除数据", "removeStorageSync  success callback test ", function(assert){
     let res = my.setStorageSync({ 
        key:'currentCity', 
        data: "Hangzhou" 
        });
        if (!res.error) {
          let res = my.removeStorageSync({ key:'currentCity' });
            if (!res.error) {
              assert(true, " call removeStorageSync  ，同步删除数据 success ，正常success callback "+JSON.stringify(res), "异常");
            }else{
              assert(false, "异常", " call removeStorageSync  ，无法正常success callback ");
            }
        }      
    });

    this.Qunit.test("clearStorageSync_01同步清除数据", "clearStorageSync  success callback test ", function(assert){
     let res = my.setStorageSync({ 
        key:'currentCity', 
        data: "Hangzhou" 
        });
        if (!res.error) {
          let res = my.clearStorageSync({ key:'currentCity' });
            if (!res.error) {
              assert(true, " call clearStorageSync  ，同步清除数据 success ，正常success callback ，返回:"+JSON.stringify(res), "异常");
            }else{
              assert(false, "异常", " call clearStorageSync  ，无法正常success callback "); 
            }
        }     
    });

   
    ////缓存-getStorageInfo////
    this.Qunit.test("getStorageInfo_01success", "getStorageInfo  success callback test ", function(assert){
      my.getStorageInfo({
        success: (res) => {
          console.log(JSON.stringify(res))
          res.currentSize == undefined
          assert((res.limitSize != ""), " call getStorageInfo  ，可以正常获取到返回值，正常success callback ，返回:"+JSON.stringify(res), " call getStorageInfo  ，无法正常获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getStorageInfo_02fail", "getStorageInfo  fail callback test ", function(assert){   
      my.getStorageInfo({
        fail: (res) => {
          assert(false, "异常", " call getStorageInfo  ，出现异常， call 了fail");
        },
      });
      assert(true, " call getStorageInfo  ，不会 call fail", "异常");
    });

    
    this.Qunit.test("getStorageInfo_03complete", "getStorageInfo  complete callback test ", function(assert){
        my.getStorageInfo({
        complete: (res) => {
          assert(true, " call getStorageInfo  ，可以正常complete callback ", " call getStorageInfo  ，无法正常complete callback ");
        },
      });
    });


    ////界面-数据安全////

    this.Qunit.test("rsa_01encrypy加密", "rsa  success callback test ", function(assert){      
      my.rsa({
        action: 'encrypt',
        text: "miniapp",
        key: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDKmi0dUSVQ04hL6GZGPMFK8+d6\n' +
        'GzulagP27qSUBYxIJfE04KT+OHVeFFb6K+8nWDea5mkmZrIgp022zZVDgdWPNM62\n' +
        '3ouBwHlsfm2ekey8PpQxfXaj8lhM9t8rJlC4FEc0s8Qp7Q5/uYrowQbT9m6t7BFK\n' +
        '3egOO2xOKzLpYSqfbQIDAQAB',
        success: (result) => {
          console.log(JSON.stringify(result))
          assert((result.text != ""), " call rsa  ，加密，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(result), " call rsa  ，加密，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("rsa_02decrypt解密", "rsa  success callback test ", function(assert){      
      my.rsa({
        action: 'decrypt',
        text: 'dXPeTdKOIg7J9DcEoEbN7hvglOOwlbq9eLjVWvD+l2guz3CcBnHj3Q0BO1oy\n'+
        '7gNCWgv3veL6BINMwnKc58wlhnCAypHpH5nC6gPrp9uhUnOV/HvMssDJxs4QK60jy2\n'+
        'H7JYw5FU70Jy4J6Bp6LPMvLO6SJAyiJ6GqDRBcQv37I2g=',
        key: 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMqaLR1RJVDTiEvo\n' +
        'ZkY8wUrz53obO6VqA/bupJQFjEgl8TTgpP44dV4UVvor7ydYN5rmaSZmsiCnTbbN\n' +
        'lUOB1Y80zrbei4HAeWx+bZ6R7Lw+lDF9dqPyWEz23ysmULgURzSzxCntDn+5iujB\n' +
        'BtP2bq3sEUrd6A47bE4rMulhKp9tAgMBAAECgYBjsfRLPdfn6v9hou1Y2KKg+F5K\n' +
        'ZsY2AnIK+6l+sTAzfIAx7e0ir7OJZObb2eyn5rAOCB1r6RL0IH+MWaN+gZANNG9g\n' +
        'pXvRgcZzFY0oqdMZDuSJjpMTj7OEUlPyoGncBfvjAg0zdt9QGAG1at9Jr3i0Xr4X\n' +
        '6WrFhtfVlmQUY1VsoQJBAPK2Qj/ClkZNtrSDfoD0j083LcNICqFIIGkNQ+XeuTwl\n' +
        '+Gq4USTyaTOEe68MHluiciQ+QKvRAUd4E1zeZRZ02ikCQQDVscINBPTtTJt1JfAo\n' +
        'wRfTzA0Lvgig136xLLeQXREcgq1lzgkf+tGyUGYoy9BXsV0mOuYAT9ldja4jhJeq\n' +
        'cEulAkEAuSJ5KjV9dyb0RIFAz5C8d8o5KAodwaRIxJkPv5nCZbT45j6t9qbJxDg8\n' +
        'N+vghDlHI4owvl5wwVlAO8iQBy8e8QJBAJe9CVXFV0XJR/n/XnER66FxGzJjVi0f\n' +
        '185nOlFARI5CHG5VxxT2PUCo5mHBl8ctIj+rQvalvGs515VQ6YEVDCECQE3S0AU2\n' +
        'BKyFVNtTpPiTyRUWqig4EbSXwjXdr8iBBJDLsMpdWsq7DCwv/ToBoLg+cQ4Crc5/\n5DChU8P30EjOiEo=',
        success: (result) => {
          console.log(JSON.stringify(result))
          assert((result.text == "支付宝小程序"), " call rsa  ，解密，可以正常获取到text值，正常success callback ，返回:" + JSON.stringify(result), " call rsa  ，解密，无法正常获取到text值，success callback 失败");
        },
      });
    });

    this.Qunit.test("rsa_03decrypt解密参数 wrong ", "rsa  success callback test ", function(assert){      
      my.rsa({
        action: 'decrypt',
        text: "dXPeTdKOIg7J9DcEoEbN7hvglOOwlbq9eLjVWvD+l2guz3CcBnHj3Q0BO1o",
        key: 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMqaLR1RJVDTiEvo\n' +
        'ZkY8wUrz53obO6VqA/bupJQFjEgl8TTgpP44dV4UVvor7ydYN5rmaSZmsiCnTbbN\n' +
        'lUOB1Y80zrbei4HAeWx+bZ6R7Lw+lDF9dqPyWEz23ysmULgURzSzxCntDn+5iujB\n' +
        'BtP2bq3sEUrd6A47bE4rMulhKp9tAgMBAAECgYBjsfRLPdfn6v9hou1Y2KKg+F5K\n' +
        'ZsY2AnIK+6l+sTAzfIAx7e0ir7OJZObb2eyn5rAOCB1r6RL0IH+MWaN+gZANNG9g\n' +
        'pXvRgcZzFY0oqdMZDuSJjpMTj7OEUlPyoGncBfvjAg0zdt9QGAG1at9Jr3i0Xr4X\n' +
        '6WrFhtfVlmQUY1VsoQJBAPK2Qj/ClkZNtrSDfoD0j083LcNICqFIIGkNQ+XeuTwl\n' +
        '+Gq4USTyaTOEe68MHluiciQ+QKvRAUd4E1zeZRZ02ikCQQDVscINBPTtTJt1JfAo\n' +
        'wRfTzA0Lvgig136xLLeQXREcgq1lzgkf+tGyUGYoy9BXsV0mOuYAT9ldja4jhJeq\n' +
        'cEulAkEAuSJ5KjV9dyb0RIFAz5C8d8o5KAodwaRIxJkPv5nCZbT45j6t9qbJxDg8\n' +
        'N+vghDlHI4owvl5wwVlAO8iQBy8e8QJBAJe9CVXFV0XJR/n/XnER66FxGzJjVi0f\n' +
        '185nOlFARI5CHG5VxxT2PUCo5mHBl8ctIj+rQvalvGs515VQ6YEVDCECQE3S0AU2\n' +
        'BKyFVNtTpPiTyRUWqig4EbSXwjXdr8iBBJDLsMpdWsq7DCwv/ToBoLg+cQ4Crc5/\n5DChU8P30EjOiEo=',      
        fail: (result) => {
          console.log(JSON.stringify(result))
          assert(true, " call rsa  ,加密参数 wrong ，fail callback ，返回:" + JSON.stringify(result), " call rsa  ,加密参数 wrong ，fail callback 出现异常");
          //assert(false,"", " call rsa  ,fail callback 出现异常");  
        },        
      });
    //assert(true, " call rsa  ,加密参数 wrong ，fail callback "+JSON.stringify(result),"");  
    });

    this.Qunit.test("rsa_04encrypt(key wrong )", "rsa  success callback test ", function(assert){      
      my.rsa({
        action: 'encrypt',
        text:"miniapp",
        key: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDKmi0dUSVQ04hL6GZGPMFK8+d6\n' +
        'GzulagP27qSUBYxIJfE04Q5/uYrowQbT9m6t7BFK\n' +
        '3egOO2xOKzLpYSqfbQIDAQAB',
        fail: (result) => {
          console.log(JSON.stringify(result))
          assert(true, " call getSystemInfo  ，加密key wrong ，fail callback ,返回:" + JSON.stringify(result), " call getSystemInfo  ，加密key wrong ，fail callback 出现异常");
          //assert(false, "异常", " call rsa  ，fail callback 出现异常");  
        },        
      });
    // assert(true, " call getSystemInfo  ，解密参数 wrong ，fail callback ", "异常");
    });


    ////设备-getSystemInfo////
    this.Qunit.test("getSystemInfo_01success", "getSystemInfo  success callback test ", function(assert){
      my.getSystemInfo({
        success: (res) => {
          console.log(JSON.stringify(res));
          assert((res.version != ""), " call getSystemInfo  ，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), " call getSystemInfo  ，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfo_02fail", "getSystemInfo  fail callback test ", function(assert){
      //assert(false, "结果pass", "结果fail");
      my.getSystemInfo({
        fail: (res) => {
          assert(false, "异常", " call getSystemInfo  ，出现异常， call 了fail");
        },
      });
      assert(true, " call getSystemInfo  ，不会 call fail", "异常");
    });

    this.Qunit.test("getSystemInfo_03complete", "getSystemInfo  complete callback test ", function(assert){
      //assert(false, "结果pass", "结果fail");
      my.getSystemInfo({
        complete: (res) => {
          assert(true, " call getSystemInfo  ，可以正常complete callback ", " call getSystemInfo  ，无法正常complete callback ");
        },
      });
    });


    ////设备-getSystemInfoSync////
    this.Qunit.test("getSystemInfoSync_01success", "getSystemInfoSync  success callback test ", function(assert){
     my.getSystemInfo({
        success: (res) => {
          console.log(JSON.stringify(res))
          assert((res.version != ""), " call getSystemInfoSync  ，可以正常获取到version值，正常success callback ，返回:" + JSON.stringify(res), " call getSystemInfoSync  ，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getSystemInfoSync_02fail", "getSystemInfo  fail callback test ", function(assert){
      my.getSystemInfo({
        fail: (res) => {
          assert(false, "异常", " call getSystemInfoSync  ，出现异常， call 了fail");
        },
      });
      assert(true, " call getSystemInfoSync  ，不会 call fail", "异常");
    });

    this.Qunit.test("getSystemInfoSync_03complete", "getSystemInfo  complete callback test ", function(assert){
      my.getSystemInfo({
        complete: (res) => {
          assert(true, " call getSystemInfoSync  ，可以正常complete callback ", " call getSystemInfoSync  ，无法正常complete callback ");
        },
      });
    });

    ////设备-my.getNetworkType////
    this.Qunit.test("getNetworkType_01success", "getNetworkType  success callback test ", function(assert){
      my.getNetworkType({
        success: (res) => {
          console.log(JSON.stringify(res))
          assert((res.networkType != ""), " call getNetworkType  ，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), " call getNetworkType  ，无法获取到返回值，success callback 失败");
        },
      });
    });
    
    this.Qunit.test("getNetworkType_02fail", "getNetworkType  fail callback test ", function(assert){
      //assert(false, "结果pass", "结果fail");
      my.getNetworkType({
        fail: (res) => {
          assert(false, "异常", " call getNetworkType  ，出现异常， call 了fail");
        },
      });
    assert(true, " call getNetworkType  ，不会 call fail", "异常");
    });

    this.Qunit.test("getNetworkType_03complete", "getNetworkType  complete callback test ", function(assert){
      my.getNetworkType({
        complete: (res) => {
          assert(true, " call getNetworkType  ，可以正常complete callback ", " call getNetworkType  ，无法正常complete callback ");
        },
      });
    });


    ////设备-获取服务时间////
    this.Qunit.test("getServerTime_01获取服务器时间", "getServerTime  success callback test ", function(assert){
      //assert(false, "结果pass", "结果fail");
      my.getServerTime({
        success: (res) => {
        console.log(res.time)
        assert((res.time != ""), " call getServerTime  ，可以正常获取到返回值，正常success callback ，返回:"+JSON.stringify(res), " call getServerTime  ，无法获取到返回值，success callback 失败");                  
        },
      });                   
    });

    ////设备-剪切板////
    this.Qunit.test("getClipbboard_01剪贴板success", "getClipboard  success callback test ", function(assert){
      //assert(false, "结果pass", "结果fail");
      my.setClipboard({
        text: '3.1415926', // 剪贴板数据
        success: (res) => {                  
        },
      });
      my.getClipboard({
        success: (res) => {
          console.log(JSON.stringify(res))
          res.text == undefined
          assert((res.text != ""), " call getClipboard  ,可以正常获取到返回值,正常success callback ,返回:" + JSON.stringify(res), " call getClipboard  ，无法正常获得返回值，success callback 失败")
        },
      });
    });

    this.Qunit.test("getClipbboard_02剪贴板fail", "getClipboard  fail callback test ", function(assert){
      //assert(false, "结果pass", "结果fail");
      my.setClipboard({
        text: '3.1415926', // 剪贴板数据
        success: (res) => {                  
        },
      });      
      my.getClipboard({
        fail: (res) => {
          assert(false,"异常"," call getClipboard  ，出现异常， call 了fail");  
          },
      });
    assert(true, " call getClipboard  ，不会 call fail", "异常");
    });

    this.Qunit.test("getClipbboard_03剪贴板complete", "getClipboard  complete callback test ", function(assert){
      my.setClipboard({
        text: '3.1415926', // 剪贴板数据
        success: (res) => {                  
        },
      });      
      my.getClipboard({
        complete: (res) => {
          assert(true," call getClipboard  ，可以正常complete callback "," call getClipboard  ，无法正常complete callback ");  
          },
      });
    });

    ////位置-getLocation////

    this.Qunit.test("getLocation_01success(type:0)", "getLocation  success callback test ", function(assert){
      my.getLocation({
        cacheTimeout:30,
        type:0,
        success: (res) => {
          //my.hideLoading();
          console.log(JSON.stringify(res))
          assert((res.latitude != ""), " call getLocation  ，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), " call getLocation  ，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getLocation_02success(type:1)", "getLocation  success callback test ", function(assert){
      my.getLocation({
        cacheTimeout:30,
        type:1,
        success: (res) => {
          //my.hideLoading();
          console.log(JSON.stringify(res))
          assert((res.latitude != ""), " call getLocation  ，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), " call getLocation  ，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getLocation_03success(type:2)", "getLocation  success callback test ", function(assert){
      my.getLocation({
        cacheTimeout:30,
        type:2,
        success: (res) => {
          //my.hideLoading();
          console.log(JSON.stringify(res))
          assert((res.latitude != ""), " call getLocation  ，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), " call getLocation  ，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getLocation_04success不传参数", "getLocation  success callback test ", function(assert){
      my.getLocation({
        type:"",
        success: (res) => {          
          //my.hideLoading();
          console.log(JSON.stringify(res))
          assert((res.latitude != ""), " call getLocation  ，可以正常获取到返回值，正常success callback ，返回:" + JSON.stringify(res), " call getLocation  ，无法获取到返回值，success callback 失败");
        },
      });
    });

    this.Qunit.test("getLocation_05fail", "getLocation  fail callback test ", function(assert){   
      my.getSystemInfo({        
        fail: (res) => {
          assert(false, "异常", " call getLocation  ，出现异常， call 了fail");
        },
      });
    assert(true, " call getLocation  ，不会 call fail", "异常");
    });

    
    this.Qunit.test("getLocation_06complete", "getLocation  complete callback test ", function(assert){
        my.getSystemInfo({
        complete: (res) => {
          assert(true, " call getLocation  ，可以正常complete callback ", " call getLocation  ，无法正常complete callback ");
        },
      });
    });

    ////震动////
    this.Qunit.test("vibrate_01success", "vibrate  success callback test ", function(assert){
      my.vibrate({
      })
        assert(true, " call vibrate  ，可以正常success callback ", " call vibrate  ，无法正常complete callback ");    
      });
      
    // ////发起支付////

    // this.Qunit.test("tradePay_01参数 wrong ", "tradePay  success callback test ", function(assert){
    //   my.tradePay({
    //     orderStr: '1232', // 完整的支付参数拼接成的字符串，从服务端获取
    //     success: (res) => {   
    //       assert((res.resultCode != ""), " call tradePay  ，参数 wrong ，返回:"+res.resultCode, " call tradePay  ，参数 wrong ,success callback ");        
    //     },
    //   });
    // });

    // this.Qunit.test("tradePay_02参数为空", "tradePay  success callback test ", function(assert){
    //   my.tradePay({
    //     orderStr: '', // 完整的支付参数拼接成的字符串，从服务端获取
    //     success: (res) => {   
    //       assert(true, " call tradePay  ，参数为空，返回:"+res.resultCode, " call tradePay  ，参数为空,success callback ");        
    //     },
    //   });
    // });


//////////////// 用例结束 /////////////////////

//  let app = getApp();
    app.Q.setData = this.setData;
    app.Q.setData(app.Q.data);
  },
});
