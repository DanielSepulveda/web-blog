import React from 'react'
import PropTypes from 'prop-types'

const CardPill = ({ name }) => {
  return (
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
      {`#${name}`}
    </span>
  )
}

CardPill.propTypes = {
  name: PropTypes.string.isRequired,
}

export default CardPill
