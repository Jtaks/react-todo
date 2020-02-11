import { useState, useRef, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export function useMesure() {
  const ref = useRef()
  const [bounds, setBounds] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [resizeObserver] = useState(
    () => new ResizeObserver(([entry]) => setBounds(entry.contentRect))
  )

  useEffect(() => {
    if (ref.current) {
      resizeObserver.observe(ref.current)
    }
    return () => resizeObserver.disconnect()
  }, [resizeObserver])

  return [{ ref }, bounds]
}
