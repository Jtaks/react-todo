import { useState, useRef, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export function useMesure() {
  const ref = useRef()
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  )
  useEffect(() => {
    if (ref.current) {
      ro.observe(ref.current)
    }
    return () => ro.disconnect()
  }, [ro])
  return [{ ref }, bounds]
}

export function clamp(value, ...limits) {
  const [min, max] =
    limits.length > 2 ? limits.sort().slice(0, 2) : limits.sort()

  return Math.min(Math.max(value, min), max)
}
