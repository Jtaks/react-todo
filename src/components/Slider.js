import React from 'react'
import { animated, useSpring, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import { clamp } from '../helper'

const min = -55
const max = 55

function Slider({
  children,
  leftContent,
  leftAction,
  rightContent,
  rightAction,
  transition,
  mesure,
  noDrag
}) {
  const [{ x, background }, setSpring] = useSpring(() => ({
    x: 0,
    background: 'linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)'
  }))
  const bindDrag = useDrag(({ delta, down }) => {
    // * Clamp values
    const dx = clamp(delta[0], min, max)

    // * Update animation
    setSpring({
      x: down ? dx : 0,
      background: `linear-gradient(120deg, ${
        dx < 0 ? '#f093fb 0%, #f5576c' : '#96fbc4 0%, #f9f586'
      } 100%)`
    })

    // * Fire actions
    if (dx >= max && !down) {
      leftAction(transition.item.id)
    } else if (dx <= min && !down) {
      rightAction(transition.item.id)
    }
  })

  return (
    // Gesture handler
    <animated.div
      {...mesure}
      style={{
        position: 'relative',
        display: 'grid',
        alignItems: 'center',
        overflow: 'hidden',
        background,
        ...transition.props
      }}>
      {/* Underlay */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '16px',
          justifySelf: 'start'
        }}>
        {leftContent}
        {rightContent}
      </div>
      {/* Overlay */}
      <animated.div
        {...(noDrag ? {} : bindDrag())}
        style={{
          cursor: noDrag ? 'initial' : 'move',
          transform: interpolate([x], (x) => `translate3d(${x}px,0,0)`)
        }}>
        {children}
      </animated.div>
    </animated.div>
  )
}

Slider.defaultProps = {
  leftAction: () => {},
  rightAction: () => {}
}

export default Slider
