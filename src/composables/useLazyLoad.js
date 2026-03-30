// composables/useLazyLoad.js
export function useLazyLoad() {
  const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      })
    })

    const lazyImages = document.querySelectorAll('img[data-src]')
    lazyImages.forEach(img => imageObserver.observe(img))
  }

  const initLazyLoading = () => {
    if ('IntersectionObserver' in window) {
      lazyLoadImages()
    } else {
      // Fallback for older browsers
      const lazyImages = document.querySelectorAll('img[data-src]')
      lazyImages.forEach(img => {
        img.src = img.dataset.src
      })
    }
  }

  return {
    initLazyLoading
  }
}