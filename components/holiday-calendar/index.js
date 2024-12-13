Component({
  data: {
    holidays: [
      {
        name: '元旦',
        date: '2025年1月1日',
        days: 1,
        adjustment: '无需调休'
      },
      {
        name: '春节',
        date: '2025年1月28日-2月4日',
        days: 8,
        adjustment: '1月26日(周日)、2月8日(周六)上班'
      },
      {
        name: '清明节',
        date: '2025年4月4日-6日',
        days: 3,
        adjustment: '无需调休'
      },
      {
        name: '劳动节',
        date: '2025年5月1日-5日',
        days: 5,
        adjustment: '4月27日(周日)上班'
      },
      {
        name: '端午节',
        date: '2025年5月31日-6月2日',
        days: 3,
        adjustment: '无需调休'
      },
      {
        name: '中秋节、国庆节',
        date: '2025年10月1日-8日',
        days: 8,
        adjustment: '9月28日(周日)、10月11日(周六)上班'
      }
    ],
    isCollapsed: false,
    lastScrollTop: 0
  },
  lifetimes: {
    attached() {
      this.createIntersectionObserver({
        thresholds: [0, 1]
      })
        .relativeToViewport()
        .observe('.holiday-source', (res) => {
          const { intersectionRatio, boundingClientRect: { top } } = res;
          console.log('intersectionRatio', intersectionRatio, top)
          // 判断滑动方向
          const currentScrollTop = top; // 转换为正值便于比较
          const isScrollingUp = currentScrollTop < this.data.lastScrollTop;
          
          // 更新上次滚动位置
          this.setData({
            lastScrollTop: currentScrollTop
          });
          
          // 根据相交比例和滑动方向判断状态
          const isDistant = intersectionRatio > 0 && isScrollingUp; // 注意这里取反,因为我们要检测向下滚动
          
          this.setData({
            isReachBottom: isDistant
          });
        });
    },
    detached() {
      if (this._observer) {
        this._observer.disconnect();
        this._observer = null;
      }
    }
  },
  methods: {
    // todo，保存绘制图片
    // handleSave() {
    //   this.createSelectorQuery()
    //   .select('#myCanvas')
    //   .fields({ node: true, size: true })
    //   .exec((res) => {
    //       // Canvas 对象
    //       const canvas = res[0].node
    //       // 渲染上下文
    //       const ctx = canvas.getContext('2d');
    //       // Canvas 画布的实际绘制宽高
    //     const width = res[0].width
    //     const height = res[0].height

    //     // 初始化画布大小
    //     // todo 需要根据屏幕大小动态计算
    //     const dpr = 1;
    //     canvas.width = width * dpr
    //     canvas.height = height * dpr
    //     ctx.scale(dpr, dpr);
    //     // 清空画布
    //     ctx.clearRect(0, 0, width, height)

    //     // 绘制红色正方形
    //     ctx.fillStyle = 'rgb(200, 0, 0)';
    //     ctx.fillRect(10, 10, 50, 50);

    //     // 绘制蓝色半透明正方形
    //     ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    //     ctx.fillRect(30, 30, 50, 50);

    //     // 生成图片
    //     wx.canvasToTempFilePath({
    //       canvas,
    //       success: res => {
    //         // 生成的图片临时文件路径
    //         const tempFilePath = res.tempFilePath;
    //         // 保存图片
    //         wx.showShareImageMenu({
    //           path: tempFilePath,
    //           style: 'v2',
    //           success: () => {
    //             console.log('保存图片成功');
    //           },
    //           fail: () => {
    //             console.log('保存图片失败');
    //           }
    //         })
    //       },
    //     })
    //   })
    // },
    handleSave() {
      const query = wx.createSelectorQuery().in(this);
      query.select('#holiday-content')
        .fields({
          node: true,
          size: true,
          rect: true
        })
        .exec((res) => {
          const node = res[0];
          const width = node.width;
          const height = node.height + 120;
          
          const canvasQuery = wx.createSelectorQuery().in(this);
          canvasQuery.select('#myCanvas')
            .fields({
              node: true,
              size: true
            })
            .exec((canvasRes) => {
              const canvas = canvasRes[0].node;
              const ctx = canvas.getContext('2d');
              
              canvas.width = width;
              canvas.height = height;
              
              // 设置背景色
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, width, height);
              
              // 绘制边框
              ctx.strokeStyle = '#EEEEEE';
              ctx.lineWidth = 2;
              ctx.strokeRect(10, 10, width - 20, height - 20);
              
              const xPadding = 30;
              let yOffset = 40;
              
              // 先绘制小程序来源
              ctx.font = '12px sans-serif';
              ctx.fillStyle = '#999999';
              ctx.fillText('—— 来自"牛马计算器工具箱"小程序', xPadding, yOffset);
              yOffset += 30;
              
              // 绘制假期列表
              this.data.holidays.forEach((holiday) => {
                // 绘制假期名称
                ctx.font = 'bold 16px sans-serif';
                ctx.fillStyle = '#333333';
                ctx.fillText(holiday.name, xPadding, yOffset);
                yOffset += 30;
                
                // 绘制日期
                ctx.font = '14px sans-serif';
                ctx.fillStyle = '#666666';
                ctx.fillText(holiday.date, xPadding, yOffset);
                yOffset += 25;
                
                // 绘制放假天数
                ctx.fillText(`放假${holiday.days}天`, xPadding, yOffset);
                yOffset += 25;
                
                // 绘制调休说明
                if (holiday.adjustment) {
                  ctx.fillText(`调休说明：${holiday.adjustment}`, xPadding, yOffset);
                  yOffset += 25;
                }
                
                // 增加条目间距
                yOffset += 25;
              });
              
              // 生成图片
              wx.canvasToTempFilePath({
                canvas: canvas,
                success: (res) => {
                  wx.showShareImageMenu({
                    path: res.tempFilePath,
                    style: 'v2',
                    success: () => {
                      wx.showToast({
                        title: '保存成功',
                        icon: 'success'
                      });
                    }
                  });
                }
              });
            });
        });
    }
  }
}) 