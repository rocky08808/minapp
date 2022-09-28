Page({
  data:{
      closeShow:true,
      closeActionShow:true
  },
  linkClick() {
      my.showToast({
          content: 'You clicked on the icon Link NoticeBar',
          duration: 3000
      });
  },
  closableClick() {
      this.setData({
          closeShow:false
      })
      my.showToast({
          content: 'You clicked on the icon close noticeBar',
          duration: 3000
      });
  },
  linkActionClick() {
      my.showToast({
          content: 'You clicked on the text Link NoticeBar',
          duration: 3000
      });
  },
  closableActionClick() {
      this.setData({
          closeActionShow:false
      })
      my.showToast({
          content: 'You clicked on the text close NoticeBar',
          duration: 3000
      });
  }
})