import React from 'react'
import PostCard from './PostCard'

const MorePosts = ({ posts }) => {
  return (
    <section>
      <h2 className="text-4xl font-bold tracking-tighter leading-tight mb-4">More Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {posts.map((post) => (
          <article key={post.id}>
            <PostCard {...post} />
          </article>
        ))}
      </div>
    </section>
  )
}

export default MorePosts
