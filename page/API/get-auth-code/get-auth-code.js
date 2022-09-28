Page({
  onLoad() {
    my.setNavigationBar({
      title: 'hello',
      backgroundColor: '#108ee9',
      // backgroundColor: '#EC0215',
      // backgroundColor: '#FFFFF',
      success() {
        // my.alert({
        //   content: 'Success',
        // });
      },
      fail() {
        // my.alert({
        //   content: 'Failed',
        // });
      },
    });
  },
  data: {
    scopes: ''
  },
  getAuthCode1() {
    my.getAuthCode({
      scopes: ['auth_base'],
      success: ({ authCode }) => {
        my.alert({
          content: authCode,
        });
      },
      fail: (error) => {
        my.alert({
          content: 'Error: ' + error,
        });
      }
    });
  },
  getAuthCode2() {
    my.getAuthCode({
      scopes: ['auth_user'],
      success: ({ authCode }) => {
        my.alert({
          content: authCode,
        });
      },
      fail: (error) => {
        console.log('cancel error');
        my.alert({
          content: 'Error: ' + JSON.stringify(error),
        });
      }
    });
  },
  getAuthCode3() {
    my.getAuthCode({
      scopes: ['auth_user', 'USER_NAME', 'USER_NICKNAME', 'USER_BIRTHDAY'],
      success: ({ authCode }) => {
        my.alert({
          content: authCode,
        });
      },
      fail: (error) => {
        console.log('cancel error');
        my.alert({
          content: 'Error: ' + JSON.stringify(error),
        });
      }
    });
  },

  getAuthCode4() {
    my.getAuthCode({
      scopes: ['auth_user'],
      success: ({ authCode }) => {
        my.alert({
          title: 'Auth Code',
          content: authCode,
          success: () => {
            my.request({
              url: 'https://vodapay-finmock.vfs.africa/mock/api/v2/authorizations/StandardMobileWalletApplyToken.htm',
              method: 'POST',
              headers: {
                "env": "SANDBOX"
              },
              data: {
                data: {
                  "grantType": "AUTHORIZATION_CODE",
                  "authCode": authCode
                },
              },
              timeout: 30000,
              dataType: 'json',
              success: (result) => {
                console.log(result);
                my.alert({
                  content: 'Token: ' + result.data.accessToken
                });
              },
              fail: (error) => {
                console.log('failed');
                console.log(error);
                my.alert({
                  content: 'Error: ' + JSON.stringify(error),
                });
              },
              complete: () => {
                console.log('completed')
              }
            });
          },
          fail: (error) => {
            my.alert('Get auth code error: ' + error);
          },
          complete: () => {

          }
        });
      },
      fail: (error) => {
        my.alert({
          content: 'Error: ' + error,
        });
      }
    });
  },

  onScopeInput(e) {
    this.setData({
      scopes: e.detail.value
    });
  },

  getAuthCode5() {
    let scopes = this.data.scopes.split(',');
    console.log('scopes: ', scopes)
    my.getAuthCode({
      scopes: scopes,
      success: ({ authCode }) => {
        my.alert({
          content: authCode,
        });
      },
      fail: (error) => {
        console.log('cancel error');
        my.alert({
          content: 'Error: ' + JSON.stringify(error),
        });
      }
    });
  },
});
