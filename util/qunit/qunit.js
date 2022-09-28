let app = getApp();
idx: -1;
export function test(name, desc, callback) {
  app.Q.data.tests.push({
    name: name,
    desc: desc,
    result: "untest",
    info: "",
    status: "hide"
  });

  app.Q.funcs.cblist.push({
    callback: callback
  });

  app.Q.data.total += 1;
}

export function run(idx) {
  let running = true;
  // let app = getApp();
  let lastResult = app.Q.data.tests[idx].result;
  app.Q.data.tests[idx].result = "run";
  app.Q.data.tests[idx].info = "";
  app.Q.setData(app.Q.data);

  let assert = function (condition, trueMsg, falseMsg) {
    if (condition) {
      app.Q.data.tests[idx].result = "pass";
      app.Q.data.tests[idx].info = trueMsg;
    } else {
      app.Q.data.tests[idx].result = "fail";
      app.Q.data.tests[idx].info = falseMsg;
    }

    app.Q.update(condition, lastResult);
    app.Q.setData(app.Q.data);
    running = false;
  };
  app.Q.funcs.cblist[idx].callback(assert);
};

export function runAll() {
  // let app = getApp();

  for (let i = app.Q.data.tests.length - 1; i >= 0; i--) {
    if (app.Q.data.tests[i].type != "manual") {
      run(i);
    }
  };
};

export function onItemTap(event){
    // let app = getApp();
    let idx = event.currentTarget.id;

    if(app.Q.data.tests[idx].status == "show"){
      app.Q.data.tests[idx].status = "hide";
    }else{
      app.Q.data.tests[idx].status = "show";
    };

    this.setData(app.Q.data);
  }