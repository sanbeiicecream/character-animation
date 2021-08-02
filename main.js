const myVideo = document.querySelector('#myVideo')
let videoHeight
let videoWidth
let textDiv = document.querySelector('#text')
let contextWord = ['东','方','幻','想','乡']
myVideo.ontimeupdate = function () {
  videoHeight = myVideo.clientHeight
  videoWidth = myVideo.clientWidth
  init()
}

//转换
function init() {
  let cv = document.querySelector('#myCanvas')
  let ctx = cv.getContext('2d')
  //图片的高宽度给canvas画布
  cv.width = videoWidth
  cv.height = videoHeight
  ctx.drawImage(myVideo, 0, 0, videoWidth, videoHeight)//画出图像
  let imageData = ctx.getImageData(0, 0, videoWidth, videoHeight).data//获取图片的data
  ctx.clearRect(0, 0, videoWidth, videoHeight)
  let content = ''
  cv.font = '9px'
  //获取图片的高宽
  // let imageWidth = ctx.getImageData(0, 0, videoWidth, videoHeight).width
  // let imageHeight = ctx.getImageData(0, 0, videoWidth, videoHeight).height
  // 灰阶
  for (let h = 0; h < videoHeight; h += 12) {
    let line = '<div>'
    for (let w = 0; w < videoWidth; w += 12) {
      let index = (w + h * videoWidth) * 4
      let r = imageData[index]
      let g = imageData[index + 1]
      let b = imageData[index + 2]
      let gray = getGray(r, g, b)
      line += toText(gray)
      // let i = Math.min(contextWord.length - 1,Math.floor(gray / (255 / contextWord.length)))
      // ctx.fillText(toText(gray), w, h)
    }
    line += '</div>'
    content += line
  }
  textDiv.innerHTML = content
}

//计算灰度值
function getGray(r, g, b) {
  // return (r * 30 + g * 59 + b * 11 + 50) / 100
  return 0.299 * r + 0.578 * g + 0.114 * b
}

//根据灰度值生成对应的字符
function toText(g) {
  // if (g <= 30) {
  //   return '东'
  // } else if (g <= 60) {
  //   return '方'
  // } else if (g <= 120) {
  //   return '幻'
  // } else if (g <= 150) {
  //   return '像'
  // } else if (g <= 180) {
  //   return '乡'
  // } else if (g <= 210) {
  //   return '妙'
  // } else if (g <= 240) {
  //   return '呀'
  // } else return ' '
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
  } else return '&nbsp;'
}
