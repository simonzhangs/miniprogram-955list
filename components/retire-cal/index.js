import { calRetireInfo } from './utils';
const genderSelectArr = [
  {
      genderKey: 'male',
      genderName: '男牛马',
      retirementAge: 60,
      delayUnit: 4,
      maxDelayYear: 3
  },
  {
      genderKey: 'femal-admin',
      genderName: '女牛马（技术管理岗）',
      retirementAge: 55,
      delayUnit: 4,
      maxDelayYear: 3
  },
  {
      genderKey: 'femal-special',
      genderName: '女牛马（特殊岗）',
      retirementAge: 50,
      delayUnit: 2,
      maxDelayYear: 5
  }
];

Component({
    properties: {},
    data: {
      dateRange: [],
      retirementInfo: null,

      datetimeVisible: false,
      datetime: '',
      // 指定选择区间起始值
      disableDate: {
        before: '1965-01',
      },
      genderSelectArr,
      gender: genderSelectArr[0].genderKey
    },
    lifetimes: {
        attached() {
        },
    },
    methods: {
      onConfirm(e) {
        const { value } = e?.detail;
        this.setData({
          datetime: value.valueOf(),
          datetimeVisible: false
        });
      },
      onCancel() {
        this.setData({
          datetimeVisible: false
        });
      },
      selectDate() {
        this.setData({
          datetimeVisible: !this.data.datetimeVisible
        })
      },
      handleRadioChange(e) {
        const { value } = e?.detail;
        this.setData({
          gender: value,
        });
      },
      calculateRetirement() {
        const { gender, datetime } = this.data;

        if (!(gender && datetime)) {
          wx.showToast({
            icon: 'none',
            title: '未填写完整'
          })
          return;
        }

        const selectGender = genderSelectArr.filter((item) => item.genderKey === gender)[0];
        const retirementAge = selectGender.retirementAge;
        const delayUnit = selectGender.delayUnit;
        const maxDelayYear = selectGender.maxDelayYear;

        const retirementInfo = calRetireInfo(retirementAge, delayUnit, maxDelayYear, datetime);
        this.setData({
          retirementInfo
        });
      },
    }
  });