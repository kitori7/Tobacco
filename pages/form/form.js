Page({
  data: {
    name: '',
    shop: ''
  },
  onShow(){
    wx.hideHomeButton();
  },
  submit() {
    wx.cloud.callFunction({
      name: "getList",
      data:{
        type:'userInfo'
      }
    }).then(res => {
      let flag = res.result.data.some(v => {
        return v.name === this.data.name && v.shop === this.data.shop
      })
      if (flag) {
        let userInfo = {};
        userInfo.name=this.data.name;
        userInfo.shop=this.data.shop;
        wx.setStorageSync('userInfo', userInfo)
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }else{
        wx.showToast({
          title: '请输入正确信息',
          icon:'error'
        })
      }
    })
  },
  inputChange(e) {
    if (e.target.dataset.type == 1) {
      this.setData({
        name: e.detail.value
      })
    } else {
      this.setData({
        shop: e.detail.value
      })
    }
  }
})