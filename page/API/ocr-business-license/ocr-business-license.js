Page({
    data: {
        textArry: [],
        imgUrl: "https://gw.alipayobjects.com/zos/rmsportal/CLaHUdhxQUlVRnlFPisN.jpg"
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
            ocrType: 'ocr_business_license',
            path: url,
            success: (res) => {
                let data = JSON.parse(res.result.outputs[0].outputValue.dataValue);
                let {reg_num, person,business,captial,establish_date, name, address, valid_period}=data;
                this.setData({
                    imgUrl:url,
                    textArry: [
                        { title: 'Registration number', message: reg_num },
                        { title: 'Legal person', message: person },
                        { title: 'company name', message: name },
                        { title: 'address', message: address },
                        { title: 'Registration time', message: this.reData(establish_date) },
                        { title: 'Business term', message: this.reData(valid_period) },
                        { title: 'The registered capital', message: captial },
                        { title: 'business scope', message: business },

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
    reData(data) {
        return data.substring(0,4)+'year'+data.substring(4,6)+'month'+data.substring(6,8)+'day'
    },
    photoSubmit() {//点击上传
        my.chooseImage({
            count: 1,
            success: (res) => {
                this.callFn(res.apFilePaths[0]);
            },
        });
    },
    imageLoad(e){

    },
    imageError(e){

    }
});
