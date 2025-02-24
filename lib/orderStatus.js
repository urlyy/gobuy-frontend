export const computeStatus = (num)=>{
    if(num === 0){
      return "待支付"
    }else if(num === 1){
      return "已支付"
    }else if(num ===2){
      return "已取消"
    }else{
      throw new Error("Invalid status")
    }
  }