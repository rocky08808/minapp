Page({
  data: {
   
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
  onRunTap(event) {
    let idx = event.currentTarget.id;
    this.Qunit.run(idx);
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
  
    ///////////参数校验////////////

    this.Qunit.test("警示框_正常场景", "alert接口success callback测试", function (assert) {
      my.alert({
        title: 'Dear',
        content: 'Your bill for this month has been released',
        buttonText: 'I know',
        success: () => {
          assert(true, "调用alert接口，success回调成功" , "");
        },
        fail: () => {
          assert(false, "" , "调用alert接口，场景正常，错误调用了fail");
        },
      });
    });

    this.Qunit.test("警示框_空字符串", "alert接口fail callback测试", function (assert) {
      my.alert({
        title: "",
        content: "",
        buttonText: "",
        success: () => {
          assert(false, "" , "调用alert接口，参数为空字符串，错误调用了success");
        },
        fail: () => {
          // console.log(JSON.stringify(res))
          assert(true, "调用alert接口，参数为空字符串，fail回调" , "");
        },
      });
    });
  
    this.Qunit.test("警示框_null", "alert接口fail callback测试", function (assert) {
      my.alert({
        title: null,
        content: null,
        buttonText: null,
        success: () => {
          assert(false, "" , "调用alert接口，参数为null，错误调用了success");
        },
        fail: () => {
          assert(true, "调用alert接口，参数为null，fail回调" , "");
        },
      });
    });
  
    this.Qunit.test("警示框_数字", "alert接口fail callback测试", function (assert) {
      my.alert({
        title: 123,
        content: 123,
        buttonText: 123,
        success: () => {
          assert(false, "" , "调用alert接口，参数为数字，错误调用了success");
        },
        fail: () => {
          assert(true, "调用alert接口，参数为数字，fail回调" , "");
        },
      });
    });
  
    this.Qunit.test("警示框_数组", "alert接口fail callback测试", function (assert) {
      my.alert({
        title: [11,12,13,15],
        content: [11,12,13,15],
        buttonText: [11,12,13,15],
        success: () => {
          assert(false, "" , "调用alert接口，参数为数组，错误调用了success");
        },
        fail: () => {
          assert(true, "调用alert接口，参数为数组，fail回调" , "");
        },
      });
    });
  
    // this.Qunit.test("警示框_中文", "alert接口fail callback测试", function (assert) {
    //   my.alert({
    //     title: 你好,
    //     content: 你好,
    //     buttonText: 你好,
    //     success: () => {
    //       assert(false, "" , "调用alert接口，参数为中文，错误调用了success");
    //     },
    //     fail: () => {
    //       assert(true, "调用alert接口，参数为中文，fail回调" , "调用alert接口，参数为中文，无法完成fail回调");
    //     },
    //   });
    // });


    //////////////// 参数校验结束 /////////////////////
    app.Q.setData = this.setData;
    app.Q.setData(app.Q.data);
  },
});
