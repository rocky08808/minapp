import Chance from 'chance'

Page({
  data: {
    ctrMessage: '',
    cbcMessage: '',
    keyCtr: null,
    algoCtr: null,
    encodedCtr: '',
    keyCbc: null,
    algoCbc: null,
    encodedCbc: ''
  },
  onLoad() { },

  generateRandomNumber() {
    var array = new Uint32Array(1);
    crypto.getRandomValues(array);
    console.log(array[0]);

    this.setData({
      number: array[0]
    })
  },

  generateUUID() {
    var chance = new Chance();
    var uuid = chance.guid();
    this.setData({
      number: uuid
    })
  },

  async aesctrEncrypt() {
    // try {
    let plainText = "this is the plaintext";
    let bufferedMessage = new TextEncoder().encode(plainText);
    console.log('buffered message: ', bufferedMessage);
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const algoEncrypt = {
      name: 'AES-CTR',
      counter: iv,
      length: 128
    };
    let key = await this.generateAesctrKey();

    this.setData({
      keyCtr: key,
      algoCtr: algoEncrypt
    });

    let encoded = await crypto.subtle.encrypt(algoEncrypt, key, bufferedMessage);
    console.log('encoded: ', encoded);
    let encodedMessage = new TextDecoder().decode(encoded);
    console.log('encoded message: ', encodedMessage);
    this.setData({
      ctrMessage: encodedMessage,
      encodedCtr: encoded
    })
    // } catch (error) {
    //   console.log(error);
    // }
  },

  async aesctrDecrypt() {
    // try {
    console.log('message: ', this.data.encodedCtr);
    // const encodedBuffer = new TextEncoder().encode(this.data.cbcMessage);
    const decryptedBuffer = await crypto.subtle.decrypt(this.data.algoCtr, this.data.keyCtr, this.data.encodedCtr);
    const decryptedMessage = new TextDecoder().decode(decryptedBuffer);
    console.log('decrypted message: ', decryptedMessage);
    this.setData({
      ctrMessage: decryptedMessage
    });
    // } catch (error) {
    //   console.log(error);
    // }
  },

  async aescbcEncrypt() {

    try {
      my.alert({
        content: typeof (crypto) + ", " + JSON.stringify(crypto)
      });
      let plainText = "this is the plaintext";
      let bufferedMessage = new TextEncoder().encode(plainText);
      console.log('buffered message: ', bufferedMessage);
      const iv = crypto.getRandomValues(new Uint8Array(16));
      const algoEncrypt = {
        name: 'AES-CBC',
        iv
      };
      let key = await this.generateAescbcKey();

      this.setData({
        keyCbc: key,
        algoCbc: algoEncrypt
      })

      let encoded = await crypto.subtle.encrypt(algoEncrypt, key, bufferedMessage);
      console.log('encoded: ', encoded);
      let encodedMessage = new TextDecoder().decode(encoded);
      console.log('encoded message: ', encodedMessage);
      this.setData({
        cbcMessage: encodedMessage,
        encodedCbc: encoded
      })
    } catch (error) {
      console.log(error);
      my.alert({
        content: JSON.stringify('error: ', error)
      });
    }
  },

  async aescbcDecrypt() {
    try {
      console.log('message: ', this.data.encodedCbc);
      // const encodedBuffer = new TextEncoder().encode(this.data.cbcMessage);
      const decryptedBuffer = await crypto.subtle.decrypt(this.data.algoCbc, this.data.keyCbc, this.data.encodedCbc);
      const decryptedMessage = new TextDecoder().decode(decryptedBuffer);
      console.log('decrypted message: ', decryptedMessage);
      this.setData({
        cbcMessage: decryptedMessage
      });
    } catch (error) {
      console.log(error);
    }
  },

  async generateAesctrKey() {
    const algoKeyGen = {
      name: 'AES-CTR',
      length: 128
    };

    const keyUsages = [
      'encrypt',
      'decrypt'
    ];
    let key = await crypto.subtle.generateKey(algoKeyGen, false, keyUsages);
    console.log('key: ', key);
    return key;
  },

  async generateAescbcKey() {
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const algoKeyGen = {
      name: 'AES-CBC',
      length: 256
    };

    const keyUsages = [
      'encrypt',
      'decrypt'
    ];
    let key = await crypto.subtle.generateKey(algoKeyGen, true, keyUsages);
    console.log('key: ', key);
    return key;
  },

  encodeMessage(message) {
    return new TextEncoder().encode(message);
  },

  decodeMessage(message) {
    return new TextDecoder().decode(message);
  }

});

