Page({
  data: {
    infoImg:"https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132"
  },
  onLoad(options) {

  },
  getInfo(res) {
    console.log(res);
    let infoImg = res.detail.userInfo.avatarUrl
    this.setData({
      infoImg
    })
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }
})