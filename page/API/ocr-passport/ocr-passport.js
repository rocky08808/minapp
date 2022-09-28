Page({
    data: {
        textArry: [
            { title: 'issuing authority', message: 'Exit and Entry Administration of the Ministry of Public Security' },
            { title: 'birthday', message: 'December 27, 2020' },
            { title: 'place of birth', message: 'Sichuan' },
            { title: 'nationality', message: 'CHN' },

            { title: 'Date of Expiry', message: 'April 08, 2044' },
            { title: 'The release date', message: 'April 09, 2024' },
            { title: 'The certificate address', message: 'sichuan' },
            { title: 'English name', message: 'ZHIXIAOBAO' },
            { title: 'name chinese', message: 'Xiaobao' },
            { title: 'Passport number', message: 'E09222222' },
            { title: 'Identity ID', message: 'MCNONCNF<<<<A9' },
            { title: 'sex', message: 'F' },
            { title: 'country', message: 'CHN' }
        ],
        imgUrl: "https://gw.alipayobjects.com/zos/rmsportal/JUcFsOCCRzlYpEHkKczj.jpg"
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
            ocrType: 'ocr_passport',
            path: url,
            success: (res) => {
                let data = JSON.parse(res.result.outputs[0].outputValue.dataValue);

                let {authority, birth_date,  birth_place, country, expiry_date,  issue_date, issue_place, name, name_cn, passport_no, person_id, sex, src_country
                }=data;
                this.setData({
                    imgUrl:url,
                    textArry: [
                        { title: 'issuing authority', message: authority },
                        { title: 'birthday', message: this.reData(birth_date) },
                        { title: 'place of birth', message: birth_place },
                        { title: 'country', message: country },
                        { title: 'Date of Expiry', message: this.reData(expiry_date) },
                        { title: 'Date of issue', message: this.reData(issue_date) },
                        { title: 'The certificate address', message: issue_place },
                        { title: 'name', message: name },
                        { title: 'name', message: name_cn },
                        { title: 'Passport number', message: passport_no },
                        { title: 'Identity ID', message: person_id },
                        { title: 'gender', message: sex },
                        { title: 'country', message: src_country }
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
