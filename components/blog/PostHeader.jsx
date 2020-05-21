import React from 'react'
import { Image } from 'react-datocms'
import Avatar from './Avatar'
import Date from '../shared/Date'
import PostTitle from './PostTitle'

const PostHeader = ({ title, coverImage, date, author }) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <Image data={coverImage.responsiveImage} />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  )
}

export default PostHeader
