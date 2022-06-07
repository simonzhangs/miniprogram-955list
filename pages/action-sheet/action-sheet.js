import ActionSheet from 'tdesign-miniprogram/action-sheet/index';
import Toast from 'tdesign-miniprogram/toast/index';
import { basicListOption, withIconListOption, grid, withSwiperGrid } from './constants';
Page({
    data: {
        visible: false,
        handler: null,
        operList1: [
            {
                title: '基础动作面板',
                btns: [
                    {
                        type: 'list',
                        text: '列表型',
                    },
                    {
                        type: 'withIconList',
                        text: '带图标列表型',
                    },
                    {
                        type: 'grid',
                        text: '宫格型',
                    },
                    {
                        type: 'withSwiperGrid',
                        text: '宫格型-多页',
                    },
                ],
            },
        ],
    },
    clickHandle(e) {
        let handler;
        const { detail } = e;
        switch (detail) {
            case 'list':
                handler = ActionSheet.show(basicListOption);
                break;
            case 'withIconList':
                handler = ActionSheet.show(withIconListOption);
                break;
            case 'grid':
                handler = ActionSheet.show(grid);
                break;
            case 'withSwiperGrid':
                handler = ActionSheet.show(withSwiperGrid);
                break;
            default:
                break;
        }
        this.setData({
            handler,
        });
    },
    onCancelBaseImperative() {
        var _a;
        Toast({
            context: this,
            selector: '#t-toast',
            message: '点击取消',
        });
        (_a = this.data.handler) === null || _a === void 0 ? void 0 : _a.close();
    },
    onSelectBaseImperative(e) {
        var _a;
        const { detail: { selected: { label }, }, } = e;
        Toast({
            context: this,
            selector: '#t-toast',
            message: `选中${label}`,
        });
        (_a = this.data.handler) === null || _a === void 0 ? void 0 : _a.close();
    },
    onVisibleChangeBaseImperative(e) {
        const { detail: { visible }, } = e;
        this.setData({
            visible,
        });
    },
});
