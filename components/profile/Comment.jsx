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
  const { data } = useSWR(COMMENT_QUERY, (query) => datoAPI(query, { variables: { id } }))

  if (!data) {
    return <div>Loading...</div>
  }

  const { comment } = data
	console.log(comment)
  return (
		<>
			<div class="flex justify-between items-center">
				<span class="font-light text-gray-600"><Date dateString={comment.createdAt}/></span>
				{ 
					comment.approved ? 
						<a class="px-2 py-1 bg-green-600 text-green-100 font-bold rounded hover:bg-green-500 text-center" href="#">Approved</a> 
						:
						<a class="px-2 py-1 bg-red-600 text-red-100 font-bold rounded hover:bg-red-500 text-center" href="#">Under Review</a>
				}	
			</div>
			<div class="mt-2">
				<a class="text-2xl text-gray-700 font-bold hover:text-gray-600" href="#">{`${comment.post.title}`}</a>
				<p class="mt-2 text-gray-600">{`${comment.content}`}</p>
			</div>
		</>
  )
}

export default CommentCard