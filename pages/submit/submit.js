// pages/submit/submit.js
Page({
  data: {
    array: ["富媒体", "工具", "商业", "公益", "IT科技", "美食", "旅游", "娱乐", "快递物流", "教育", "医疗", "政务", "金融", "交通", "房地产", "体育", "电商"],
    index: '',
    logoURL: '../../images/upload-logos.png',
    qrURL: '../../images/upload-qrcodes.png',
    castList: [],
  },
  submitform: function (data) {
    console.log(data)
    wx.request({
      url: 'https://test99.allinpaymall.com/wx/test.aspx ',
      data: data,
      method: 'POST',
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
        console.log("complete")
      }
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindFormSubmit: function (e) {
    console.log("触发提交请求")
    const self = this;
    let castLength = self.data.castList.length;
    wx.request({
      url: 'https://test99.allinpaymall.com/wx/test.aspx',
      data: {
        Method: 'AddProgram',
        CategorySysNo: e.detail.value.categorySysNo,
        Brief: e.detail.value.brief,
        ProgramName: e.detail.value.name,
        CodeImgPath: self.data.qrURL,
        LogoImgPath: self.data.logoURL,
        CodeURL: '',
        ProgramDetail: '',
        PhotoOne: self.data.castList[0] || '',
        PhotoTwo: self.data.castList[1] || '',
        PhotoThree: self.data.castList[2] || '',
        PhotoFour: self.data.castList[3] || '',
        PhotoFive: self.data.castList[4] || '' 
      },
      method: 'POST',
      success: function (res) {
        console.log('提交成功')
        console.log(res)
        if (res.data.ReStr > 0) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
      },
      fail: function () {
        console.log("提交失败")
      },
      complete: function () {
        console.log("完成")
      }
    })
  },
  chooseimage: function (e) {
    const self = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.showToast({
          title:'正在加载',
          icon:'loading',
          duration: 100000,
        })
        wx.uploadFile({
          url: 'https://test99.allinpaymall.com/wx/Upload.ashx',
          filePath: tempFilePaths[0],
          name: 'img',
          header: {
            'Content-type': 'multipart/form-data'
          },
          success: function (res) {
            let resJson = JSON.parse(res.data);
            if (e.currentTarget.dataset.index == "logo") {
              self.setData({
                logoURL: resJson.Msg
              })  
            } else if (e.currentTarget.dataset.index == "qr") {
              self.setData({
                qrURL: resJson.Msg
              })
            } else {
              // do nothing
            }
            wx.hideToast();
          },
          fail: function (res) {
            wx.showModal({
              showCancel: false,
              content: res.content
            })
          },
          complete: function () {
            // complete
          }
        })
      }
    })
  },
  chooseCast: function (e) {
    const self = this;
    wx.chooseImage({
      count: 5,
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
         wx.showToast({
          title:'正在加载',
          icon:'loading',
          duration: 100000,
        })
        if (self.data.castList.length <= 5) {
          for (var i = 0; i < tempFilePaths.length; i++) {
            wx.uploadFile({
              url: 'https://test99.allinpaymall.com/wx/Upload.ashx',
              filePath: tempFilePaths[i],
              name: 'img',
              header: {
                'Content-type': 'multipart/form-data'
              },
              success: function (res) {
                let resJson = JSON.parse(res.data);
                console.log(resJson)
                if (resJson.ReStr == "ok" && resJson.Msg !== null) {
                  self.setData({
                    castList: self.data.castList.concat(resJson.Msg)
                  })
                }
              },
              fail: function (res) {
                wx.showModal({
                  showCancel: false,
                  content: res.content
                })
              },
              complete: function () {
                // complete
              }
            })
          }
        }
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})