document.addEventListener('DOMContentLoaded', function () {
  // Configuration
  const ITEMS_PER_PAGE = 20

  // State
  let currentPage = 1
  let isLoading = false
  let currentFilter = '*'

  // Get elements
  const grid = document.querySelector('#recipe-grid')
  if (!grid) {
    console.error('Grid not found')
    return
  }

  // Store ALL items with their original data
  const allItemsData = []
  const allItems = Array.from(document.querySelectorAll('.isotope-item'))

  // Store each item's data and remove from DOM
  allItems.forEach((item, index) => {
    const img = item.querySelector('img')
    allItemsData.push({
      element: item.cloneNode(true), // Store complete copy
      originalSrc: img ? img.src : null,
      index: index,
      categories: Array.from(item.classList).filter(
        (cls) =>
          cls !== 'isotope-item' &&
          cls !== 'col' &&
          cls !== 'video-recipes--card-page'
      ),
    })
  })

  const totalPages = Math.ceil(allItemsData.length / ITEMS_PER_PAGE)
  console.log(`Stored ${allItemsData.length} items, ${totalPages} pages`)

  // Clear the grid
  grid.innerHTML = ''

  // Initialize Isotope with empty grid
  const iso = new Isotope(grid, {
    itemSelector: '.isotope-item',
    layoutMode: 'fitRows',
    percentPosition: true,
    transitionDuration: '0.4s',
  })

  // Load first page
  loadPage(1)
  createLoadMoreButton()

  function loadPage(pageNumber, append = false) {
    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, allItemsData.length)

    const itemsToAdd = allItemsData.slice(startIndex, endIndex)

    if (!append) {
      // Clear grid for fresh start
      grid.innerHTML = ''
    }

    // Add items to DOM
    itemsToAdd.forEach((itemData) => {
      const newElement = itemData.element.cloneNode(true)
      const img = newElement.querySelector('img')

      // Set up lazy loading
      if (img && itemData.originalSrc) {
        img.setAttribute('data-src', itemData.originalSrc)
        img.removeAttribute('src')
        img.style.backgroundColor = '#f8f9fa'
        img.style.minHeight = '200px'
        newElement.style.opacity = '0.6'
      }

      grid.appendChild(newElement)
    })

    // Load images for new items
    const newImages = grid.querySelectorAll('img[data-src]')
    loadImages(Array.from(newImages)).then(() => {
      // Refresh Isotope
      iso.reloadItems()
      iso.arrange({ filter: currentFilter })
    })

    currentPage = pageNumber
  }

  function loadImages(imgElements) {
    const promises = imgElements.map((img) => {
      return new Promise((resolve) => {
        if (img.getAttribute('data-src') && !img.src) {
          const tempImg = new Image()
          tempImg.onload = () => {
            img.src = img.getAttribute('data-src')
            img.style.backgroundColor = ''
            img.style.minHeight = ''
            img.parentElement.style.opacity = '1'
            resolve()
          }
          tempImg.onerror = () => {
            img.style.backgroundColor = '#dee2e6'
            resolve()
          }
          tempImg.src = img.getAttribute('data-src')
        } else {
          resolve()
        }
      })
    })

    return Promise.all(promises)
  }

  function createLoadMoreButton() {
    let loadMoreBtn = document.getElementById('load-more-recipes')

    if (!loadMoreBtn && totalPages > 1) {
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'text-center my-5'

      loadMoreBtn = document.createElement('button')
      loadMoreBtn.id = 'load-more-recipes'
      loadMoreBtn.className = 'button-recipe-text multilingual-text m-auto'
      loadMoreBtn.innerHTML = 'більше..MORE recipes..MORE recipes..больше'

      buttonContainer.appendChild(loadMoreBtn)
      grid.parentNode.insertBefore(buttonContainer, grid.nextSibling)

      loadMoreBtn.addEventListener('click', loadMoreItems)
    }

    updateLoadMoreButton()
  }

  function loadMoreItems() {
    if (isLoading || currentPage >= totalPages) return

    isLoading = true
    const btn = document.getElementById('load-more-recipes')
    if (btn) {
      btn.disabled = true
      btn.innerHTML = 'Loading...'
    }

    const nextPage = currentPage + 1
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, allItemsData.length)

    const itemsToAdd = allItemsData.slice(startIndex, endIndex)

    // Add new items to existing grid
    itemsToAdd.forEach((itemData) => {
      const newElement = itemData.element.cloneNode(true)
      const img = newElement.querySelector('img')

      if (img && itemData.originalSrc) {
        img.setAttribute('data-src', itemData.originalSrc)
        img.removeAttribute('src')
        img.style.backgroundColor = '#f8f9fa'
        img.style.minHeight = '200px'
        newElement.style.opacity = '0.6'
      }

      grid.appendChild(newElement)
    })

    // Load new images
    const newImages = Array.from(
      grid.querySelectorAll('img[data-src]:not([src])')
    )
    loadImages(newImages).then(() => {
      currentPage = nextPage
      isLoading = false

      if (btn) {
        btn.disabled = false
        btn.innerHTML = 'Load More Recipes'
      }

      // Refresh Isotope
      iso.reloadItems()
      iso.arrange({ filter: currentFilter })

      updateLoadMoreButton()
    })
  }

  function applyFilter(filterValue) {
    currentFilter = filterValue

    // Find matching items from all stored data
    const matchingData = allItemsData.filter((itemData) => {
      if (filterValue === '*') return true
      const category = filterValue.replace('.', '')
      return itemData.categories.includes(category)
    })

    // Calculate how many to show based on current page
    const itemsToShow = Math.min(
      currentPage * ITEMS_PER_PAGE,
      matchingData.length
    )
    const dataToShow = matchingData.slice(0, itemsToShow)

    // Clear and rebuild grid
    grid.innerHTML = ''

    dataToShow.forEach((itemData) => {
      const newElement = itemData.element.cloneNode(true)
      const img = newElement.querySelector('img')

      if (img && itemData.originalSrc) {
        img.setAttribute('data-src', itemData.originalSrc)
        img.removeAttribute('src')
        img.style.backgroundColor = '#f8f9fa'
        img.style.minHeight = '200px'
        newElement.style.opacity = '0.6'
      }

      grid.appendChild(newElement)
    })

    // Load images and apply filter
    const newImages = Array.from(grid.querySelectorAll('img[data-src]'))
    loadImages(newImages).then(() => {
      iso.reloadItems()
      iso.arrange({ filter: filterValue })
      updateLoadMoreButton()
    })
  }

  function updateLoadMoreButton() {
    const btn = document.getElementById('load-more-recipes')
    if (!btn) return

    // Check if there are more items to load for current filter
    const category = currentFilter.replace('.', '')
    const matchingData = allItemsData.filter((itemData) => {
      if (currentFilter === '*') return true
      return itemData.categories.includes(category)
    })

    const currentlyShown = grid.children.length
    btn.style.display = currentlyShown < matchingData.length ? 'block' : 'none'
  }

  // Filter buttons
  const filterButtons = document.querySelectorAll('.isotope-filters li')
  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const filterValue = this.getAttribute('data-filter')

      filterButtons.forEach(function (btn) {
        btn.classList.remove('filter-active')
      })
      this.classList.add('filter-active')

      applyFilter(filterValue)
    })
  })

  // Debug API
  window.RecipePagination = {
    getCurrentPage: () => currentPage,
    getTotalPages: () => totalPages,
    getCurrentFilter: () => currentFilter,
    getItemsInDOM: () => grid.children.length,
    getStoredItems: () => allItemsData.length,
  }
})
