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

  // Listen for Bootstrap dropdown show event
  document.querySelectorAll('.dropdown').forEach(function (dropdown) {
    dropdown.addEventListener('shown.bs.dropdown', function () {
      const menu = dropdown.querySelector('.Header-nav-folder')
      if (menu) {
        // Force override inline styles
        menu.style.setProperty('inset', '10px auto auto 0px', 'important')
        menu.style.setProperty('margin', '0px', 'important')
        menu.style.setProperty(
          'transform',
          'translate(-5px, 13px)',
          'important'
        )
      }
    })
  })
})
