import React from 'react'
import PropTypes from 'prop-types'

function Pill({ style, text, ...rest }) {
  return (
    <div
      style={{
        borderRadius: '4px',
        padding: '4px',
        fontSize: '0.8em',
        cursor: rest.onClick ? 'pointer' : 'initial',
        ...style
      }}
      {...rest}>
      {text}
    </div>
  )
}

Pill.propTypes = {
  style: PropTypes.object,
  text: PropTypes.node,
  onClick: PropTypes.func
}

export default Pill
