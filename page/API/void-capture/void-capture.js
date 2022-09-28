// const BASE_URL = "http://100.64.14.229";
// const BASE_URL = "https://finmock.vodapay.vodacom.co.za";
const BASE_URL = "https://vodapay-finmock.vfs.africa";

const AUTH = "/mock/api/v2/authorizations/StandardMobileWalletApplyToken.htm";
const CREATOR_ORDER = "/mock/api/authCaptureMiniApp/createOrder.htm";
const CAPTURE = "/mock/api/authCaptureMiniApp/capture.htm";
const VOID = "/mock/api/authCaptureMiniApp/void.htm";

Page({
  data: {
    products: [
      {
        id: 0,
        name: "New Men Polo Fashion",
        description:
          "MIACAWOR New Men Polo Fashion Print Polo Shirt Me Spring Long sleeve Casual Man Polo T693",
        price: 100,
        image: "/image/cloth.jpg",
        count: 1
      },
      {
        id: 1,
        name: "Half Sleeve Crane",
        description:
          "Loldeal Summer Half Sleeve Crane Printing Dress Shirt Men V Neck Loose Style Casual Shirt",
        price: 10,
        image: "/image/cloth_2.jpeg",
        count: 1
      },
      {
        id: 2,
        name: "Korean Fashion T-Shirt",
        description: "Korean style fashion T-Shirt 2020 new version.",
        price: 1,
        image: "/image/cloth_1.jpg",
        count: 1
      }
    ],
    totalPrice: 111,
    env: 4,
    envList: ["SIT", "TEST1", "TEST2", "TEST4", "PROD", "SANDBOX", "TEST3"],
    loading: false,

    // new createOrder data
    orderData: {},
    tradePaySuccess: false,
    captureLoading: false,
    voidLoading: false,

    terminalTypes: ['', 'MINI_APP', 'MINI_APP_MERCHANT'],
    terminalTypeIdx: 0,
    terminalType: ''
  },
  onLoad() {
    const { terminalType } = getApp().globalData
    // my.alert({ content: "terminalType:" + terminalType });
    if (terminalType) {
      this.setData({
        terminalType
      })
      const idx = this.data.terminalTypes.indexOf(terminalType)
      if (idx !== -1) {
        this.setData({
          terminalTypeIdx: idx
        })
      }
    }
  },
  onChangeEnv() {
    var env = this.data.env + 1;
    if (env >= this.data.envList.length) {
      env = 0;
    }
    this.setData({ env: env });
  },
  onChangeStartParams() {
    var curr = this.data.terminalTypeIdx + 1;
    if (curr >= this.data.terminalTypes.length) {
      curr = 0;
    }
    this.setData({ terminalTypeIdx: curr, terminalType: this.data.terminalTypes[curr] });
  },
  onProductCountChange(productId, count) {
    let products = this.data.products;
    products[productId].count = count;
    this.setData({ products: products });

    this.updateTotalAmount();
  },
  updateTotalAmount() {
    var sum = 0;
    this.data.products.forEach(product => {
      sum += product.price * product.count;
    });
    this.setData({
      totalPrice: sum
    });
  },
  onPlaceOrder() {
    // call mp backend to create order
    console.log("On Purchase");

    this.setData({ loading: true, orderData: {}, tradePaySuccess: false });
    // this.createOrder('216610000001419017889');
    // 1. get user id
    // const scopes = this.data.terminalType && this.data.terminalType === 'MINI_APP_MERCHANT' ? ["MERCHANT_ID"] : ["auth_base"]
    let scopes = ["auth_base"]
      if (this.data.terminalType && this.data.terminalType === 'MINI_APP_MERCHANT') {
  scopes = ["MERCHANT_ID"] 
}
    my.getAuthCode({
      scopes: scopes,
      success: ({ authCode }) => {
        // 2. apply token
        console.log("auth code: ", authCode);
        if (!authCode) {
          my.alert({ content: "Get auth code error, auth code:" + authCode });
          this.setData({ loading: false });
          return;
        }
        my.request({
          url: `${BASE_URL}${AUTH}`,
          method: "POST",
          headers: {
            env: this.data.envList[this.data.env]
          },
          data: {
            grantType: "AUTHORIZATION_CODE",
            authCode: authCode
          },
          timeout: 30000,
          dataType: "json",
          success: result => {
            console.log("result: ", result);
            if (result.data.customerId) {
              this.createOrder(result.data.customerId);
            } else {
              this.setData({ loading: false });
              my.alert({
                content: "Get user id error: " + JSON.stringify(result.data)
              });
            }
          },
          fail: error => {
            this.setData({ loading: false });
            my.alert({
              content: "Apply token error: " + JSON.stringify(error)
            });
          }
        });
      },
      fail: error => {
        this.setData({ loading: false });
        my.alert({ content: "Get auth code error: " + JSON.stringify(error) });
      }
    });
  },
  createOrder(userId) {
    console.log("create order: ", userId);
    my.showToast({
      content: "create order: " + userId
    });
    const params = {
      userId: userId + "",
      amount: this.data.totalPrice + ""
    }
    
    // if (this.data.terminalType) {
    //   params.terminalType = this.data.terminalType
    // }
    if (this.data.terminalType=='MINI_APP_MERCHANT') {
      // params.terminalType = this.data.terminalType
      params.orderType="BUSINESS"
    }

    my.request({
      url: `${BASE_URL}${CREATOR_ORDER}`,
      method: "POST",
      headers: {
        env: this.data.envList[this.data.env]
      },
      data: params,
      dataType: "json",
      success: result => {
        console.log("result: ", result);
        if (result.data && result.data.result.resultCode === "ACCEPT") {
          my.showToast({
            content: "create order success"
          });
          this.setData({
            orderData: { ...result.data }
          });
          const { redirectUrl } = result.data.redirectActionForm;
          if (redirectUrl) {
            my.tradePay({
              paymentUrl: redirectUrl,
              success: res => {
                this.setData({
                  loading: false
                });
                if (res.resultCode === "9000") {
                  this.setData({
                    tradePaySuccess: true
                  });
                }
                my.alert({
                  content: "tradePay success: " + JSON.stringify(res)
                });
              },
              fail: err => {
                this.setData({
                  loading: false
                });
                my.alert({
                  content: "tradePay error: " + JSON.stringify(err)
                });
              },
              complete: () => {}
            });
          }
        } else {
          this.setData({
            orderData: {},
            loading: false
          });
          my.alert({
            content: "create order failed: " + JSON.stringify(result.data)
          });
        }
      },
      fail: error => {
        this.setData({ loading: false });
        my.alert({
          content: "create order failed: " + JSON.stringify(error)
        });
        console.log("my.request failed: ", JSON.stringify(error));
      },
      complete: () => {
        console.log("my.request complete");
      }
    });
  },
  // Capture
  handleCapture() {
    const { paymentId } = this.data.orderData;
    this.setData({
      captureLoading: true
    });
    my.request({
      url: `${BASE_URL}${CAPTURE}`,
      headers: {
        env: this.data.envList[this.data.env]
      },
      data: {
        paymentId
      },
      method: "POST",
      timeout: 30000,
      dataType: "json",
      success: result => {
        console.log("result", result);
        this.setData({
          captureLoading: false
        });
        my.alert({
          content: JSON.stringify(result.data)
        });
      },
      fail: e => {
        this.setData({
          captureLoading: false
        });
        console.log("my.request failed: " + JSON.stringify(e));
        my.alert({
          content: "Capture error: " + JSON.stringify(e)
        });
      },
      complete: () => {
        console.log("Request completed");
      }
    });
  },
  // Void
  handleVoid() {
    const { paymentId } = this.data.orderData;
    this.setData({
      voidLoading: true
    });
    my.request({
      url: `${BASE_URL}${VOID}`,
      headers: {
        env: this.data.envList[this.data.env]
      },
      data: {
        paymentId
      },
      method: "POST",
      timeout: 30000,
      dataType: "json",
      success: result => {
        console.log("result", result);
        this.setData({
          voidLoading: false
        });
        my.alert({
          content: JSON.stringify(result.data)
        });
      },
      fail: e => {
        this.setData({
          voidLoading: false
        });
        console.log("my.request failed: " + JSON.stringify(e));
        my.alert({
          content: "Void error: " + JSON.stringify(e)
        });
      },
      complete: () => {
        console.log("Request completed");
      }
    });
  }
});
