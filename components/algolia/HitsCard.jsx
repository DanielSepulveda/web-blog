/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import request from 'lib/datocms'
import { Image } from 'react-datocms'
import useSWR from 'swr'
import { Highlight } from 'react-instantsearch-dom'
import CardPill from '../blog/CardPill'

const POST_QUERY = `
query Post($id: ItemId) {
  post(filter: { id: { eq: $id } }) {
    categories {
      id
      name
    }
    coverImage {
      responsiveImage(imgixParams: { fit: crop, w: 150, h: 150, auto: format }) {
        srcSet
        webpSrcSet
        sizes
        src
        width
        height
        aspectRatio
        alt
        title
        base64
      }
    }
  }
}`

const HitCard = ({ hit }) => {
  const { data } = useSWR(POST_QUERY, (query) => request({ query, variables: { id: hit.id } }))

  if (!data) {
    return <div>Loading...</div>
  }

  console.log(hit)

  const { post } = data

  return (
    <div className="flex">
      <div>
        <Image data={post.coverImage.responsiveImage} />
      </div>
      <div className="ml-8 flex-1">
        <h3 className="font-bold text-xl mb-2">
          <Highlight hit={hit} attribute="title" />
        </h3>
        <div>
          <p className="text-gray-700 text-base">
            <Highlight hit={hit} attribute="excerpt" />
          </p>
          <div className="mt-4">
            {post.categories.map((category) => (
              <CardPill key={category.id} {...category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

HitCard.propTypes = {
  hit: PropTypes.object.isRequired,
}

export default HitCard
