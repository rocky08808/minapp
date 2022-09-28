Page({
  data: {
    tradeNo: '',
    orderStr: '',
    paymentUrl: 'http://alibaba.com',
    errorMsg: '',
    mpHost: 'localhost:3000',
  },

  onLoad() {
    // by default paste the first message from clipboard as paymentUrl
    my.getClipboard({
      success: ({ text }) => {
        if (text) {
          this.setData({ paymentUrl: text });
        }
      },
    });
  },

  onTradeNoUpdate(e) {
    this.setData({
      tradeNo: e.detail.value,
    });
  },

  onOrderStrUpdate(e) {
    this.setData({
      orderStr: e.detail.value,
    });
  },

  onPaymentUrlUpdate(e) {
    this.setData({
      paymentUrl: e.detail.value,
    });
  },

  bindHostUrl(e) {
    this.setData({
      mpHost: e.detail.value
    })
  },

  trandeNoTradePay() {
    console.log('tradeNo pay');
    if (this.data.tradeNo) {
      this.setErrorMessage('')
    } else {
      this.setErrorMessage('Please input tradeNo.')
      return
    }

    my.tradePay({
      tradeNo: this.data.tradeNo,
      success: (res) => {
        my.alert({
          content: JSON.stringify(res),
        });
      },
      fail: (res) => {
        my.alert({
          content: JSON.stringify(res),
        });
      },
    });
  },

  orderStrTradePay() {
    if (this.data.orderStr) {
      this.setErrorMessage('')
    } else {
      this.setErrorMessage('Please input orderStr.')
      return
    }
    my.tradePay({
      orderStr: this.data.orderStr, //完整的支付参数拼接成的字符串，从服务端获取，具体是方法请参考小程序开发文档
      success: (res) => {
        my.alert({
          content: JSON.stringify(res),
        });
      },
      fail: (res) => {
        my.alert({
          content: JSON.stringify(res),
        });
      },
    });
  },

  paymentUrlTradePay() {
    if (this.data.paymentUrl) {
      this.setErrorMessage('')
    } else {
      this.setErrorMessage('Please input paymentUrl.')
      return
    }
    my.tradePay({
      paymentUrl: this.data.paymentUrl,
      success: (res) => {
        my.alert({
          content: JSON.stringify(res),
        });
      },
      fail: (res) => {
        my.alert({
          content: JSON.stringify(res),
        });
      },
    });
  },

  mockTradePay() {
    my.request({
      url: 'http://' + this.data.mpHost + '/api/payment/request-pay',
      headers: {},
      method: 'POST',
      data: {
        userId: 1000,
        productId: 123
      },
      timeout: 30000,
      dataType: 'json',
      success: (result) => {
        console.log(result);
        if (!result.data.actionForm) {
          return
        }
        // my.alert({
        //   content: 'redirect url: ' + result.data.actionForm.redirectionUrl
        // });
        console.log('redirect url: ' + result.data.actionForm.redirectionUrl);
        my.tradePay({
          // orderStr: 'xxx', //完整的支付参数拼接成的字符串，从服务端获取，具体是方法请参考小程序开发文档
          // tradeNo: 'tradenumber123',
          paymentUrl: result.data.actionForm.redirectionUrl,
          success: (res) => {
            my.alert({
              content: JSON.stringify(res),
            });
          },
          fail: (res) => {
            my.alert({
              content: JSON.stringify(res),
            });
          },
        });
      },
      fail: (error) => {
        console.log(error);
        my.alert({
          content: 'Request for payment failed.'
        });
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  },

  payWithOpenAPI() {
    my.request({
      url: 'http://13.244.206.48:28113/mock/api/v1/payments/pay.htm',
      headers: {
        "Content-Type": "application/json",
        "Client-Id": "305XST2CSG0N4P05595",
        'Request-Time': '2020-11-11T11:58:33+08:00',
        "Signature": 'iL1jUKlByuUAKqR5vto85lfiq7yygTZaXBv6o9OLOB6vfwbnHU1Y3lHrbudLJuy7mVYs/r26+cuL3638gdLGeJHRoigqMMWKpHMn+zCJlHrrsMXJXvy/hQQ3/DExhBjTALR6Tc1fsI/3+k7aHl/aDuWmMIF1Nm7Lfyp+g8ahyrJv19lkiW9YPrd8tcJ7P6+qOGJ1XBm0meUT0GIiTYrs1hETE+9eEYcMFUZF0p8PGv9wXEepf/RxybQIaMRj2shmlk8Dcd2AMl1vwDW76K/uz3woDtTwpgRN5Zch9Ky/9oYf1o7Q8Rd77V+txeQdInylM0OPBBM4jvg/rWmiv3eKWg==',
      },
      method: 'POST',
      data: {
        "partnerId": "P000000000000001",
        "paymentRequestId": "",
        "paymentOrderTitle": "",
        "productCode": "",
        "mcc": "4399",
        "paymentAmount": {
          "currency": "USD"
        },
        "paymentFactor": {
          "isCashierPayment": true
        },
        "paymentReturnUrl": "https://www.merchant.com/redirectxxx",
        "paymentNotifyUrl": "https://www.merchant.com/paymentNotifyxxx",
        "extraParams": {},
        "extendInfo": "{\"customerBelongsTo\":\"Vodacom\"}",
        "envInfo": {
          "terminalType": "APP"
        }
      },
      timeout: 30000,
      dataType: 'json',
      success: (result) => {
        console.log(result);
        if (!result.data.actionForm) {
          return
        }
        // my.alert({
        //   content: 'redirect url: ' + result.data.actionForm.redirectionUrl
        // });
        console.log('redirect url: ' + result.data.actionForm.redirectionUrl);
        my.tradePay({
          // orderStr: 'xxx', //完整的支付参数拼接成的字符串，从服务端获取，具体是方法请参考小程序开发文档
          // tradeNo: 'tradenumber123',
          paymentUrl: result.data.actionForm.redirectionUrl,
          success: (res) => {
            my.alert({
              content: JSON.stringify(res),
            });
          },
          fail: (res) => {
            my.alert({
              content: JSON.stringify(res),
            });
          },
        });
      },
      fail: (error) => {
        console.log(error);
        my.alert({
          content: 'Request for payment failed.'
        });
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  },

  setErrorMessage(message) {
    this.setData({
      errorMsg: message
    })
  }
})