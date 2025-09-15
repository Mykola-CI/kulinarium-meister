document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('#recipe-grid')
  const iso = new Isotope(grid, {
    itemSelector: '.isotope-item',
    layoutMode: 'fitRows',
    percentPosition: true,
    transitionDuration: '0.4s',
  })

  const filterButtons = document.querySelectorAll('.isotope-filters li')

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const filterValue = this.getAttribute('data-filter')

      filterButtons.forEach(function (btn) {
        btn.classList.remove('filter-active')
      })

      this.classList.add('filter-active')
      iso.arrange({ filter: filterValue })
    })
  })
})
