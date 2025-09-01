document.addEventListener('DOMContentLoaded', function () {
  const navItems = Array.from(
    document.querySelectorAll(
      '.Header-nav-inner .header-nav--a-link, .Header-nav-inner button'
    )
  )

  navItems.forEach((item) => {
    item.addEventListener('mouseenter', (e) => {
      let focused = e.currentTarget
      // If <a> inside <button>, treat both as focused
      if (
        focused.tagName === 'A' &&
        focused.parentElement.tagName === 'BUTTON'
      ) {
        focused = focused.parentElement
      }
      navItems.forEach((other) => {
        // Do not dim the focused button or its inner <a>
        if (
          other !== focused &&
          !(
            focused.tagName === 'BUTTON' &&
            other.tagName === 'A' &&
            other.parentElement === focused
          )
        ) {
          other.classList.add('text-black-50')
        }
      })
    })

    item.addEventListener('mouseleave', () => {
      navItems.forEach((other) => {
        other.classList.remove('text-black-50')
      })
    })
  })

  // Hero Kaleidoscope main class
  class HeroKaleidoscope {
    constructor(selector, options = {}) {
      this.container = document.querySelector(selector)
      this.images = this.container.querySelectorAll('img')
      this.currentIndex = 0
      this.interval = options.interval || 3000
      this.timer = null
      this.init()
    }

    init() {
      this.start()
      // Pause on hover
      this.container.addEventListener('mouseenter', () => this.pause())
      this.container.addEventListener('mouseleave', () => this.resume())
    }

    start() {
      if (this.isRunning) return // ← Prevent multiple intervals

      this.isRunning = true
      this.timer = setInterval(() => this.next(), this.interval)
    }

    next() {
      this.images[this.currentIndex].classList.remove('active')
      this.currentIndex = (this.currentIndex + 1) % this.images.length
      this.images[this.currentIndex].classList.add('active')
    }

    pause() {
      if (this.timer) clearInterval(this.timer)
      this.timer = null
      this.isRunning = false
    }

    resume() {
      if (!this.isRunning) this.start()
    }
  }

  window.heroKaleidoscope = new HeroKaleidoscope('#heroKaleidoscope', {
    interval: 2500, // 3 seconds between transitions
  })
})
