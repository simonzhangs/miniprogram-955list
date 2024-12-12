Page({
  data: {
    componentName: ''
  },
  onLoad(options) {
    const { componentName, title } = options;
    this.setData({
      componentName
    });
    wx.setNavigationBarTitle({
      title
    });
  }
});