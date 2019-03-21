Page({
  data:{

  },

  onLoad(){
    this.typeRefresh("咖喱")
  },
  typeRefresh(keyword){
    wx.request({
      url: "http://apis.juhe.cn/cook/query",
      data: {
        menu:keyword,
        key:"316d3616b46b72a9bfd14c38682e1aee"
      },
      success: res => {
        let oneNews = []
        if(res.data.result == null){
          oneNews = []
        }else{
          let result = res.data.result.data
          console.log(result)
          let imtro = ""
          for (let i = 0; i < result.length; i++) {
            if (result[i].imtro.length>60){
              imtro = result[i].imtro.substring(0,60) + "...";
            }else{
              imtro = result[i].imtro;
            }
            oneNews.push({
              title: result[i].title,
              firstImage: result[i].albums,
              intro: imtro,
              ingredients: result[i].ingredients
            })
          }
          this.setData({
            oneNews
          })
        }
      },
    })
  },

  sou:function(e){
    this.typeRefresh(e.detail.value)
  }
})