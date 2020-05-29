import React from 'react'
import datoAPI from 'lib/datocms'
import { Image } from 'react-datocms'
import useSWR from 'swr'
import { Highlight } from 'react-instantsearch-dom'
import Link from 'next/link'
import CardPill from '../blog/CardPill'

const COMMENT_QUERY = `
query Comment($id: ItemId) {
	comment(filter: {id: {eq: $id}}) {
		content
		approved
		post {
			id
			slug
			title
		}
		createdAt
	}
}`

const CommentCard = ({ id }) => {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const commentData = await datoAPI(COMMENT_QUERY, { variables: { id } })
      setData(commentData)
    }

    fetchData()
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  const { comment } = data
  return (
    <>
      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">
          <Date dateString={comment.createdAt} />
        </span>
        {comment.approved ? (
          <span className="px-2 py-1 bg-green-600 text-green-100 font-bold rounded text-center">Approved</span>
        ) : (
          <span className="px-2 py-1 bg-red-600 text-red-100 font-bold rounded text-center">Under Review</span>
        )}
      </div>
      <div className="mt-2">
        <Link as={`/posts/${comment.post.slug}`} href="/posts/[slug]">
          <a className="hover:underline font-bold text-2xl">{comment.post.title}</a>
        </Link>
        <p className="mt-2 text-gray-600">{`${comment.content}`}</p>
      </div>
    </>
  )
}

export default CommentCard
