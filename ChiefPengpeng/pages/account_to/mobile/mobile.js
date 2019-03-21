Page({
  data:{
    disabled:true,
    btnstate:"default",
    mobile:""
  },
  mobileblur:function(e){
    var content = e.detail.value;
    if(content !=""){
      this.setData({disabled:false,btnstate:"primary",mobile:content});
    }else{
      this.setData({disabled:true,btnstate:"default",mobile:""})
    }
  },
  login:function(e){
    wx.showToast({
      title: "注册成功",
      icon: "success",
      duration: 1000,
      success: function () {
        setTimeout(function () {
          wx.navigateTo({
            url: '../login/login'
          })
        }, 1000) //延迟时间
      }
    });
  }
})