Page({
    data: {
        textArry: [],
        imgUrl: "https://gw.alipayobjects.com/zos/rmsportal/bqeolZyhDKKJwGsgeHtm.jpg"
    },
    onLoad() {
        this.callFn(this.data.imgUrl);
    },
    callFn(url){
        my.showLoading({
            content: 'Loading...',
            delay: 100,
        });
        my.ocr({
            ocrType: 'ocr_idcard',
            side: 'face',
            path: url,
            success: (res) => {
                let data = JSON.parse(res.result.outputs[0].outputValue.dataValue);
                let {name, sex, nationality, birth, address, num}=data;
                this.setData({
                    imgUrl:url,
                    textArry: [
                        {title: 'name', message: name},
                        {title: 'sex', message: sex},
                        {title: 'nationality', message: nationality},
                        {title: 'birth', message: this.reData(birth)},
                        {title: 'address', message: address},
                        {title: 'Identity number', message: num}
                    ],
                });
                my.hideLoading();
            },
            fail: (res) => {
                my.hideLoading();

                my.alert({
                    title:'fail',
                    content:JSON.stringify(res),
                });
            },

        });
    },
    photoSubmit() {//点击上传
        my.chooseImage({
            count: 1,
            success: (res) => {
                this.callFn(res.apFilePaths[0]);
            },
        });
    },
    reData(data) {
        return data.substring(0,4)+'year'+data.substring(4,6)+'month'+data.substring(6,8)+'day'
    },
    imageLoad(e){

    },
    imageError(e){

    }
});
