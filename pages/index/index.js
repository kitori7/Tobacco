Page({
  stateItem: {},
  data: {
    array: [{
      id: 0,
      name: "全部类型"
    }, {
      id: 1,
      name: "卷烟供应"
    }, {
      id: 2,
      name: "档位变动"
    }, {
      id: 3,
      name: "访销通知"
    }, ],
    item: {},
    showType:'全部类型'
  },
  onLoad() {
    let userInfo = wx.getStorageSync('userInfo')
    if(!userInfo) {
      wx.redirectTo({
        url: '/pages/form/form',
      })
    }
    wx.cloud.callFunction({
      name: 'getList',
      data: {
        type: 'List'
      }
    }).then(res => {
      this.stateItem = res.result.data
      this.setData({
        item: res.result.data
      })
    })
  },
  pickerChange(res) {
    if (res.detail.value == 0) {
      this.setData({
        item: this.stateItem,
        showType:"全部类型"
      })
    } else {
      let item = this.stateItem.filter(v => {
        return v.type === this.data.array[res.detail.value].name
      })
      this.setData({
        item,
        showType:this.data.array[res.detail.value].name
      })
    }
  },
  itemClick(e) {
    wx.showToast({
      title: '下载中',
      icon: 'loading'
    })
    wx.cloud.downloadFile({
      fileID: e.currentTarget.dataset.file
    }).then(res => {
      wx.openDocument({
        filePath: res.tempFilePath,
        success(res) {
          wx.hideToast({})
        },
        fail(err) {
          console.log(err);
          wx.showToast({
            title: '下载失败，请重新尝试',
            icon: 'none',
            mask: true
          })
        }
      })
    }).catch(error => {
      console.log(error)
    })
  },
  loginOut(){
    wx.setStorageSync('userInfo', {})
    wx.redirectTo({
      url: '/pages/form/form',
    })
  }
})