class ProductZoom {
  constructor(container) {
    this.container = container
    this.image = container.querySelector('.product-image--zoom')
    this.isZooming = false
    this.init()
  }

  init() {
    // Mouse events
    this.container.addEventListener('mouseenter', () => this.startZoom())
    this.container.addEventListener('mouseleave', () => this.endZoom())
    this.container.addEventListener('mousemove', (e) => this.panImage(e))

    // Prevent image dragging
    this.image.addEventListener('dragstart', (e) => e.preventDefault())
  }

  startZoom() {
    this.isZooming = true
    this.container.classList.add('zooming')
  }

  endZoom() {
    this.isZooming = false
    this.container.classList.remove('zooming')
    // Reset position
    this.image.style.transform = 'scale(1)'
  }

  panImage(event) {
    if (!this.isZooming) return

    const rect = this.container.getBoundingClientRect()
    const containerWidth = rect.width
    const containerHeight = rect.height

    // Calculate mouse position (0 to 1)
    const mouseX = (event.clientX - rect.left) / containerWidth
    const mouseY = (event.clientY - rect.top) / containerHeight

    // Clamp values
    const clampedX = Math.max(0, Math.min(1, mouseX))
    const clampedY = Math.max(0, Math.min(1, mouseY))

    // Calculate movement (opposite direction)
    const moveRangeX = containerWidth / 4 // 25% movement range
    const moveRangeY = containerHeight / 4

    const moveX = (0.5 - clampedX) * moveRangeX * 2
    const moveY = (0.5 - clampedY) * moveRangeY * 2

    // Apply transform
    this.image.style.transform = `scale(1.7) translate(${moveX}px, ${moveY}px)`
  }
}

// Initialize for all product containers
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.product-image-container--zoom')
  containers.forEach((container) => new ProductZoom(container))
})
