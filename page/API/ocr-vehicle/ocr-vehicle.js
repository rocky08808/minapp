Page({
    data: {
        textArry: [
            { title: 'License plate number', message: '浙BC9188' },

            { title: 'Vehicle Type', message: 'car' },
            { title: 'Everyone',   message: 'XiaoBao' },
            { title: 'address', message: 'Lane 88, Yuanding Street, Jiangdong District, Ningbo, Zhejiang, China' },
            { title: 'Nature of use', message: 'Rental to non-transfer' },
            { title: 'Brand model number', message: 'Santana SVW7180LE1' },

            { title: 'Identification code', message: 'LSVAU033661234567' },
            { title: 'Engine no.', message: '0009827' },
            { title: 'Registration date', message: 'July 21, 2006' },
            { title: 'Date of issue', message: 'July 08, 2013' },
        ],
        imgUrl: "https://gw.alipayobjects.com/zos/rmsportal/xyWhFGfKPgIlwMtztXnf.jpg"
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
            ocrType: 'ocr_vehicle',
            path: url,
            success: (res) => {
                console.log('res', res);
                let data = JSON.parse(res.result.outputs[0].outputValue.dataValue);
                let {plate_num, addr, vehicle_type, owner, use_character, model, vin, engine_num, register_date, issue_date}=data;
                this.setData({
                    imgUrl:url,
                    textArry: [
                        { title: 'plate number', message: plate_num },
                        { title: 'Vehicle Type', message: vehicle_type },
                        { title: 'Everyone',   message: owner },
                        { title: 'address', message: addr },
                        { title: 'use_character', message: use_character },
                        { title: 'Brand model number', message: model },
                        { title: 'vin', message: vin },
                        { title: 'Engine number', message: engine_num },
                        { title: 'Registration date', message: this.reData(register_date) },
                        { title: 'Date of issue', message: this.reData(issue_date) },
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
