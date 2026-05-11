import { useState, useEffect } from 'react'

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

export function useDeviceDetect(): DeviceInfo {
  const [device, setDevice] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  })

  useEffect(() => {
    const check = () => {
      const width = window.innerWidth
      // Also check for touch support on mobile
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      setDevice({
        isMobile: width < 768 && hasTouch,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024 || !hasTouch,
      })
    }

    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return device
}
