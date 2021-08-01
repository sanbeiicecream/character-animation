function get(id) {
  return document.getElementById(id)
}

const img_arr = []
const img_num = 34109
const img = new Image()
let info = get('info')
img.src = 'assets/images/00001.jpg'
img.onload = start

function start() {
  init()
  if (img_arr.length === img_num) {
    info.style.display = 'none'
    textPlayer()//动画播放器播放
  }
}

//转换
function init() {
  let cv = get('myCanvas')
  let cxt = cv.getContext('2d')
  //图片的高宽度给canvas画布
  cv.width = img.width
  cv.heigth = img.height
  cxt.drawImage(img, 0, 0)//画出图像
  let pic_data = cxt.getImageData(0, 0, img.width, img.height)
  let pic_Data = pic_data.data//获取图片的data
  //获取图片的高宽
  let pic_DataWidth = pic_data.width
  let pic_DataHeight = pic_data.height
  // 灰阶
  let cont = ''
  for (let h = 0; h < pic_DataHeight; h += 4) {
    let line = ''
    for (let w = 0; w < pic_DataWidth; w += 2) {
      let index = (w + h * pic_DataWidth) * 4
      let r = pic_Data[index]
      let g = pic_Data[index + 1]
      let b = pic_Data[index + 2]
      let gray = getGray(r, g, b)
      line += toText(gray)
    }
    line += '</br>;'
    cont += line
  }
  img_arr[img_arr.length] = cont
  info.innerHTML = '正在加载' + img.src
  if (img_arr.length < img_num) {
    img.scr = 'assets/images/' + imgName(img_arr.length) + '.jpg'
  }
}

//计算灰度值
function getGray(r, g, b) {
  return 0.299 * r + 0.578 * g + 0.114 * b
}

//根据灰度值生成对应的字符
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
  } else return '&nbsp'
}

//更改图片名称
function imgName(length) {
  if (length < 9) return '0000' + (length + 1)
  if (length < 99) return '000' + (length + 1)
  if (length < 999) return '00' + (length + 1)
  if (length < 9999) return '0' + (length + 1)
}

//播放
let a = 0

function textPlayer() {
  let player = get('myAudio')
  let textDiv = get('text')
  player.play()//播放音频
  textDiv.innerHTML = img_arr[a]
  if (a < img_arr.length - 1) {
    a++
    //30帧
    setTimeout(textPlayer, 30.33333)
  }
}
