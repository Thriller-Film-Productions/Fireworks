function width(p) {
  return (p) * c.clientWidth
}

function height(p) {
  return (p) * c.clientHeight
}

function diag(p) {
  return dist(width(p), height(p), 0, 0)
}

function dist(a, b, c, d) {
  return Math.sqrt(Math.pow(a - c, 2) + Math.pow(b - d, 2))
}

const c = document.getElementById("cnv");
const draw = c.getContext("2d")
const print = console.log
let pp = 0;
let t;

const customLib = {
  drawLoop: () => {
    t = performance.now() - pp;
    pp = performance.now();
    drawLoop()
    requestAnimationFrame(customLib.drawLoop)
  },
  setup: () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    setup()
    requestAnimationFrame(customLib.drawLoop)
  }
}

window.addEventListener("resize", () => {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
})

setTimeout(() => {
  customLib.setup()
}, 250)