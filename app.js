//モーダルのエレメント指定
let elem = document.querySelector('.modal');

//モーダルのオプション指定
let options = {
  "opacity": 0.5, //表示時の背景
  "inDuration": 500, //モーダルの表示速度(ミリ秒)
  "outDuration": 500, //モーダルの閉じる速度(ミリ秒)
  "onCloseStart": function () { //モーダルを閉じたときに実行する
    console.log("close");
  },
  "startingTop": "100%",//モーダルの登場位置
  "endingTop": "3%",//モーダルの停止位置
}

//モーダルのインスタンス作成
let instance = M.Modal.init(elem, options);

$( '#canvas' ).get( 0 ).width = $( window ).width();
$( '#canvas' ).get( 0 ).height = $( window ).height();

const color = '#1665c0'
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let _ctx = null
let offsetX = null
let offsetY = null
let data = ''

/** Canvas のコンテキスト。!nullを保証 */
// const ctx = () => {
//   if (_ctx) {
//     return _ctx
//   } else {
//     throw Error('コンテキストが null です。')
//   }
// }

const reset = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

/** canvas 描画 */
  // const canvas = document.getElementById('canvas')
  if (canvas) {
    // const ctx = canvas.getContext('2d')
    ctx.strokeStyle = color
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.lineWidth = 3

    _ctx = ctx

    let isDrawing = false
    let lastX = 0
    let lastY = 0

    const draw = (e) => {
      if (!isDrawing) return
      console.log('e', e)
      console.log("lastX", lastX)
      console.log("lastY", lastY)

      ctx.beginPath()
      // start from
      ctx.moveTo(lastX, lastY)
      // go to
      if (e instanceof MouseEvent) {
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
        lastX = e.offsetX
        lastY = e.offsetY

      } else if (e instanceof TouchEvent) {
        let touches = e.changedTouches
        const point = e.changedTouches[0].target.getBoundingClientRect()
        ctx.lineTo(e.changedTouches[0].clientX - point.left, e.changedTouches[0].clientY - point.top)
        ctx.stroke()
        offsetX = (e.changedTouches[0].clientX - point.left)
        offsetY = (e.changedTouches[0].clientY - point.top)
        lastX = offsetX
        lastY = offsetY

        console.log("this.offsetX", this.offsetX)
        console.log('this.offsetY', this.offsetY)
        console.log("e.touches[0].clientX", e.touches[0].clientX)
        console.log("e.touches[0].clientY", e.touches[0].clientY)
        console.log("e.touches[0].pageX", e.touches[0].pageX)
        console.log("e.touches[0].pageY", e.touches[0].pageY)
        console.log("touches", touches)

      }

      // $emit('input', ctx.canvas.toDataURL('image/png'))
    }

    /** デスクトップブラウザでのマウス動作 */
    canvas.addEventListener('mousedown', (e) => {
      e.preventDefault()
      isDrawing = true
      lastX = e.offsetX
      lastY = e.offsetY
    })
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', () => isDrawing = false)
    canvas.addEventListener('mouseout', () => isDrawing = false)

    /** モバイルブラウザでのタッチ操作 */
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault()
      isDrawing = true
      const point = e.changedTouches[0].target.getBoundingClientRect();

      lastX = e.changedTouches[0].clientX - point.left
      lastY = e.changedTouches[0].clientY - point.top
    })
    canvas.addEventListener('touchmove', draw)
    canvas.addEventListener('touchend', () => isDrawing = false)
    canvas.addEventListener('touchcancel', () => isDrawing = false)

  } else {
    throw Error('CANVAS 要素を取得できませんでした。')
  }

const handwritingToImage = () => {
    // html2canvas(document.querySelector("#canvas"))
    //   .then(canvas => {
    //     let result = document.querySelector("#result");
    //     result.innerHTML = '';
    //     result.appendChild(canvas)
    //     alert("Imagified.")
    //   })
  data = canvas.toDataURL('image/png')
  console.log('data', data)
  const a = document.createElement('a')
  a.href = data
  a.download = 'download.png'
  a.click() // https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/click
  }
