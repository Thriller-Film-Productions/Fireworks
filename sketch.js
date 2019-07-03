const palette = {
  background: () => {
    return "rgba(25, 25, 25, 0.5)"
  },
  foreground: () => {
    return "rgb(51, 51, 51)"
  }
}

const fireworks = [];
const particles = [];
const gravity = 0.1;

function setup() {

}

function drawLoop() {
  draw.fillStyle = palette.background();
  draw.fillRect(0, 0, c.width, c.height);

  for (let i = 0; i < fireworks.length; i++) {
    if (fireworks[i].show()) {
      fireworks.splice(i, 1);
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    setTimeout(() => {
      if (particles[i].show()) {
        particles.splice(i, 1);
      }
    }, Math.random() * 30)
  }
}

class Firework {
  constructor(power, angle, size, hue, lightness, time, time2, ptime) {
    this.power = power;
    this.r = angle;
    this.size = size;
    this.hue = hue;
    this.lightness = lightness;
    this.time1 = time;
    this.time2 = time2;
    this.ptime = ptime

    this.btime = performance.now()
    this.x = width(0.5);
    this.y = height(1);
    this.vx = Math.cos(this.r) * this.power;
    this.vy = Math.sin(this.r) * this.power;
    this.shooting = true;
  }
  show() {
    // draw.fillStyle = `hsl(${this.hue}, 100%, ${this.lightness}%)`
    // draw.beginPath();
    // draw.arc(this.x, this.y, diag(1 / 512), 0, Math.PI * 2);
    // draw.fill();
    this.x += this.vx;
    this.y += this.vy;

    this.vx *= 0.99;
    this.vy *= 0.99;

    if (performance.now() >= this.btime + this.time1) {
      this.shooting = false;
    }

    if (performance.now() >= this.btime + this.time2) {
      let v = (100 + (Math.random() - 0.5) * 20) * this.size;
      for (let i = 0; i < v; i++) {
        setTimeout(() => {
          particles.push(new Particle(this.x, this.y, this.hue, this.lightness, (Math.random() - 0.5) * Math.PI * 2, Math.random() ** 0.25 * 3 * this.size, diag(1 / 1028), this.ptime + (Math.random() - 0.5) * 60))
        })
      }
      return "SPLICE ME....    PLEEEAAAAAAASSSSSEEE!!!   MY TIME IS UP!!!!!!         JUST COME ON ALREADY!!!!!!!!!!!!                                           WHY DO YOU DO THIS TO ME";
    }

    if (this.shooting) {
      for (let i = 0; i < Math.floor(Math.random() * 2 + 2); i++) {
        particles.push(new Particle(this.x, this.y, this.hue, 95, -this.r + (Math.random() - 0.5) * 2, 2, diag(1 / 1028), 100 + (Math.random() - 0.5) * 60))
      }
    }

    if (!this.shooting) {
      this.vy += gravity;
    } else {
      this.vx = Math.cos(this.r) * this.power;
      this.vy = Math.sin(this.r) * this.power;
    }
  }
}

class Particle {
  constructor(x, y, hue, lightness, angle, velocity, size, time) {
    this.x = x;
    this.y = y;
    this.color = `hsl(${hue}, 100%, ${lightness}%)`;
    this.r = angle;
    this.v = velocity;
    this.s = size;
    this.t = time;

    this.vx = Math.cos(this.r) * this.v;
    this.vy = Math.sin(this.r) * this.v;
    this.ct = performance.now()
  }

  show() {
    draw.fillStyle = this.color;
    draw.beginPath();
    draw.arc(this.x, this.y, this.s, 0, Math.PI * 2);
    draw.fill();

    this.x += this.vx;
    this.y += this.vy;
    this.vy += gravity;

    this.vx *= 0.99;
    this.vy *= 0.99;

    if (this.ct + this.t <= performance.now()) {
      return "Dear me, die in a hole"
    }
  }
}

function newFirework() {
  fireworks.push(new Firework(5 + Math.random() * 5, -Math.PI / 2 + (Math.random() - 0.5) * 0.3, 0.2 + Math.random() * 1.8, Math.random() * 360, 50 + Math.random() * 50, 750 + Math.random() * 500, 1250 + Math.random() * 500, 750 + Math.random() * 600))

  const now = new Date();
  const start = new Date();
  const end = new Date();
  start.setHours(19);
  start.setMinutes(0);
  start.setSeconds(0);

  end.setHours(23);
  end.setMinutes(0);
  end.setSeconds(0);

  console.log((1000 / ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime()))))

  if (checkDate()) {
    setTimeout(newFirework, Math.random() * (1000 / ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime()))))
  }
}

function checkDate() {
  const now = new Date();
  return now.getDate() == 4 && now.getMonth() == 6 && now.getHours() >= 19 && now.getHours() <= 23;
}

if (checkDate()) {
  setTimeout(newFirework, 1000);
}