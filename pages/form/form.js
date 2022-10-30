Page({
  data: {

  },
  submit(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
    wx.showToast({
      title: '错误的店铺代码',
      icon:'error'
    })
  }
})