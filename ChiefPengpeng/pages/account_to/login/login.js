Page({
  data:{
    disabled:true,
    btnstate:"default",
    account:"",
    password:""
  },
  accountInput:function(e){
    var content = e.detail.value;
    if(content != ""){
      this.setData({disabled:false,btnstate:"primary",account:"1"});
    }else{
      this.setData({ disabled: true, btnstate: "default", account: "0"});
    }
  },
  pwdBlur:function(e){
    var passward = e.detail.value;
    if(passward != ""){
      this.setData({passward:passward});
    }
  }
})