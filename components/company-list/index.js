Component({
  properties:{
    companyList: Array,
  },
  methods:{
    clickList(e){
      const company = e.currentTarget.dataset.company.name;
      wx.navigateTo({
        url: '../company-detail/company-detail',
        success:function(res){
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: company })
        }
      })
    },
  }
})