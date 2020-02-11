import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { useMesure } from '../../hooks'

import { Slider } from '../Slider'
import { ToggleIcon } from '../ToggleIcon'
import { Icon } from '../Icon'
import { Text } from './Text'

import { ThemeContext } from '../../ThemeContext'

export const ListItem = ({
  style,
  transition,
  toggleComplete,
  remove,
  noDrag
}) => {
  const { theme } = useContext(ThemeContext)
  const [mesure, bounds] = useMesure()
  const animation = useSpring({ height: bounds.height })

  const leftContent = <ToggleIcon
    active={!!transition.item.complete}
    activeIcon='redo'
    inactiveIcon='check'
  />
  const rightContent = <Icon icon='delete' />

  return (
    <animated.li style={{ ...style, ...animation }}>
      <Slider
        noDrag={noDrag}
        mesure={mesure}
        transition={transition}
        leftContent={leftContent}
        leftAction={toggleComplete}
        rightContent={rightContent}
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
          <Text {...transition.item} />
        </div>
      </Slider>
    </animated.li>
  )
}


ListItem.propTypes = {
  style: PropTypes.any,
  transition: PropTypes.any,
  toggleComplete: PropTypes.any,
  remove: PropTypes.any,
  noDrag: PropTypes.any
}
