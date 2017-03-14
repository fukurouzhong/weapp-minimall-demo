// pages/detail/detail.js
var api = require('../../utils/api.js')
Page({
  data: {
    order: [],
    toView: 'screen1',
    scrollLeft: 0,
    modalHidden: true,
    actionSheetHidden: true,
    title: '',
    usedCount: '',
    logoImgPath: '',
    codeImgPath: '',
    brief: '',
    programDetail: '',
  },
  onImageClick: function (event) {
    this.setData({ modalHidden: false })
  },
  modalBack: function (event) {
    this.setData({ modalHidden: true })
  },
  openActionSheet: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,

    })
  },
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    const self = this;
    const id = options.id;
    const data = {
      Method: "GetProgram",
      ProgramSysNo: id
    }
    api.getProgramDetailById({
      data,
      success: (res) => {
        console.log(res)
        let order = []
        if (res.data.PhotoOne.length !== 0) {
          order[0] = { 'content': res.data.PhotoOne, 'index': 'screen1' }
        }
        if (res.data.PhotoTwo.length !== 0) {
          order[1] = { 'content': res.data.PhotoTwo, 'index': 'screen2' }
        }
        if (res.data.PhotoThree.length !== 0) {
          order[2] = { 'content': res.data.PhotoThree, 'index': 'screen3' }
        }
        if (res.data.PhotoFour.length !== 0) {
          order[3] = { 'content': res.data.PhotoFour, 'index': 'screen4' }
        }
        if (res.data.PhotoFive.length !== 0) {
          order[4] = { 'content': res.data.PhotoFive, 'index': 'screen5' }
        }

        // console.log(order)
        self.setData({
          title: res.data.ProgramName,
          usedCount: res.data.UsedCount,
          logoImgPath: res.data.LogoImgPath,
          codeImgPath: res.data.CodeImgPath,
          brief: res.data.brief,
          programDetail: res.data.ProgramDetail,
          order: order,
        })
      }
    })
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