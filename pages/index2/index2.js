// pages/index2/index2.js
const App = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    pois: '0',
    cateList:  [{"CategorySysNo": "", "CategoryName": "全部"}, { "CategorySysNo": "17", "CategoryName": "电商" }, { "CategorySysNo": "16", "CategoryName": "体育" }, { "CategorySysNo": "15", "CategoryName": "房地产" }, { "CategorySysNo": "14", "CategoryName": "交通" }, { "CategorySysNo": "13", "CategoryName": "金融" }, { "CategorySysNo": "12", "CategoryName": "政务" }, { "CategorySysNo": "11", "CategoryName": "医疗" }, { "CategorySysNo": "10", "CategoryName": "教育" }, { "CategorySysNo": "9", "CategoryName": "快递物流" }, { "CategorySysNo": "8", "CategoryName": "娱乐" }, { "CategorySysNo": "7", "CategoryName": "旅游" }, { "CategorySysNo": "6", "CategoryName": "美食" }, { "CategorySysNo": "5", "CategoryName": "IT科技" }, { "CategorySysNo": "4", "CategoryName": "公益" }, { "CategorySysNo": "3", "CategoryName": "商业" }, { "CategorySysNo": "2", "CategoryName": "工具" }, { "CategorySysNo": "1", "CategoryName": "富媒体"}],
    programLst: [],
    cateNo: 0,
    actionSheetHidden: true,
    codeURL: '',
    ProgramName: ''
  },
  //事件处理函数
  goSearch: function() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  viewProgram: function (e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.sysNo}`,
    })
  },
  openActionSheet: function(e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      codeURL: e.currentTarget.dataset.code,
      ProgramName: e.currentTarget.dataset.name
    })
  },
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  downloadCode: function(e) {
    const self = this
    let url = 'https://test99.allinpaymall.com/wx/downloadimg.ashx?img=http://116.236.252.102:30084/MMPIMG/img/2017/1/24/20170124110000_7038.png'
    wx.downloadFile({
      url: url,
      type: 'image', // 下载资源的类型，用于客户端识别处理，有效值：image/audio/video
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res)
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success: function(res) {
            var savedFilePath = res.savedFilePath
            console.log(savedFilePath)
          }
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  goSubmit() {
    wx.navigateTo({
      url: '../submit/submit',
    })
  },

  getProgramList(cateNo) {
    const self = this;
    const data = {
      Method: "GetProgramLst",
      CategorySysNo: cateNo || "",
      ProgramName: "",
    }
    api.getPLById({
      data,
      success: (res) => {
        let newList = res.data;
        console.log(res.data)
        self.setData({
          programLst: newList
        })
      },
    });
  },

  changeProgramList(e) {
    const self = this;
    const cateNo = e.currentTarget.dataset.cateno;
    self.setData({
      cateNo,
    })
    this.getProgramList(self.data.cateNo);
  },
  //周期函数
  onLoad: function () {
    var that = this;

    //调用应用实例的方法获取全局数据
    var res = [{"CategorySysNo": "", "CategoryName": "全部"}, { "CategorySysNo": "17", "CategoryName": "电商" }, { "CategorySysNo": "16", "CategoryName": "体育" }, { "CategorySysNo": "15", "CategoryName": "房地产" }, { "CategorySysNo": "14", "CategoryName": "交通" }, { "CategorySysNo": "13", "CategoryName": "金融" }, { "CategorySysNo": "12", "CategoryName": "政务" }, { "CategorySysNo": "11", "CategoryName": "医疗" }, { "CategorySysNo": "10", "CategoryName": "教育" }, { "CategorySysNo": "9", "CategoryName": "快递物流" }, { "CategorySysNo": "8", "CategoryName": "娱乐" }, { "CategorySysNo": "7", "CategoryName": "旅游" }, { "CategorySysNo": "6", "CategoryName": "美食" }, { "CategorySysNo": "5", "CategoryName": "IT科技" }, { "CategorySysNo": "4", "CategoryName": "公益" }, { "CategorySysNo": "3", "CategoryName": "商业" }, { "CategorySysNo": "2", "CategoryName": "工具" }, { "CategorySysNo": "1", "CategoryName": "富媒体"}];
   
    that.setData({
      cateList: res
    });

    this.getProgramList();
  }
})
