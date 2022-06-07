Page({
    data: {},
    onLoad() { },
    onReady() { },
    onShow() { },
    tapShowLetter() {
        wx.navigateTo({ url: '/pages/indexes/display?type=letter' });
    },
    tapShowNumber() {
        wx.navigateTo({ url: '/pages/indexes/display?type=number' });
    },
});
