import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '../Icon'

export const ToggleIcon = ({ active, activeIcon, inactiveIcon }) => active
  ? <Icon icon={activeIcon} />
  : <Icon icon={inactiveIcon} />

ToggleIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  activeIcon: PropTypes.string.isRequired,
  inactiveIcon: PropTypes.string.isRequired
}

ToggleIcon.defaultProps = {
  active: false
}
