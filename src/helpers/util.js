export  function friendlyDate (datStr){
  let dateObj = typeof  datStr === 'object' ? datStr : new Date(datStr);
  let time = dateObj.getTime()
  let now =  Date.now();
  let space = now - time
  let str = ''
  switch (true){
    case space < 60*1000:
      str = '刚刚'
      break
    case space < 60*60*1000:
      // Math.floor 返回小于或等于一个给数字的最大整数
      str = Math.floor(space/60000) + '分钟前'
      break
    case space < 60*60*1000*24:
      str = Math.floor(space/(1000*3600)) + '小时前'
      break
    case space < 60*60*1000*24*30:
      str = Math.floor(space/(1000*3600*24)) + '天前'
      break
    case space < 60*60*1000*24*30*12:
      str = Math.floor(space/(1000*3600*24*30)) + '月前'
      break
    default:
      str = Math.floor(space/(1000*3600*24*30*12)) + '年前'
  }
  return str
}
