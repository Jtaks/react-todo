export function clamp(value, ...limits) {
  const [min, max] = limits.length > 2 ? limits.sort().slice(0, 2) : limits.sort()

  return Math.min(Math.max(value, min), max)
}
