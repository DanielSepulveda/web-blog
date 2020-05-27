import React from 'react'
import { Image } from 'react-datocms'
import Link from 'next/link'
import CardPill from './CardPill'

const PostCard = ({ coverImage, title, excerpt, categories = [], slug }) => {
  return (
    <div className="rounded overflow-hidden shadow-lg">
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <a aria-label={title}>
          <Image data={coverImage.responsiveImage} className="transition duration-200 ease-in-out hover:opacity-75" />
        </a>
      </Link>
      <div className="px-6 py-4">
        <div className="mb-2">
          <Link as={`/posts/${slug}`} href="/posts/[slug]">
            <a className="hover:underline font-bold text-2xl">{title}</a>
          </Link>
        </div>
        <p className="text-gray-700 text-sm h-24">{excerpt}</p>
      </div>
      <div className="px-6 py-4">
        {categories.map((category) => (
          <CardPill key={category.id} {...category} />
        ))}
      </div>
    </div>
  )
}

export default PostCard
