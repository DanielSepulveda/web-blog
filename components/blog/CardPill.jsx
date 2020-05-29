import React from 'react'
import Link from 'next/link'

const CardPill = ({ name, slug }) => {
  return (
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
      #
      <Link href={`/topics/${slug}`}>
        <a className="hover:underline">{name}</a>
      </Link>
    </span>
  )
}

export default CardPill
