Page({
  offsetTopList: [],
  data: {
    sideBarIndex: 1,
    scrollTop: 0,
    categories: [
      {
        label: '选项一',
        title: '退休计算器',
        icon: 'app',
        items: [
            {
                label: '标题文字',
                title: '退休计算器',
                desc: '延迟退休月数，退休时间计算',
                image: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
                type: 'page',
                url: '/pages/home/home'
            },
            {
                label: '标题文字',
                title: '955 公司',
                desc: '955公司列表，远程公司列表',
                image: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
                type: 'page',
                url: '/pages/955/955'
            }
        ]
      },
      {
        label: '选项二',
        title: '图片处理',
        icon: 'app',
        items: [
            {
                title: '九宫格切图',
                desc: '延迟退休月数，退休时间计算',
                image: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
                // type: 'page',
                // url: '/pages/home/home'
            },
            {
                title: '图片去水印',
                desc: '全网图片去水印',
                image: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
                // type: 'page',
                // url: '/pages/home/home'
            },
            {
                title: '牛马精选壁纸',
                desc: '每日精选壁纸',
                image: 'https://tdesign.gtimg.com/mobile/demos/example2.png',
                // type: 'page',
                // url: '/pages/home/home'
            }
        ]
      },
    ],
    navbarHeight: 0,
  },
  onLoad() {
    const query = wx.createSelectorQuery().in(this);
    const { sideBarIndex } = this.data;
    query.selectAll('.title').boundingClientRect();
    query.select('.custom-navbar').boundingClientRect();
    query.exec((res) => {
      const [rects, { height: navbarHeight = 0 }] = res;
      this.offsetTopList = rects.map((item) => item.top - navbarHeight);
      this.setData({ navbarHeight, scrollTop: this.offsetTopList[sideBarIndex] });
    });
  },
  onSideBarChange(e) {
    const { value } = e.detail;

    this.setData({ sideBarIndex: value, scrollTop: this.offsetTopList[value] });
  },
  onScroll(e) {
    const { scrollTop } = e.detail;
    const threshold = 50; // 下一个标题与顶部的距离

    if (scrollTop < threshold) {
      this.setData({ sideBarIndex: 0 });
      return;
    }

    const index = this.offsetTopList.findIndex((top) => top > scrollTop && top - scrollTop <= threshold);

    if (index > -1) {
      this.setData({ sideBarIndex: index });
    }
  },
  handleItemJump(e) {
    const { url, type } = e.currentTarget.dataset;
    if (type === 'page') {
        wx.switchTab({
            url
        });
    } else {
        wx.showModal({
          title: '提示',
          content: '功能开发中，敬请期待',
        })
    }
  }
});
