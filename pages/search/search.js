// pages/search/search.js
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    programLst: [],
    randomList: [],
    noContent: false,
    showRandom: true,
    randomObj: { ProgramName: '', SysNo: null }
  },
  showInput: function () {
    this.setData({
      inputShowed: true,
      showRandom: false
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      programLst: "",
      showRandom: true,
      noContent:false
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
      showRandom: false
    });
  },
  searchItems: function (e) {
    const self = this
    if (!self.data.inputVal) {
      return;
    }
    wx.request({
      url: 'https://test99.allinpaymall.com/wx/test.aspx',
      data: {
        Method: 'GetProgramLst',
        CategorySysNo: '',
        ProgramName: self.data.inputVal
      },
      method: 'POST',
      success: function (res) {
        if (res.data.length == 0) {
          self.setData({
            noContent: true
          })
        } else {
          self.setData({
            noContent: false,
            programLst: res.data
          })
        }

        console.log(self.data.programLst)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  getRandomInt: function (length) {
    // const self = this;
    // let getNum = Math.floor(Math.random() * (max - min + 1) + min);
    // if(getNum !== self.data.lastNum) {
    //    self.setData({
    //     lastNum: getNum
    //   })
    //   return getNum;
    // } else {
    //   getRandomInt(min, max);
    // }
    for (var i = 0, ar = []; i < length; i++) {
      ar[i] = i;
    }

    // randomize the array
    ar.sort(function () {
      return Math.random() - 0.5;
    });
    return ar;
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.sysNo}`,
      success: function (res) {
        console.log("ok")
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    const self = this
    wx.request({
      url: 'https://test99.allinpaymall.com/wx/test.aspx',
      data: {
        Method: 'GetProgramLst',
        CategorySysNo: '',
      },
      method: 'POST',
      success: function (res) {
        let randomNum = self.getRandomInt(res.data.length)
        console.log(randomNum)
        for (let i = 0; i < 9; i++) {
          // let randomNum = self.getRandomInt(res.data.length)
          let popNum = randomNum[i]
          self.data.randomObj.ProgramName = res.data[popNum].ProgramName
          self.data.randomObj.SysNo = res.data[popNum].SysNo
          self.setData({
            randomList: self.data.randomList.concat(self.data.randomObj)
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
});