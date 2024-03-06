'use strict';

class GradientAnimation {
  constructor(options) {
    this.canvas = options.canvas
    this.context = this.canvas.getContext('2d')
    this.color = {
      from: options.colorFrom,
      to: options.colorTo,
    }
    this.width = 0
    this.height = 0
    this.previousTime = performance.now()
    this.elapsedTime = 0
    this.duration = options.duration || 8000
    this.isActive = false
    this.resizeHandler = this.resize.bind(this)

    this.bindEvents()
    this.resize()
    this.start()
  }

  bindEvents() {
    window.addEventListener('resize', this.resizeHandler)
  }

  unbindEvents() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  start() {
    this.isActive = true
    this.previousTime = performance.now()

    this.render()
  }

  stop() {
    this.isActive = false
  }

  toCssColor(color, progress) {
    const { h, s, l } = color
    const hue = Math.floor(h[0] + (h[1] - h[0]) * progress)

    return `hsl(${hue}, ${s}%, ${l}%)`
  }

  render() {
    if (!this.context) {
      return
    }

    const now = performance.now()
    const delta = now - this.previousTime

    this.elapsedTime += delta
    this.previousTime = now

    // progress: 0 -> 1 -> 0 -> 1 ...
    const rawProgress = (this.elapsedTime % this.duration) / this.duration
    const isForward = Math.floor(this.elapsedTime / this.duration) % 2 === 0
    const progress = isForward ? rawProgress : 1 - rawProgress

    // Top right to bottom left
    const gradient = this.context.createLinearGradient(this.width, 0, 0, this.height)

    gradient.addColorStop(0, this.toCssColor(this.color.from, progress))
    gradient.addColorStop(1, this.toCssColor(this.color.to, progress))

    this.context.fillStyle = gradient
    this.context.fillRect(0, 0, this.width, this.height)

    requestAnimationFrame(() => {
      if (this.isActive) {
        this.render()
      }
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('#canvas')

  if (!canvas) {
    return
  }

  new GradientAnimation({
    canvas,
    duration: 3000,
    colorFrom: {
      h: [90, 0],
      s: 80,
      l: 70
    },
    colorTo: {
      h: [30, 0],
      s: 100,
      l: 50
    }
  })
})