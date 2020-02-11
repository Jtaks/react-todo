import React, { useState } from 'react'
import { useSpring, useTransition, animated } from 'react-spring'
import { useMesure } from './utils'

let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

function ListItem({ item, props }) {
  const [mesure, bounds] = useMesure()
  const springprops = useSpring({ height: bounds.height })

  return (
    <animated.div
      style={{ backgroundColor: 'red', margin: '2px', ...springprops }}>
      <animated.div {...mesure} style={{ overflow: 'hidden', ...props }}>
        {item}
      </animated.div>
    </animated.div>
  )
}

function Test() {
  const [is, setIs] = useState(items)
  const transitions = useTransition(is, (i) => i, {
    from: { height: 0, opacity: 0 },
    enter: { height: 'auto', opacity: 1 },
    leave: { height: 0, opacity: 0 },
    unique: true
  })

  return (
    <div
      style={{
        backgroundColor: 'blue',
        overflow: 'hidden'
      }}>
      <button
        onClick={() => {
          const max = Math.floor(Math.random() * 10)
          const min = Math.floor(Math.random() * max)
          console.log(min, max, items.slice(min, max))
          setIs(items.slice(min, max))
        }}>
        adjust
      </button>
      <div>
        {transitions.map((transition) => (
          <ListItem {...transition} />
        ))}
      </div>
    </div>
  )
}

export default Test
