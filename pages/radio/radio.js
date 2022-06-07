Page({
    data: {
        check5: false,
        activeImage: 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/miniprogram/checkbox-checked.png',
        inActiveImage: 'https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/miniprogram/checkbox.png',
        options: [
            '字符串',
            '数字',
            { label: '对象', value: 'value2', disabled: true },
        ],
    },
    onChange(event) {
        console.log('radio', event.detail);
    },
    toggle5(e) {
        console.log('radio', e.detail);
        this.setData({
            check5: e.detail,
        });
    },
});
