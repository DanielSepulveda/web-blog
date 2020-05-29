import React from 'react'
import datoAPI from 'lib/datocms'
import { Image } from 'react-datocms'
import useSWR from 'swr'
import { Highlight } from 'react-instantsearch-dom'
import Link from 'next/link'
import CardPill from '../blog/CardPill'

const POST_QUERY = `
query Post($id: ItemId) {
  post(filter: { id: { eq: $id } }) {
    categories {
      id
      name
      slug
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
  const { data } = useSWR(POST_QUERY, (query) => datoAPI(query, { variables: { id: hit.id } }))

  if (!data) {
    return <div>Loading...</div>
  }

  const { post } = data

  return (
    <div className="flex">
      <div>
        <Link as={`/posts/${hit.slug}`} href="/posts/[slug]">
          <a aria-label={hit.title}>
            <Image
              data={post.coverImage.responsiveImage}
              className="transition duration-200 ease-in-out hover:opacity-75"
            />
          </a>
        </Link>
      </div>
      <div className="ml-8 flex-1">
        <div className="mb-2">
          <Link as={`/posts/${hit.slug}`} href="/posts/[slug]">
            <a className="hover:underline font-bold text-xl">
              <Highlight hit={hit} attribute="title" />
            </a>
          </Link>
        </div>
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

export default HitCard
