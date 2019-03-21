const QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

Page({
  data:{
    city: "点击获取当前位置",
    indicatorDots: true,
    indicatorColor: "#B3B3B3",
    indicatorActiveColor: "#333333",
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 1000,
    imgUrls: ["imgs/3.jpg", "imgs/5.jpg", "imgs/1.jpg", "imgs/4.jpg", "imgs/2.jpg"
    ]
  },

  onLoad() {
    this.qqmapsdk = new QQMapWX({
      key: 'EAXBZ-33R3X-AA64F-7FIPQ-BY27J-5UF5B'
    })
    wx.getSetting({
      success: res => {
        let auth = res.authSetting['scope.userLocation']
        this.setData({
          locationAuthType: auth ? AUTHORIZED
            : (auth === false) ? UNAUTHORIZED : UNPROMPTED
        })
        if (auth)
          this.getCityAndWeather()
      }
    })
  },
  onTapLocation(){
    if (this.data.locationAuthType === UNAUTHORIZED)
      wx.openSetting({
        success: res => {
         if (res.authSetting['scope.userLocation']) {
            this.getCityAndWeather()
          }
        }
      })
    else
      this.getCityAndWeather()
  },
  getCityAndWeather() {
    wx.getLocation({
      success: res => {
        this.setData({
          locationAuthType: AUTHORIZED,
        })
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            let city = res.result.address_component.city
            this.setData({
              city: city,
            })
          }
        })
      },
      fail: () => {
        this.setData({
          locationAuthType: UNAUTHORIZED,
        })
      }
    })
  }
})