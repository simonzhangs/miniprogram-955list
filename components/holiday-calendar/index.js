Component({
  data: {
    holidays: [
      {
        name: '元旦',
        date: '2025年1月1日',
        days: 1,
        adjustment: '不调休'
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
    ]
  },
  methods: {
    // todo，保存绘制图片
    handleSave() {
      const query = wx.createSelectorQuery().in(this)
      query.select('.holiday-container')
        .fields({
          node: true,
          size: true
        })
        .exec((res) => {
          const node = res[0]
          const canvas = wx.createOffscreenCanvas({
            width: node.width,
            height: node.height
          })
          const ctx = canvas.getContext('2d')
          
          // 先渲染背景
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, node.width, node.height)
          
          // 将节点内容绘制到canvas
          wx.html2canvas({
            node: '.holiday-container',
            canvas: canvas,
            success: () => {
              // 将canvas转为图片
              wx.canvasToTempFilePath({
                canvas,
                success: (res) => {
                  wx.previewImage({
                    urls: [res.tempFilePath],
                    success: () => {
                      console.log('预览成功')
                    }
                  })
                },
                fail: (err) => {
                  console.error('生成图片失败', err)
                  wx.showToast({
                    title: '生成分享图片失败',
                    icon: 'none'
                  })
                }
              })
            },
            fail: (err) => {
              console.error('节点转换失败', err)
              wx.showToast({
                title: '生成分享图片失败',
                icon: 'none'
              })
            }
          })
        })
    }
  }
}) 