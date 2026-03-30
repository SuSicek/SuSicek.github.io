// composables/useResponsiveImage.js
export function useResponsiveImage() {
  const getSrcset = (src, sizes = [480, 768, 1024, 1280, 1920]) => {
    if (!src) return ''
    const baseSrc = src.replace(/\.[^.]+$/, '')
    const extension = src.split('.').pop()
    return sizes.map(size => `${baseSrc}-${size}w.${extension} ${size}w`).join(', ')
  }

  const getSizes = (sizes = '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw') => {
    return sizes
  }

  return {
    getSrcset,
    getSizes
  }
}