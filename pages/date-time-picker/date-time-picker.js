Page({
    data: {
        mode: '',
        dateVisible: false,
        date: new Date().getTime(),
        dateText: '',
        monthVisible: false,
        month: '2021-09',
        monthText: '',
        timeVisible: false,
        time: '',
        timeText: '',
        monthDateVisible: false,
        monthDate: '2019-09-21',
        monthDateText: '',
        datetimeVisible: false,
        datetime: '2021-06-06 12:11:11',
        datetimeText: '',
        disableDate: {
            before: '2000-01-01 00:00:00',
            after: '2022-09-09 12:12:12',
        },
    },
    showPicker(e) {
        var _a;
        const { mode } = (_a = e === null || e === void 0 ? void 0 : e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset;
        this.setData({
            mode,
            [`${mode}Visible`]: true,
        });
    },
    hidePicker() {
        const { mode } = this.data;
        this.setData({
            [`${mode}Visible`]: false,
        });
    },
    onConfirm(e) {
        const { value, formatValue } = e === null || e === void 0 ? void 0 : e.detail;
        const { mode } = this.data;
        console.log(value, formatValue);
        this.setData({
            [mode]: value.valueOf(),
            [`${mode}Text`]: formatValue,
        });
        this.hidePicker();
    },
});
