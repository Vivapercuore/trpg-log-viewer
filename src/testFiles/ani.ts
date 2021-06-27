
function ani (canvas: any) {
    const ctx = canvas.getContext('2d')
    let radialGradient
  
    let angle = 0.1
    var scope = 20
  
    let x = 300
    let y = 100
    const draw = () => {
      /* 清空画布(或部分清空) */
      ctx.clearRect(0, 0, 600, 600)
      radialGradient = ctx.createRadialGradient(x, y, 10, x, y, 50)
      radialGradient.addColorStop(0, '#FFFFFF')
      radialGradient.addColorStop(1, '#EA7F26')
      ctx.fillStyle = radialGradient
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.arc(x, y, 50, 0, 2 * Math.PI, false)
      ctx.fill()
  
      x = x + Math.cos(angle) * scope
      y = y + Math.sin(angle) * scope
      angle = angle + 0.1
  
      requestAnimationFrame(draw)
      ctx.closePath()
  
      ctx.beginPath()
      ctx.arc(300, 300, 200, 0, 2 * Math.PI, false)
      ctx.stroke()
    }
  
    requestAnimationFrame(draw)
  }

  
export { ani }