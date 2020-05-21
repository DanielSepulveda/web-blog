/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-datocms'
import CardPill from './CardPill'

const PostCard = ({ coverImage, title, excerpt, categories }) => {
  return (
    <article className="px-2 w-1/3">
      <div className="rounded overflow-hidden shadow-lg">
        <Image data={coverImage.responsiveImage} />
        <div className="px-6 py-4 h-40">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{excerpt}</p>
        </div>
        <div className="px-6 py-4">
          {categories.map((category) => (
            <CardPill key={category.id} {...category} />
          ))}
        </div>
      </div>
    </article>
  )
}

PostCard.propTypes = {
  coverImage: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default PostCard
