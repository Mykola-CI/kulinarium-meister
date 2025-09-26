document.addEventListener('DOMContentLoaded', function () {
  // Index Page Scroll Indicator
  // Select all navigation items and convert NodeList to array for easier handling
  const indexNavItemsMobile = Array.from(
    document.querySelectorAll('.Index-nav-item--mobile')
  )

  // Get all section elements that the nav items link to
  const sectionsMobile = indexNavItemsMobile.map((item) => {
    // Extract the ID from the href attribute
    const targetId = item.getAttribute('href').substring(1)
    return document.getElementById(targetId)
  })

  // Create the Intersection Observer instance
  const observerMobile = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // If the section is in view (or near view)
        if (entry.isIntersecting) {
          // Get the section ID
          const targetId = entry.target.id

          // Remove active class from all nav items
          indexNavItemsMobile.forEach((item) => {
            item.classList.remove('active')
          })

          // Add active class to the matching nav item
          const activeItem = document.querySelector(
            `.Index-nav-item--mobile[href="#${targetId}"]`
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
  sectionsMobile.forEach((section) => {
    if (section) {
      // Check if section exists
      observerMobile.observe(section)
    }
  })
})
