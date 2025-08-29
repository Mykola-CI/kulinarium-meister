document.addEventListener('DOMContentLoaded', function () {
  const navItems = Array.from(
    document.querySelectorAll(
      '.Header-nav-inner .Header-nav-item, .Header-nav-inner button, .Header-nav-inner a'
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
          other.classList.add('text-muted')
        }
      })
    })

    item.addEventListener('mouseleave', () => {
      navItems.forEach((other) => {
        other.classList.remove('text-muted')
      })
    })
  })
})
