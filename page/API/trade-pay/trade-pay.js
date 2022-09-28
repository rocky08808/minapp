Page({
  data: {
    products: [
      {
        id: 0,
        name: "New Men Polo Fashion",
        description: "MIACAWOR New Men Polo Fashion Print Polo Shirt Me Spring Long sleeve Casual Man Polo T693",
        price: 100,
        image: "/image/cloth.jpg",
        count: 1
      },
      {
        id: 1,
        name: "Half Sleeve Crane",
        description: "Loldeal Summer Half Sleeve Crane Printing Dress Shirt Men V Neck Loose Style Casual Shirt",
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
    env: 7, // SIT / TEST1 / TEST2 / PROD
    envList: ['SIT', 'TEST1', 'TEST2', 'TEST3', 'TEST4', 'SANDBOX', 'PRE', 'PROD'],
    // This part need to be updated for each wallet
    serverConfig: {
      // production endpoints
      // authUrl: 'http://100.64.14.229/mock/api/v2/authorizations/StandardMobileWalletApplyToken.htm',
      // createOrderUrl: 'http://100.64.14.229/mock/api/v2/authorizations/StandardMobileWalletPaymentsPay.htm'

      // dev env endpoints
      authUrl: 'https://vodapay-finmock.vfs.africa/mock/api/v2/authorizations/StandardMobileWalletApplyToken.htm',
      createOrderUrl: 'https://vodapay-finmock.vfs.africa/mock/api/v2/authorizations/StandardMobileWalletPaymentsPay.htm'
        // authUrl: 'https://finmock.vodapay.vodacom.co.za/mock/api/v2/authorizations/StandardMobileWalletApplyToken.htm',
        // createOrderUrl: 'https://finmock.vodapay.vodacom.co.za/mock/api/v2/authorizations/StandardMobileWalletPaymentsPay.htm'
    },
    loading: false,
    temrinalType: ''
  },
  onLoad() {
    console.log(getCurrentPages());

    const { terminalType } = getApp().globalData
    if (terminalType) {
      this.setData({
        terminalType: terminalType
      })
    }
  },

  onChangeEnv() {
    var env = this.data.env + 1;
    if (env >= this.data.envList.length) {
      env = 0;
    }
    this.setData({ env: env });
  },

  onProductCountChange(productId, count) {
    let products = this.data.products
    products[productId].count = count
    this.setData({ products: products })

    this.updateTotalAmount()
  },

  onPlaceOrderTest() {
    my.tradePay({
      paymentUrl: "https://m-sd.tngdigital.com.my/s/cashier/index.html?bizNo=20210205111212800110171548500921352&timestamp=1612492156219&merchantId=217120000000384647663&sign=cbrIMAVcX46CEsp125bn11%252FE%252B5NCitNnhBzArcKbP%252FhdIWlODY2Jcuu%252FxyDOP9wwNwLI89yOmabfx3FysLcNno6u9%252FwwUnOpwOf62ggJT%252F%252BrMGdBtlOkC9hfT3ykmoq7UqY0Y6x%252BF%252FwFT76rZzXdqomOOhS3owLdCEhXuyNvmem2G9YoyfbiI8QFQcntWVBPE%252BdzpH79o3SJsVT0E0WOkFxxNTOKZO1Cfjl37PH2LY%252F9xHBz%252Bh2DKiv3%252BicC7xD3l2aMCdlQKxnQM%252Baqo2iwEGfSme54a5%252Bm8m1a0RGqLmBOUJJ%252BZJG%252FFnJZlQ4iWHFjZW3hplH19D8twKe3SrJNIg%253D%253D", // get the tradeNo from the server first
      success: (res) => {
        my.redirectTo({
          url: '/pages/payment-result/payment-result'
        });
        my.alert({
          content: JSON.stringify(res),
        });
      },
      fail: (res) => {
        my.redirectTo({
          url: '/pages/payment-result/payment-result'
        });
        my.alert({
          content: JSON.stringify(res),
        });
      },
      complete: () => {
        this.setData({ loading: false });
      }
    });
  },

  onPlaceOrder() {
    // call mp backend to create order
    console.log('On Purchase');

    // my.showLoading();
    const page = this;
    this.setData({ loading: true });

    var scope = 'auth_base';
    if (this.data.terminalType === 'MINI_APP_MERCHANT') {
      scope = 'MERCHANT_ID';
    }

    // 1. get user id
    my.getAuthCode({
      scopes: scope,
      success: ({ authCode }) => {
        // 2. apply token
        console.log('auth code: ', authCode);
        my.request({
          url: this.data.serverConfig.authUrl,
          method: 'POST',
          headers: {
            "env": this.data.envList[this.data.env]
          },
          data: {
            "grantType": "AUTHORIZATION_CODE",
            "authCode": authCode
          },
          timeout: 30000,
          dataType: 'json',
          success: (result) => {
            console.log('result: ', result);
            this.createOrder(result.data.customerId);
          },
          fail: (error) => {
            // my.hideLoading();
            this.setData({ loading: false });
            my.alert({ content: 'Apply token error: ' + JSON.stringify(error) });
          }
        })
      },
      fail: (error) => {
        // my.hideLoading();
        this.setData({ loading: false });
        my.alert({ content: 'Get auth code error: ' + JSON.stringify(error) });
      },
    });
  },

  createOrder(userId) {
    console.log('create order: ', userId);
    my.showToast({
      content: "create order: " + userId,
    })

    const params = {
      userId: userId + "",
      amount: this.data.totalPrice + ""

    }

    if (this.data.terminalType=='MINI_APP_MERCHANT') {
      // params.terminalType = this.data.terminalType
      params.orderType="BUSINESS"
    }

    my.showToast({
      content: 'request: ' + JSON.stringify(params)
    });

    my.request({
      url: this.data.serverConfig.createOrderUrl,
      method: 'POST',
      headers: {
        "env": this.data.envList[this.data.env]
      },
      data: params,
      dataType: 'json',
      success: (result) => {
        console.log('get request result: ', result)
        my.showToast({
          content: "create order success",
        })

        let { paymentId, redirectActionForm } = result.data

        // my.hideLoading();
        if (redirectActionForm.redirectUrl) {
          this.setData({ loading: false });
          my.tradePay({
            paymentUrl: redirectActionForm.redirectUrl, // get the tradeNo from the server first
            success: (res) => {
              my.redirectTo({
                url: '/pages/payment-result/payment-result'
              });
              my.alert({
                content: JSON.stringify(res),
              });
            },
            fail: (res) => {
              my.redirectTo({
                url: '/pages/payment-result/payment-result'
              });
              my.alert({
                content: JSON.stringify(res),
              });
            },
            complete: () => {
              this.setData({ loading: false });
            }
          });
        }
      },
      fail: (error) => {
        // my.hideLoading();
        this.setData({ loading: false });
        my.alert({
          content: 'create order failed: ' + JSON.stringify(error),
        });
        console.log('my.request failed: ', JSON.stringify(error))
      },
      complete: () => {
        console.log('my.request complete')
      }
    });
  },

  updateTotalAmount() {
    var sum = 0;
    this.data.products.forEach(product => {
      sum += product.price * product.count
    })
    this.setData({
      totalPrice: sum
    });
  }
});
