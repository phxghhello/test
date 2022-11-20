import html2canvas from 'html2canvas'

// 长按 dom 保存 dom 为图片
class LongPress {
  constructor(el, cb) {
    this.element = el
    this.timer = null
    this.init(cb)
  }

  init (cb) {
    this.touchStart(cb)
    this.touchEnd()
  }

  // 开始触摸
  touchStart(cb) {
    this.element.addEventListener('touchstart', function (e) {
      e.preventDefault()
      this.timer = setTimeout(() => {
        cb?.()
      }, 700)
    }, { passive: false })
  }

  // 结束触摸
  touchEnd () {
    this.element.addEventListener('touchend', function (e) {
      e.preventDefault()
      clearTimeout(this.timer)
      this.timer = null
    }, { passive: false })
  }

  // htmlToCanvas
  htmlToCanvas({ mime, encoderOptions, ...html2canvasOpts }, cb) {
    html2canvas(this.element, html2canvasOpts).then(canvas => {
      try {
        const imgUrl = canvas.toDataURL(mime, encoderOptions); // 此方法可以设置截图质量（0-1）
        cb?.({
          flag: 1,
          data: imgUrl
        })
      } catch (err) {
        cb?.({
          flag: 0,
          message: err.message
        })
      }
    });
  }
}

export default LongPress
