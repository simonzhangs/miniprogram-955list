import { categories } from './categories';

Page({
  offsetTopList: [],
  data: {
    sideBarIndex: 1,
    scrollTop: 0,
    categories,
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
    const { url, type, title } = e.currentTarget.dataset;
    if (type === 'page') {
        wx.switchTab({
            url
        });
    } else if (type === 'component') {
        wx.navigateTo({
            url: `/pages/component-renderer/index?componentName=${url}&title=${title}`
        });
    } else {
        wx.showModal({
          title: '提示',
          content: '功能开发中，敬请期待',
        })
    }
  }
});
