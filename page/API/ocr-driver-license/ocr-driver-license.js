Page({
    data: {
        textArry: [],
        imgUrl: "https://gw.alipayobjects.com/zos/rmsportal/VSYVmTFPyVyNlxYvRGBJ.jpg"
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
            ocrType: 'ocr_driver_license',
            side:'face',
            path: url,
            success: (res) => {
                let data = JSON.parse(res.result.outputs[0].outputValue.dataValue);
                let {num, name,sex,addr, start_date, vehicle_type, end_date}=data;
                this.setData({
                    imgUrl:url,
                    textArry: [
                        { title: 'num', message: num },
                        { title: 'name', message: name },
                        { title: 'sex', message: sex},
                        { title: 'address', message: addr},
                        { title: 'vehicle_type', message: vehicle_type },
                        { title: 'Start date', message: this.reData(start_date) },
                        { title: 'Effective date', message: end_date },
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
