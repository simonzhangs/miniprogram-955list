Component({
  properties: {
    imageUrl: {
      type: String,
      value: ''
    },
    splitNum: {
      type: Number,
      value: 3
    }
  },
  data: {
    splitImages: [],
    imageWidth: 0,
    imageHeight: 0,
    loading: false
  },
  methods: {
    chooseImage() {
      wx.chooseImage({
        count: 1,
        success: (res) => {
          this.setData({
            imageUrl: res.tempFilePaths[0]
          });
        }
      });
    },
    onSplitNumChange(e) {
      this.setData({
        splitNum: e.detail.value
      });
    },
    splitImage() {
      const { imageUrl, splitNum } = this.data;
      if (!imageUrl) {
        wx.showToast({
          title: '请先选择图片',
          icon: 'none'
        });
        return;
      }

      this.setData({ loading: true });
      
      wx.getImageInfo({
        src: imageUrl,
        success: (res) => {
          this.setData({
            imageWidth: res.width,
            imageHeight: res.height
          });
          
          try {
            this.calculateSplitImages();
          } catch (error) {
            wx.showToast({
              title: '图片切分失败',
              icon: 'error',
              duration: 2000
            });
          }
        },
        fail: (err) => {
          wx.showToast({
            title: '图片处理失败',
            icon: 'error'
          });
        },
        complete: () => {
          this.setData({ loading: false });
        }
      });
    },
    calculateSplitImages() {
      const { imageWidth, imageHeight, splitNum, imageUrl } = this.data;
      
      if (!imageWidth || !imageHeight || !splitNum || !imageUrl) {
        throw new Error('参数无效');
      }
      
      const partWidth = Math.floor(imageWidth / splitNum);
      const partHeight = Math.floor(imageHeight / splitNum);
      
      if (partWidth <= 0 || partHeight <= 0) {
        throw new Error('切分尺寸过小');
      }
      
      const splitImages = [];
      const ctx = wx.createCanvasContext('splitCanvas', this);
      
      for (let i = 0; i < splitNum; i++) {
        for (let j = 0; j < splitNum; j++) {
          // 创建临时canvas绘制切分后的图片
          ctx.drawImage(imageUrl, 
            j * partWidth, i * partHeight, partWidth, partHeight,
            0, 0, partWidth, partHeight
          );
          
          // 确保绘制完成后再导出为图片URL
          ctx.draw(false, () => {
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: partWidth,
              height: partHeight,
              destWidth: partWidth,
              destHeight: partHeight,
              canvasId: 'splitCanvas',
              success: (res) => {
                splitImages.push(res.tempFilePath);
                if (splitImages.length === splitNum * splitNum) {
                  this.setData({ splitImages });
                }
              },
              fail: (error) => {
                wx.showToast({
                  title: '切分计算失败',
                  icon: 'error',
                  duration: 2000
                });
                throw error;
              }
            }, this);
          });
        }
      }
    }
  }
});
