import React, { useContext } from 'react'
import { useSpring, animated } from 'react-spring'
import { useMesure } from '../hooks'

import Slider from './Slider'

import { ThemeContext } from '../ThemeContext'

const LeftIcon = ({ complete = null }) =>
  complete === null ? (
    <i className="material-icons">check</i>
  ) : (
    <i className="material-icons">redo</i>
  )

const Text = ({ complete = null, value = '', text = '' }) =>
  value ? complete === null ? value : <s>{value}</s> : text

function ListItem({ style, transition, toggleComplete, remove, noDrag }) {
  const { theme } = useContext(ThemeContext)
  const [mesure, bounds] = useMesure()
  const animation = useSpring({ height: bounds.height })

  return (
    <animated.li style={{ ...style, ...animation }}>
      <Slider
        noDrag={noDrag}
        mesure={mesure}
        transition={transition}
        leftContent={<LeftIcon complete={transition.item.complete} />}
        leftAction={toggleComplete}
        rightContent={<i className="material-icons">delete</i>}
        rightAction={remove}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            fontSize: '0.95em',
            backgroundColor: theme.elevation.two.backgroundColor
          }}>
          <Text {...transition.item} text={transition.item} />
        </div>
      </Slider>
    </animated.li>
  )
}

export default ListItem
