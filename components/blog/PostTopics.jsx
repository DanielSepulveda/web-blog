import React from 'react'
import CardPill from './CardPill'

const PostTopics = ({ categories }) => {
  return (
    <div>
      <h2 className="text-4xl font-bold tracking-tighter leading-tight mb-4">Related Topics</h2>
      <div className="max-w-4xl mx-auto mb-8">
        {categories.map((category) => (
          <CardPill key={category.id} {...category} />
        ))}
      </div>
    </div>
  )
}

export default PostTopics
