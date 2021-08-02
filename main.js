const myVideo = document.querySelector('#myVideo')
let videoHeight
let videoWidth
myVideo.oncanplay = function (){
  videoHeight = myVideo.clientHeight
  videoWidth = myVideo.clientWidth
}
myVideo.ontimeupdate = function () {
  init()
}
//转换填充字符
function init() {
  if (myVideo.paused){
    return
  }
  let canvas = document.querySelector('#myCanvas')
  let canvasContext = canvas.getContext('2d')
  //图片的高宽度给canvas画布
  canvas.width = videoWidth
  canvas.height = videoHeight
  canvasContext.drawImage(myVideo, 0, 0, videoWidth, videoHeight)//画出图像
  let imageData = canvasContext.getImageData(0, 0, videoWidth, videoHeight).data//获取图片的data
  canvasContext.clearRect(0, 0, videoWidth, videoHeight)
  canvas.font = '9px'
  // 灰阶
  for (let h = 0; h < videoHeight; h += 10) {
    for (let w = 0; w < videoWidth; w += 10) {
      let index = (w + h * videoWidth) * 4
      let r = imageData[index]
      let g = imageData[index + 1]
      let b = imageData[index + 2]
      let gray = getGray(r, g, b)
      canvasContext.fillText(toText(gray), w, h)
    }
  }
}

//计算灰度值
function getGray(r, g, b) {
  return 0.299 * r + 0.578 * g + 0.114 * b
}
// 根据计算值获取字符
function toText(g) {
  if (g <= 30) {
    return 'M'
  } else if (g <= 60) {
    return 'W'
  } else if (g <= 120) {
    return '$'
  } else if (g <= 150) {
    return '*'
  } else if (g <= 180) {
    return 'B'
  } else if (g <= 210) {
    return '!'
  } else if (g <= 240) {
    return '8'
  } else return ' '
}