document.addEventListener('DOMContentLoaded', function () {
  // Navigation bar hover effect
  const navItems = Array.from(
    document.querySelectorAll(
      '.Header-nav-inner .header-nav--a-link, .Header-nav-inner button, .footer-container .header-nav--a-link'
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

  // Video Parallax Effect Implementation
  class VideoParallax {
    constructor() {
      this.videoSection = document.getElementById('video-section')
      this.video = document.getElementById('parallax-video')
      this.isScrolling = false
      this.init()
    }

    init() {
      if (!this.videoSection || !this.video) return

      // Setup parallax once video loads
      this.video.addEventListener('loadedmetadata', () => {
        this.setupParallax()
      })

      if (this.video.readyState >= 1) {
        this.setupParallax()
      }
    }

    setupParallax() {
      this.calculateDimensions()
      this.bindScrollEvents()
      this.updateParallax()
    }

    calculateDimensions() {
      this.sectionHeight = this.videoSection.offsetHeight
      this.videoHeight = this.video.offsetHeight
      this.maxOffset = Math.max(0, this.videoHeight - this.sectionHeight)
    }

    bindScrollEvents() {
      window.addEventListener(
        'scroll',
        () => {
          if (!this.isScrolling) {
            requestAnimationFrame(() => {
              this.updateParallax()
              this.isScrolling = false
            })
            this.isScrolling = true
          }
        },
        { passive: true }
      )
    }

    updateParallax() {
      const rect = this.videoSection.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate section's progress through viewport
      // 0 = section bottom at viewport bottom (initial position)
      // 1 = section top at viewport top (end position)
      const progress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - rect.bottom) / (windowHeight + this.sectionHeight)
        )
      )

      // Calculate video offset (negative moves video up to show upper portions)
      const offset = this.maxOffset * progress

      // Apply transform to video
      this.video.style.transform = `translateY(${offset}px)`
    }
  }

  // Image Parallax Effect for Mobile
  class ImageParallax {
    constructor() {
      this.videoSection = document.getElementById('video-section')
      this.image = document.querySelector('.artwork-image')
      this.isScrolling = false
      this.init()
    }

    init() {
      if (!this.videoSection || !this.image) return

      // Setup parallax once image loads
      if (this.image.complete) {
        this.setupParallax()
      } else {
        this.image.addEventListener('load', () => {
          this.setupParallax()
        })
      }
    }

    setupParallax() {
      this.calculateDimensions()
      this.bindScrollEvents()
      this.updateParallax()
    }

    calculateDimensions() {
      this.sectionHeight = this.videoSection.offsetHeight
      this.imageHeight = this.image.offsetHeight
      this.maxOffset = Math.max(0, this.imageHeight - this.sectionHeight)
    }

    bindScrollEvents() {
      window.addEventListener(
        'scroll',
        () => {
          if (!this.isScrolling) {
            requestAnimationFrame(() => {
              this.updateParallax()
              this.isScrolling = false
            })
            this.isScrolling = true
          }
        },
        { passive: true }
      )
    }

    updateParallax() {
      // Only apply parallax on mobile screens
      if (window.innerWidth >= 768) return

      const rect = this.videoSection.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const progress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - rect.top) / (windowHeight + this.sectionHeight)
          // (windowHeight - rect.bottom) / windowHeight
        )
      )

      const offset = this.maxOffset * progress
      this.image.style.transform = `translateY(${offset}px)`
    }
  }

  // Initialize both parallax effects
  new VideoParallax()
  new ImageParallax()

  // Index Page Scroll Indicator
  // Select all navigation items and convert NodeList to array for easier handling
  const indexNavItems = Array.from(document.querySelectorAll('.Index-nav-item'))

  // Get all section elements that the nav items link to
  const sections = indexNavItems.map((item) => {
    // Extract the ID from the href attribute
    const targetId = item.getAttribute('href').substring(1)
    return document.getElementById(targetId)
  })

  // Create the Intersection Observer instance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // If the section is in view (or near view)
        if (entry.isIntersecting) {
          // Get the section ID
          const targetId = entry.target.id

          // Remove active class from all nav items
          indexNavItems.forEach((item) => {
            item.classList.remove('active')
          })

          // Add active class to the matching nav item
          const activeItem = document.querySelector(
            `.Index-nav-item[href="#${targetId}"]`
          )
          if (activeItem) {
            activeItem.classList.add('active')
          }
        }
      })
    },
    {
      // Options for the observer
      threshold: 0.3, // Trigger when at least 30% of the section is visible
      rootMargin: '-10% 0px -10% 0px', // Adjust the effective viewport slightly
    }
  )

  // Start observing all sections
  sections.forEach((section) => {
    if (section) {
      // Check if section exists
      observer.observe(section)
    }
  })
})
