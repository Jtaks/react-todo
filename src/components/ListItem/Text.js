import React from 'react'
import PropTypes from 'prop-types'

export const Text = ({ complete, value }) => !complete
  ? value
  : <s>{value}</s>

Text.propTypes = {
  complete: PropTypes.string,
  value: PropTypes.string
}

Text.defaultProps = {
  complete: null,
  value: ''
}
